import nodemailer from 'nodemailer';

const getRecipientEmail = () => process.env.EMAIL_TO || 'business@taksharatechnologies.com';

const createTransporter = () => {
  if (process.env.SMTP_USER && process.env.SMTP_PASS) {
    const port = Number(process.env.SMTP_PORT) || 587;
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: port,
      secure: port === 465, // true for port 465, false for port 587 / 25
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
  }

  // Local test mode if credentials not provided
  return nodemailer.createTransport({
    jsonTransport: true,
  });
};

export const sendContactEmail = async (contactData) => {
  const { firstName, lastName, email, company, inquiryType, message } = contactData;
  const recipientEmail = getRecipientEmail();
  const transporter = createTransporter();
  const senderEmail = process.env.SMTP_USER || email;

  const mailOptions = {
    from: `"${firstName} ${lastName} (via Website Form)" <${senderEmail}>`,
    to: recipientEmail,
    replyTo: `"${firstName} ${lastName}" <${email}>`,
    subject: `New Website Enquiry from ${firstName} ${lastName}`,
    text: `
New Enquiry from Takshara Technologies Website:

Name: ${firstName} ${lastName}
Business Email: ${email}
Company: ${company || 'N/A'}
Inquiry Type: ${inquiryType || 'General'}

Message:
${message}
    `.trim(),
    html: `
      <div style="font-family: Arial, sans-serif; font-size: 15px; color: #222222; line-height: 1.6; max-width: 600px;">
        <p><strong>You received a new inquiry from the website contact form:</strong></p>
        <ul style="padding-left: 20px; color: #333333;">
          <li><strong>Name:</strong> ${firstName} ${lastName}</li>
          <li><strong>Email:</strong> <a href="mailto:${email}">${email}</a></li>
          <li><strong>Company:</strong> ${company || 'N/A'}</li>
          <li><strong>Inquiry Type:</strong> ${inquiryType || 'General'}</li>
        </ul>
        <p style="font-weight: bold; margin-bottom: 4px;">Message:</p>
        <p style="white-space: pre-wrap; background-color: #f9f9f9; padding: 12px; border: 1px solid #eeeeee; border-radius: 4px; color: #333333;">${message}</p>
      </div>
    `,
  };

  const info = await transporter.sendMail(mailOptions);
  console.log(`[Contact Form] Admin notification email sent successfully to ${recipientEmail}:`, info.messageId || 'Success');

  // Send confirmation auto-reply email to the user if SMTP credentials are active
  if (process.env.SMTP_USER && process.env.SMTP_PASS && email) {
    try {
      const autoReplyOptions = {
        from: `"Takshara Technologies" <${process.env.SMTP_USER}>`,
        to: email,
        subject: `Thank you for contacting Takshara Technologies`,
        text: `Dear ${firstName} ${lastName},

Thank you for reaching out to Takshara Technologies. We have received your message regarding "${inquiryType || 'General Inquiry'}".

Our team is reviewing your inquiry and will get back to you as soon as possible (typically within 24 business hours).

Summary of your message:
- Name: ${firstName} ${lastName}
- Company: ${company || 'N/A'}
- Inquiry Type: ${inquiryType || 'General'}
- Message: ${message}

If you have any urgent questions, feel free to reply directly to this email or call us at +91 7089185703.

Best regards,
Takshara Technologies Team
business@taksharatechnologies.com`,
        html: `
          <div style="font-family: Arial, sans-serif; font-size: 15px; color: #222222; line-height: 1.6; max-width: 600px;">
            <p>Dear <strong>${firstName} ${lastName}</strong>,</p>
            
            <p>Thank you for reaching out to Takshara Technologies. We have received your message regarding <strong>${inquiryType || 'General Inquiry'}</strong>.</p>
            
            <p>Our team is reviewing your inquiry and will get back to you as soon as possible (typically within 24 business hours).</p>
            
            <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
            
            <p style="font-weight: bold; margin-bottom: 8px;">Summary of your submitted details:</p>
            <ul style="padding-left: 20px; margin: 0 0 20px 0; color: #444444;">
              <li><strong>Name:</strong> ${firstName} ${lastName}</li>
              <li><strong>Company:</strong> ${company || 'N/A'}</li>
              <li><strong>Inquiry Type:</strong> ${inquiryType || 'General'}</li>
              <li><strong>Message:</strong> ${message}</li>
            </ul>
            
            <p>If you have any urgent questions, feel free to reply directly to this email or call us at +91 7089185703.</p>
            
            <br />
            <p style="margin: 0;">Best regards,</p>
            <p style="margin: 0; font-weight: bold;">Takshara Technologies Team</p>
            <p style="margin: 0; color: #666666;">business@taksharatechnologies.com</p>
          </div>
        `,
      };
      await transporter.sendMail(autoReplyOptions);
      console.log(`[Contact Form] Confirmation auto-reply email sent to ${email}`);
    } catch (replyErr) {
      console.warn('[Contact Form Auto-reply Error]:', replyErr.message);
    }
  }

  return info;
};
