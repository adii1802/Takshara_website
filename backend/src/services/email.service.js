import nodemailer from 'nodemailer';
import dns from 'dns';

// Custom DNS lookup forcing IPv4 to prevent ENETUNREACH on platforms without IPv6 egress
const customIPv4Lookup = (hostname, options, callback) => {
  return dns.lookup(hostname, { ...options, family: 4 }, callback);
};

/**
 * Creates and configures the Nodemailer transporter for Hostinger SMTP
 */
export const createTransporter = () => {
  const host = process.env.SMTP_HOST || 'smtp.hostinger.com';
  const port = parseInt(process.env.SMTP_PORT, 10) || 465;
  const secure = process.env.SMTP_SECURE === 'false' ? false : (port === 465 || process.env.SMTP_SECURE === 'true');

  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS?.trim();

  if (!user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure, // true for port 465 (SSL)
    auth: {
      user,
      pass,
    },
    lookup: customIPv4Lookup,
    family: 4,
    connectionTimeout: 15000,
    greetingTimeout: 15000,
    socketTimeout: 20000,
    tls: {
      rejectUnauthorized: true,
      minVersion: 'TLSv1.2',
    },
  });
};

/**
 * Verifies Hostinger SMTP connection status
 */
export const verifySmtpConnection = async () => {
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS?.trim();

  if (!user || !pass) {
    return {
      connected: false,
      message: 'SMTP credentials missing. Please configure SMTP_USER and SMTP_PASS in backend/.env',
    };
  }

  try {
    const transporter = createTransporter();
    if (!transporter) {
      return {
        connected: false,
        message: 'Unable to initialize SMTP transporter.',
      };
    }

    await transporter.verify();
    return {
      connected: true,
      message: `Hostinger SMTP connection verified successfully for ${user}`,
    };
  } catch (error) {
    // Sanitize error to avoid leaking credentials
    const safeError = error.message || 'SMTP Authentication / Connection Error';
    return {
      connected: false,
      message: `Hostinger SMTP connection failed: ${safeError}`,
    };
  }
};

/**
 * Sends a contact inquiry email via Hostinger SMTP
 *
 * @param {Object} data
 * @param {string} data.fullName - Visitor's name
 * @param {string} data.email - Visitor's business email
 * @param {string} [data.company] - Visitor's company
 * @param {string} [data.service] - Service of interest / Inquiry type
 * @param {string} data.message - Inquiry message
 */
export const sendContactEmail = async ({ fullName, email, company, service, message }) => {
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS?.trim();
  const recipient = (process.env.CONTACT_TO || process.env.EMAIL_TO || user)?.trim();

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

  if (!user || !pass) {
    // In development (or when dev fallback is allowed), log the inquiry and simulate success
    const isDev = process.env.NODE_ENV !== 'production' || process.env.ALLOW_DEV_FALLBACK === 'true';
    if (isDev) {
      console.log(`\n=============================================================`);
      console.log(`[Contact Form — Dev Mode Fallback]`);
      console.log(`Inquiry received successfully (SMTP_PASS not configured in backend/.env):`);
      console.log(`• Timestamp:   ${timestamp}`);
      console.log(`• Name:        ${cleanFullName}`);
      console.log(`• Email:       ${cleanEmail}`);
      console.log(`• Company:     ${cleanCompany}`);
      console.log(`• Service:     ${cleanService}`);
      console.log(`• Message:     ${cleanMessage}`);
      console.log(`• Destination: ${recipient || 'contact@cairnlooptechnologies.com'}`);
      console.log(`💡 To deliver real emails to ${recipient || 'contact@cairnlooptechnologies.com'}, configure SMTP_PASS in backend/.env.`);
      console.log(`=============================================================\n`);

      return {
        messageId: `<dev-mock-${Date.now()}@localhost>`,
        simulated: true,
      };
    }

    const missingErr = new Error('SMTP credentials are not configured on the server. Please set SMTP_USER and SMTP_PASS in backend/.env.');
    missingErr.code = 'SMTP_NOT_CONFIGURED';
    console.error(`[Hostinger SMTP Config Error]: ${missingErr.message}`);
    throw missingErr;
  }

  if (!recipient) {
    const recipientErr = new Error('Destination inbox (CONTACT_TO) is not configured.');
    recipientErr.code = 'RECIPIENT_NOT_CONFIGURED';
    console.error(`[Hostinger SMTP Config Error]: ${recipientErr.message}`);
    throw recipientErr;
  }

  const transporter = createTransporter();
  if (!transporter) {
    throw new Error('Failed to create mail transporter.');
  }

  // Plain-text alternative
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

  // HTML email formatted with Cairnloop branding
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

  // IMPORTANT Hostinger & Security settings:
  // - from: MUST be the authenticated Hostinger business email (SMTP_USER)
  // - replyTo: Set to the visitor's email address so owner can reply directly
  // - to: CONTACT_TO recipient inbox
  const mailOptions = {
    from: `"${cleanFullName} (via Cairnloop)" <${user}>`,
    to: recipient,
    replyTo: `"${cleanFullName}" <${cleanEmail}>`,
    subject: `New Website Inquiry — Cairnloop Technologies (${cleanFullName})`,
    text: textContent,
    html: htmlContent,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`[Hostinger SMTP] Email sent successfully to ${recipient} (Message ID: ${info.messageId})`);
    return info;
  } catch (error) {
    console.error(`[Hostinger SMTP Send Error]:`, error.message);
    const deliveryErr = new Error('Failed to deliver email through SMTP server.');
    deliveryErr.originalCode = error.code;
    throw deliveryErr;
  }
};
