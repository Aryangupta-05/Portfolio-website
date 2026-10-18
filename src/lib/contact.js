export function getContactConfig(env = import.meta.env ?? {}) {
  const value = (key) => (typeof env[key] === "string" ? env[key].trim() : "");
  return {
    serviceId: value("VITE_EMAILJS_SERVICE_ID"),
    templateId: value("VITE_EMAILJS_TEMPLATE_ID"),
    publicKey: value("VITE_EMAILJS_PUBLIC_KEY"),
  };
}

export function isContactConfigured(config) {
  return ["serviceId", "templateId", "publicKey"].every(
    (key) =>
      typeof config[key] === "string" &&
      config[key].trim() &&
      !/^(YOUR_|REPLACE_)/i.test(config[key]),
  );
}

export function validateQuery(fields) {
  const errors = {};
  const clean = {};
  for (const field of ["name", "email", "subject", "message"]) {
    clean[field] =
      typeof fields[field] === "string" ? fields[field].trim() : "";
  }
  // eslint-disable-next-line no-control-regex -- Reject header control characters in single-line fields.
  const control = /[\u0000-\u001f\u007f]/;
  if (
    clean.name.length < 2 ||
    clean.name.length > 80 ||
    control.test(clean.name)
  )
    errors.name = "Enter a name between 2 and 80 characters.";
  if (
    clean.email.length > 254 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean.email) ||
    control.test(clean.email)
  )
    errors.email = "Enter a valid email address.";
  if (
    clean.subject.length < 3 ||
    clean.subject.length > 120 ||
    control.test(clean.subject)
  )
    errors.subject = "Enter a subject between 3 and 120 characters.";
  if (
    clean.message.length < 10 ||
    clean.message.length > 5000 ||
    // eslint-disable-next-line no-control-regex -- Allow normal message whitespace while rejecting other controls.
    /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(clean.message)
  )
    errors.message = "Write a message between 10 and 5,000 characters.";
  return { clean, errors };
}

export class ContactError extends Error {
  constructor(code, message) {
    super(message);
    this.name = "ContactError";
    this.code = code;
  }
}

// One request triggers the primary template and its dashboard-linked auto-reply.
// No private key or mailbox credential belongs in this browser code.
export async function sendQuery(
  { fields, reference, config },
  { fetchImpl = globalThis.fetch } = {},
) {
  const { clean, errors } = validateQuery(fields);
  if (Object.keys(errors).length)
    throw new ContactError("VALIDATION", "Check the form fields.");
  if (!isContactConfigured(config))
    throw new ContactError(
      "UNAVAILABLE",
      "The query form is temporarily unavailable.",
    );
  if (typeof reference !== "string" || !/^[a-zA-Z0-9-]{8,80}$/.test(reference))
    throw new ContactError("VALIDATION", "The query reference is invalid.");
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 20000);
  try {
    const response = await fetchImpl(
      "https://api.emailjs.com/api/v1.0/email/send",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          service_id: config.serviceId,
          template_id: config.templateId,
          user_id: config.publicKey,
          template_params: {
            name: clean.name,
            email: clean.email,
            // Keep the reused notification template compatible with the old portfolio.
            from_name: clean.name,
            from_email: clean.email,
            subject: clean.subject,
            message: clean.message,
            reference,
            submitted_at: new Date().toISOString(),
          },
        }),
      },
    );
    if (response.status === 429)
      throw new ContactError(
        "RATE_LIMITED",
        "The form is receiving too many requests. Please try later or email me directly.",
      );
    if (!response.ok)
      throw new ContactError(
        "REJECTED",
        "Your query could not be accepted. Please email me directly.",
      );
    return { reference };
  } catch (error) {
    if (error instanceof ContactError) throw error;
    // A lost response does not prove the provider failed to accept the email.
    throw new ContactError(
      "UNKNOWN",
      "We couldn’t confirm your submission. Check your inbox for a confirmation before trying again, or email me directly.",
    );
  } finally {
    clearTimeout(timer);
  }
}
