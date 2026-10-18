import { useRef, useState } from "react";
import Icon from "./Icon.jsx";
import { profile } from "../data/portfolio.js";
import {
  getContactConfig,
  isContactConfigured,
  sendQuery,
  validateQuery,
} from "../lib/contact.js";

const config = getContactConfig();
const configured = isContactConfigured(config);
const emptyForm = {
  name: "",
  email: "",
  subject: "",
  message: "",
};
export default function QueryForm() {
  const [fields, setFields] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [feedback, setFeedback] = useState("");
  const [receipt, setReceipt] = useState(null);
  const submitting = useRef(false);
  const reference = useRef(null);
  const formRef = useRef(null);

  function changeField(event) {
    const { name, value } = event.target;
    setFields((previous) => ({ ...previous, [name]: value }));
    setErrors((previous) => ({ ...previous, [name]: undefined }));
    if (status === "error") {
      setStatus("idle");
      setFeedback("");
    }
  }
  async function submit(event) {
    event.preventDefault();
    if (submitting.current) return;
    const validation = validateQuery(fields);
    if (Object.keys(validation.errors).length) {
      setErrors(validation.errors);
      const field = Object.keys(validation.errors)[0];
      formRef.current?.elements.namedItem(field)?.focus();
      return;
    }
    if (!configured) {
      setStatus("error");
      setFeedback(
        "The form is temporarily unavailable. Please email me directly.",
      );
      return;
    }
    submitting.current = true;
    setStatus("sending");
    setFeedback("");
    reference.current ??= `AG-${crypto.randomUUID()}`;
    try {
      await sendQuery({
        fields,
        reference: reference.current,
        config,
      });
      setReceipt({
        reference: reference.current,
        email: validation.clean.email,
      });
      setStatus("success");
    } catch (error) {
      setStatus("error");
      setFeedback(error.message);
    } finally {
      submitting.current = false;
    }
  }

  return (
    <div className="container query-section" id="query">
      <div className="query-intro">
        <p className="eyebrow">HAVE SOMETHING IN MIND?</p>
        <h3>
          Leave a query.
          <br />
          <em>Keep the conversation going.</em>
        </h3>
        <p>A role, a project, or a question—tell me a little about it.</p>
        <div className="query-flow">
          <div>
            <span>01</span>
            <p>
              <strong>You send a query</strong>
              <span>Your details and message come to my inbox.</span>
            </p>
          </div>
          <div>
            <span>02</span>
            <p>
              <strong>You get a confirmation copy</strong>
              <span>A copy of your query, so you have it for reference.</span>
            </p>
          </div>
          <div>
            <span>03</span>
            <p>
              <strong>We take it from there</strong>
              <span>I can reply directly to your email.</span>
            </p>
          </div>
        </div>
        <a className="text-link" href={`mailto:${profile.email}`}>
          Prefer email? Write directly <Icon name="arrowUp" />
        </a>
      </div>
      <div className="query-panel">
        {status === "success" ? (
          <div className="query-success" role="status">
            <span className="success-mark">
              <Icon name="check" />
            </span>
            <h4>Thanks for reaching out.</h4>
            <p>
              Your query was submitted. A confirmation copy has been requested
              for <strong>{receipt.email}</strong>. Please check your inbox and
              spam folder.
            </p>
            <p className="query-reference">REFERENCE / {receipt.reference}</p>
            <button
              className="text-link"
              onClick={() => {
                setFields(emptyForm);
                setErrors({});
                setReceipt(null);
                reference.current = null;
                setStatus("idle");
              }}
            >
              Send another query <Icon name="arrowRight" />
            </button>
          </div>
        ) : (
          <form
            ref={formRef}
            className="query-form"
            onSubmit={submit}
            noValidate
          >
            {!configured && (
              <div className="query-notice" role="status">
                <Icon name="file" />
                <p>
                  The form is temporarily unavailable. You can still{" "}
                  <a href={`mailto:${profile.email}`}>
                    email me directly <Icon name="arrowUp" />
                  </a>
                  .
                </p>
              </div>
            )}
            <div className="query-fields-row">
              <label htmlFor="query-name">
                Your name <span>*</span>
                <input
                  id="query-name"
                  name="name"
                  autoComplete="name"
                  required
                  minLength={2}
                  maxLength={80}
                  placeholder="Your name"
                  value={fields.name}
                  onChange={changeField}
                  disabled={status === "sending"}
                  aria-invalid={!!errors.name}
                  aria-describedby={
                    errors.name ? "query-name-error" : undefined
                  }
                />
                {errors.name && (
                  <span className="field-error" id="query-name-error">
                    {errors.name}
                  </span>
                )}
              </label>
              <label htmlFor="query-email">
                Email address <span>*</span>
                <input
                  id="query-email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  maxLength={254}
                  placeholder="you@company.com"
                  value={fields.email}
                  onChange={changeField}
                  disabled={status === "sending"}
                  aria-invalid={!!errors.email}
                  aria-describedby={
                    errors.email ? "query-email-error" : undefined
                  }
                />
                {errors.email && (
                  <span className="field-error" id="query-email-error">
                    {errors.email}
                  </span>
                )}
              </label>
            </div>
            <label htmlFor="query-subject">
              What is it about? <span>*</span>
              <input
                id="query-subject"
                name="subject"
                required
                minLength={3}
                maxLength={120}
                placeholder="An opportunity, a project, or a question"
                value={fields.subject}
                onChange={changeField}
                disabled={status === "sending"}
                aria-invalid={!!errors.subject}
                aria-describedby={
                  errors.subject ? "query-subject-error" : undefined
                }
              />
              {errors.subject && (
                <span className="field-error" id="query-subject-error">
                  {errors.subject}
                </span>
              )}
            </label>
            <label htmlFor="query-message">
              Your message <span>*</span>
              <textarea
                id="query-message"
                name="message"
                required
                minLength={10}
                maxLength={5000}
                rows={5}
                placeholder="Tell me what you have in mind…"
                value={fields.message}
                onChange={changeField}
                disabled={status === "sending"}
                aria-invalid={!!errors.message}
                aria-describedby={
                  errors.message
                    ? "query-message-error query-message-count"
                    : "query-message-count"
                }
              />
              {errors.message && (
                <span className="field-error" id="query-message-error">
                  {errors.message}
                </span>
              )}
            </label>
            <span id="query-message-count" className="message-count">
              {fields.message.length.toLocaleString()} / 5,000
            </span>
            {feedback && (
              <p className="form-feedback error" role="alert">
                {feedback}
              </p>
            )}
            <p className="query-consent">
              Submitting sends your details to Aryan and requests one
              confirmation email to you. No newsletter or mailing list.
            </p>
            <button
              type="submit"
              className="button button-dark query-submit"
              disabled={!configured || status === "sending"}
              aria-busy={status === "sending"}
            >
              {status === "sending" ? "Submitting…" : "Send query"}{" "}
              <Icon name={status === "sending" ? "mail" : "arrowUp"} />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
