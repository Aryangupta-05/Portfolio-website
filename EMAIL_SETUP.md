# Query email setup — free plan

## Connected configuration

- Gmail connected as aryangupta050903@gmail.com in EmailJS.
- Service: service_fov0q6d.
- Main notification: template_n4zjvin.
- Linked acknowledgement: template_hqanvgt.
- The three public identifiers are configured in the ignored .env.local. No private key, mailbox password, or payment details are used by the application.

## Visitor flow

1. Fill in name, email, subject, and message.
2. Click Send query. The form checks required fields and sends one EmailJS request.
3. The main template sends the query to Aryan, with the visitor as Reply-To.
4. Its linked Auto-Reply template sends the visitor the same message and reference. Reply-To points back to Aryan.
5. The page confirms provider submission, not inbox delivery. There are no automatic send retries.

The owner explicitly requested no CAPTCHA or spam-protection step. Provider-side reCAPTCHA was checked and remains off. The form does not load Google reCAPTCHA, require a CAPTCHA token, or include a honeypot. Ordinary required-field validation and duplicate-click suppression remain.

## Local and Vercel configuration

For a new checkout, copy .env.example to .env.local and supply these public values:

- VITE_EMAILJS_SERVICE_ID
- VITE_EMAILJS_TEMPLATE_ID
- VITE_EMAILJS_PUBLIC_KEY

Run npm.cmd run build after changing them. For Vercel, add the same three variables to the existing project and rebuild/redeploy. This local setup does not update the live Vercel environment variables by itself. Without all three values, the deployed form displays an unavailable notice and keeps direct email available.

The notification template uses from_name/from_email for compatibility with the older portfolio; the new form supplies these aliases along with name/email. Both HTML templates are in email-templates/. Keep the owner's recipient fixed in the main template, and retain the linked acknowledgement in its Auto-Reply tab.

## Free-only constraint

No paid plan, payment method, domain purchase, or upgrade was enabled. The dashboard showed 200 requests available on October 19, 2026. Each query pair uses two requests, so 100 complete pairs is an upper bound before other usage. Stay within the free quota.

## Verification

Both provider templates were saved successfully, the existing Gmail connection was verified, and the primary template's Auto-Reply selection was confirmed. Unit tests use a mocked provider; they do not send email. No real test email was sent during setup. To verify inbox delivery, submit one query yourself from a second address and check both inboxes and EmailJS Email History before retrying an uncertain submission.
