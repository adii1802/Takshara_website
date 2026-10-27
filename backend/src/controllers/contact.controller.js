import { sendContactEmail, verifySmtpConnection } from '../services/email.service.js';

// Email validation regex according to RFC 5322 standard basics
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

export const handleContactForm = async (req, res) => {
  try {
    const {
      fullName,
      name,
      firstName,
      lastName,
      email,
      company,
      service,
      serviceOfInterest,
      inquiryType,
      message,
    } = req.body || {};

    // Determine unified full name
    const resolvedName = (fullName || name || `${firstName || ''} ${lastName || ''}`).trim();
    const resolvedEmail = (email || '').trim();
    const resolvedCompany = (company || '').trim();
    const resolvedService = (service || serviceOfInterest || inquiryType || '').trim();
    const resolvedMessage = (message || '').trim();

    // 1. Validation - Required fields
    if (!resolvedName) {
      return res.status(400).json({
        success: false,
        message: 'Full name is required.',
      });
    }

    if (!resolvedEmail) {
      return res.status(400).json({
        success: false,
        message: 'Email address is required.',
      });
    }

    if (!resolvedMessage) {
      return res.status(400).json({
        success: false,
        message: 'Message content is required.',
      });
    }

    // 2. Validation - Field lengths
    if (resolvedName.length > 100) {
      return res.status(400).json({
        success: false,
        message: 'Name is too long (maximum 100 characters).',
      });
    }

    if (resolvedEmail.length > 100) {
      return res.status(400).json({
        success: false,
        message: 'Email address is too long (maximum 100 characters).',
      });
    }

    if (resolvedCompany.length > 100) {
      return res.status(400).json({
        success: false,
        message: 'Company name is too long (maximum 100 characters).',
      });
    }

    if (resolvedService.length > 100) {
      return res.status(400).json({
        success: false,
        message: 'Service of interest is too long (maximum 100 characters).',
      });
    }

    if (resolvedMessage.length > 5000) {
      return res.status(400).json({
        success: false,
        message: 'Message exceeds the maximum allowed length of 5000 characters.',
      });
    }

    // 3. Validation - Email format and header injection prevention
    if (!EMAIL_REGEX.test(resolvedEmail) || /[\r\n]/.test(resolvedEmail)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address.',
      });
    }

    // Check for CRLF injection in name field
    if (/[\r\n]/.test(resolvedName)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid characters detected in name.',
      });
    }

    // 4. Send email through Hostinger SMTP
    await sendContactEmail({
      fullName: resolvedName,
      email: resolvedEmail,
      company: resolvedCompany,
      service: resolvedService,
      message: resolvedMessage,
    });

    return res.status(200).json({
      success: true,
      message: 'Your inquiry has been received. Our team will contact you shortly.',
    });
  } catch (error) {
    // Check specific configuration errors
    if (error.code === 'SMTP_NOT_CONFIGURED') {
      return res.status(503).json({
        success: false,
        message: 'Email service is temporarily unavailable. Server SMTP credentials are not configured.',
      });
    }

    // Never leak stack trace or internal config to browser
    return res.status(500).json({
      success: false,
      message: 'Failed to send inquiry due to an unexpected server issue. Please try again later or contact us directly.',
    });
  }
};

/**
 * Endpoint to check Hostinger SMTP connectivity without leaking secrets
 */
export const checkSmtpHealth = async (req, res) => {
  try {
    const result = await verifySmtpConnection();
    if (result.connected) {
      return res.status(200).json({
        status: 'ready',
        host: process.env.SMTP_HOST || 'smtp.hostinger.com',
        port: parseInt(process.env.SMTP_PORT, 10) || 465,
        secure: true,
        message: result.message,
      });
    } else {
      return res.status(503).json({
        status: 'not_configured',
        host: process.env.SMTP_HOST || 'smtp.hostinger.com',
        message: result.message,
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: 'error',
      message: 'Failed to verify SMTP connection.',
    });
  }
};
