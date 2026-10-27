import { Resend } from 'resend';

/**
 * Validates whether Resend is configured
 */
export const isResendConfigured = () => {
  return Boolean(process.env.RESEND_API_KEY?.trim());
};

/**
 * Verifies Email Service configuration status without leaking keys
 */
export const verifyEmailService = async () => {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const contactTo = (process.env.CONTACT_TO || process.env.EMAIL_TO || 'contact@cairnlooptechnologies.com')?.trim();
  const contactFrom = (process.env.CONTACT_FROM || 'Cairnloop Technologies <contact@cairnlooptechnologies.com>')?.trim();

  if (!apiKey) {
    return {
      connected: false,
      provider: 'resend',
      message: 'RESEND_API_KEY missing. Please configure RESEND_API_KEY in environment variables.',
      recipient: contactTo,
      sender: contactFrom,
    };
  }

  return {
    connected: true,
    provider: 'resend',
    message: 'Resend API key configured and ready for HTTPS delivery.',
    recipient: contactTo,
    sender: contactFrom,
  };
};

// Backwards compatibility alias
export const verifySmtpConnection = verifyEmailService;

/**
 * Sends a contact inquiry email via Resend's HTTPS API
 *
 * @param {Object} data
 * @param {string} data.fullName - Visitor's full name
 * @param {string} data.email - Visitor's business email
 * @param {string} [data.company] - Visitor's company
 * @param {string} [data.service] - Service of interest / Inquiry type
 * @param {string} data.message - Inquiry message content
 */
export const sendContactEmail = async ({ fullName, email, company, service, message }) => {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const recipient = (process.env.CONTACT_TO || process.env.EMAIL_TO || 'contact@cairnlooptechnologies.com')?.trim();
  const sender = (process.env.CONTACT_FROM || 'Cairnloop Technologies <contact@cairnlooptechnologies.com>')?.trim();

  const cleanFullName = fullName?.trim() || 'Website Visitor';
  const cleanEmail = email?.trim();
  const cleanCompany = company?.trim() || 'Not specified';
  const cleanService = service?.trim() || 'General Inquiry';
  const cleanMessage = message?.trim();
  const timestamp = new Date().toLocaleString('en-US', {
    timeZone: 'UTC',
    dateStyle: 'full',
    timeStyle: 'long',
  });

  // 1. Check if Resend API key is present
  if (!apiKey) {
    // In local development, simulate delivery if key is not yet set
    const isDev = process.env.NODE_ENV !== 'production' || process.env.ALLOW_DEV_FALLBACK === 'true';
    if (isDev) {
      console.log(`\n=============================================================`);
      console.log(`[Contact Form — Dev Mode Fallback]`);
      console.log(`Inquiry received successfully (RESEND_API_KEY not configured):`);
      console.log(`• Timestamp:   ${timestamp}`);
      console.log(`• Name:        ${cleanFullName}`);
      console.log(`• Email:       ${cleanEmail}`);
      console.log(`• Company:     ${cleanCompany}`);
      console.log(`• Service:     ${cleanService}`);
      console.log(`• Message:     ${cleanMessage}`);
      console.log(`• Target:      ${recipient}`);
      console.log(`• Sender:      ${sender}`);
      console.log(`💡 Note: Set RESEND_API_KEY in backend/.env for live Resend delivery.`);
      console.log(`=============================================================\n`);

      return {
        id: `simulated-dev-${Date.now()}`,
        simulated: true,
      };
    }

    const missingErr = new Error('Email service credentials are not configured on the server. Please set RESEND_API_KEY in Render environment variables.');
    missingErr.code = 'EMAIL_CONFIG_MISSING';
    console.error(`[Resend Config Error]: ${missingErr.message}`);
    throw missingErr;
  }

  // 2. Validate recipient inbox configuration
  if (!recipient) {
    const recipientErr = new Error('Destination inbox (CONTACT_TO) is not configured.');
    recipientErr.code = 'EMAIL_CONFIG_MISSING';
    console.error(`[Resend Config Error]: ${recipientErr.message}`);
    throw recipientErr;
  }

  // 3. Construct plain-text email version
  const textContent = `
New Website Inquiry — Cairnloop Technologies
==================================================

Date & Time: ${timestamp} (UTC)

Contact Information:
- Full Name: ${cleanFullName}
- Email Address: ${cleanEmail}
- Company: ${cleanCompany}
- Service of Interest: ${cleanService}

Message:
--------------------------------------------------
${cleanMessage}
--------------------------------------------------

* You can reply directly to this email to contact ${cleanFullName} (${cleanEmail}).
`.trim();

  // 4. Construct branded HTML email version
  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #1e293b; margin: 0; padding: 24px; }
    .container { max-width: 620px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); }
    .header { background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); color: #ffffff; padding: 28px 32px; }
    .header h1 { margin: 0; font-size: 20px; font-weight: 700; letter-spacing: -0.01em; color: #ffffff; }
    .header p { margin: 6px 0 0; font-size: 13px; color: #94a3b8; }
    .content { padding: 32px; }
    .field-group { margin-bottom: 20px; }
    .field-label { font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b; margin-bottom: 4px; }
    .field-value { font-size: 15px; color: #0f172a; font-weight: 500; }
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 20px; }
    .message-box { background: #f1f5f9; border-radius: 8px; border-left: 4px solid #0284c7; padding: 16px; margin-top: 8px; }
    .message-text { margin: 0; white-space: pre-wrap; font-size: 14px; line-height: 1.6; color: #334155; }
    .footer { background: #f8fafc; border-top: 1px solid #e2e8f0; padding: 18px 32px; font-size: 12px; color: #64748b; }
    .badge { display: inline-block; padding: 4px 10px; background: #e0f2fe; color: #0369a1; border-radius: 9999px; font-size: 12px; font-weight: 600; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>New Website Inquiry</h1>
      <p>Cairnloop Technologies — Contact Form Notification</p>
    </div>
    <div class="content">
      <div class="grid">
        <div class="field-group">
          <div class="field-label">Full Name</div>
          <div class="field-value">${cleanFullName}</div>
        </div>
        <div class="field-group">
          <div class="field-label">Company</div>
          <div class="field-value">${cleanCompany}</div>
        </div>
      </div>
      <div class="grid">
        <div class="field-group">
          <div class="field-label">Business Email</div>
          <div class="field-value"><a href="mailto:${cleanEmail}" style="color: #0284c7; text-decoration: none;">${cleanEmail}</a></div>
        </div>
        <div class="field-group">
          <div class="field-label">Service of Interest</div>
          <div class="field-value"><span class="badge">${cleanService}</span></div>
        </div>
      </div>
      <div class="field-group">
        <div class="field-label">Message Content</div>
        <div class="message-box">
          <p class="message-text">${cleanMessage}</p>
        </div>
      </div>
    </div>
    <div class="footer">
      Received on ${timestamp} (UTC). Replying directly to this email will respond to <strong>${cleanEmail}</strong>.
    </div>
  </div>
</body>
</html>
`.trim();

  // 5. Send through Resend HTTPS API
  const resend = new Resend(apiKey);

  try {
    const { data, error } = await resend.emails.send({
      from: sender,
      to: [recipient],
      replyTo: cleanEmail,
      subject: `New Website Inquiry — Cairnloop Technologies (${cleanFullName})`,
      text: textContent,
      html: htmlContent,
    });

    if (error) {
      console.error(`[Resend API Error]: ${error.name || 'Error'} — ${error.message || 'Unknown error'}`);
      const deliveryErr = new Error(error.message || 'Resend rejected email send request.');
      deliveryErr.code = 'EMAIL_DELIVERY_FAILED';
      deliveryErr.statusCode = error.statusCode || 502;
      deliveryErr.details = error;
      throw deliveryErr;
    }

    if (!data || !data.id) {
      const emptyErr = new Error('Resend did not return a valid message ID.');
      emptyErr.code = 'EMAIL_DELIVERY_FAILED';
      throw emptyErr;
    }

    console.log(`[Resend] Email sent successfully to ${recipient} (Message ID: ${data.id})`);
    return { id: data.id, simulated: false };
  } catch (err) {
    if (err.code === 'EMAIL_DELIVERY_FAILED') {
      throw err;
    }
    console.error(`[Resend Network Error]: ${err.message}`);
    const networkErr = new Error('Failed to deliver email through Resend API.');
    networkErr.code = 'EMAIL_DELIVERY_FAILED';
    networkErr.originalMessage = err.message;
    throw networkErr;
  }
};
