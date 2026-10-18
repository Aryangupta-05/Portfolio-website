import test from "node:test";
import assert from "node:assert/strict";
import {
  ContactError,
  getContactConfig,
  isContactConfigured,
  sendQuery,
  validateQuery,
} from "../src/lib/contact.js";

const config = {
  serviceId: "service_example",
  templateId: "template_example",
  publicKey: "public-example",
};
const fields = {
  name: "Example Visitor",
  email: "visitor@example.com",
  subject: "Backend internship",
  message: "I would like to discuss a backend internship.",
};
const request = {
  fields,
  config,
  reference: "AG-example-reference",
};

test("blank or placeholder configuration cannot enable sending", () => {
  assert.equal(isContactConfigured(getContactConfig({})), false);
  assert.equal(
    isContactConfigured({ ...config, publicKey: "YOUR_PUBLIC_KEY" }),
    false,
  );
  assert.equal(isContactConfigured(config), true);
});

test("rejects invalid fields, header controls, and excess content", () => {
  assert.ok(validateQuery({ ...fields, email: "invalid" }).errors.email);
  assert.ok(
    validateQuery({ ...fields, subject: "Hello\r\nBcc: other@example.com" })
      .errors.subject,
  );
  assert.ok(
    validateQuery({ ...fields, message: "a".repeat(5001) }).errors.message,
  );
  assert.deepEqual(validateQuery(fields).errors, {});
});

test("unconfigured or invalid requests never call the email provider", async () => {
  let calls = 0;
  const fetchImpl = async () => {
    calls += 1;
    throw new Error("Should not be called");
  };
  await assert.rejects(
    sendQuery({ ...request, config: getContactConfig({}) }, { fetchImpl }),
    (error) => error.code === "UNAVAILABLE",
  );
  await assert.rejects(
    sendQuery(
      { ...request, fields: { ...fields, email: "invalid" } },
      { fetchImpl },
    ),
    (error) => error.code === "VALIDATION",
  );
  assert.equal(calls, 0);
});

test("one provider request supplies the same query data to the linked templates", async () => {
  const captured = [];
  const fetchImpl = async (url, options) => {
    captured.push({ url, options });
    return { ok: true, status: 200 };
  };
  const result = await sendQuery(
    { ...request, fields: { ...fields, name: "  Example Visitor  " } },
    { fetchImpl },
  );
  assert.equal(captured.length, 1);
  assert.equal(captured[0].url, "https://api.emailjs.com/api/v1.0/email/send");
  const payload = JSON.parse(captured[0].options.body);
  assert.equal(payload.template_id, config.templateId);
  assert.equal(payload.template_params.name, "Example Visitor");
  assert.equal(payload.template_params.email, fields.email);
  assert.equal(payload.template_params.from_name, 'Example Visitor');
  assert.equal(payload.template_params.from_email, fields.email);
  assert.equal(payload.template_params.message, fields.message);
  assert.equal(payload.template_params.reference, request.reference);
  assert.equal(payload.template_params['g-recaptcha-response'], undefined);
  assert.equal(
    payload.template_params.to_email,
    undefined,
    "Owner recipient must be fixed in the template",
  );
  assert.equal(
    payload.accessToken,
    undefined,
    "Never ship private credentials",
  );
  assert.equal(result.reference, request.reference);
});

test("provider rejection and rate limits never report success", async () => {
  await assert.rejects(
    sendQuery(request, { fetchImpl: async () => ({ ok: false, status: 429 }) }),
    (error) => error instanceof ContactError && error.code === "RATE_LIMITED",
  );
  await assert.rejects(
    sendQuery(request, { fetchImpl: async () => ({ ok: false, status: 400 }) }),
    (error) => error.code === "REJECTED",
  );
});

test("an uncertain network response is not retried or reported as delivered", async () => {
  let calls = 0;
  const fetchImpl = async () => {
    calls += 1;
    throw new TypeError("Simulated network disconnect");
  };
  await assert.rejects(
    sendQuery(request, { fetchImpl }),
    (error) =>
      error.code === "UNKNOWN" && error.message.includes("Check your inbox"),
  );
  assert.equal(calls, 1);
});
