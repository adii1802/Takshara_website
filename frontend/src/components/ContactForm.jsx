import React, { useState } from 'react';

// Email validation regex (RFC 5322 compatible)
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

export default function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    inquiryType: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    if (errorMsg) setErrorMsg('');
  };

  const validateFrontend = () => {
    const trimmedFirstName = formData.firstName.trim();
    const trimmedLastName = formData.lastName.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedMessage = formData.message.trim();

    if (!trimmedFirstName) {
      return 'Please enter your first name.';
    }
    if (!trimmedLastName) {
      return 'Please enter your last name.';
    }
    if (!trimmedEmail) {
      return 'Please enter your business email address.';
    }
    if (!EMAIL_REGEX.test(trimmedEmail)) {
      return 'Please enter a valid email address.';
    }
    if (!trimmedMessage) {
      return 'Please enter your message.';
    }
    if (trimmedMessage.length > 5000) {
      return 'Message cannot exceed 5000 characters.';
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent duplicate submissions
    if (isSubmitting) return;

    // Frontend validation
    const validationError = validateFrontend();
    if (validationError) {
      setErrorMsg(validationError);
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      // Determine public backend API base URL using VITE_API_BASE_URL (with fallback to VITE_API_URL or localhost:5000)
      const rawBase = (
        import.meta.env.VITE_API_BASE_URL ||
        import.meta.env.VITE_API_URL ||
        'http://localhost:5000'
      ).trim().replace(/\/+$/, '');

      const endpoint = rawBase.endsWith('/api/contact')
        ? rawBase
        : rawBase.endsWith('/api')
          ? `${rawBase}/contact`
          : `${rawBase}/api/contact`;

      const payload = {
        fullName: `${formData.firstName.trim()} ${formData.lastName.trim()}`.trim(),
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim(),
        company: formData.company.trim(),
        service: formData.inquiryType || 'General Inquiry',
        inquiryType: formData.inquiryType || 'General Inquiry',
        message: formData.message.trim(),
      };

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok && data.success) {
        setSubmitted(true);
        setSuccessMsg(
          data.message ||
            'Your inquiry has been received. Our team will contact you shortly.'
        );

        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          company: '',
          inquiryType: '',
          message: '',
        });

        // Reset button state after 6 seconds
        setTimeout(() => {
          setSubmitted(false);
        }, 6000);
      } else {
        const errorDetail =
          data.message ||
          (response.status === 503
            ? 'Email service is currently offline. Please try again soon.'
            : 'Failed to send message. Please verify your details and try again.');
        setErrorMsg(errorDetail);
      }
    } catch (err) {
      console.error('[ContactForm Error]:', err);
      setErrorMsg(
        'Unable to reach the inquiry server. Please check your network connection or try again later.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-surface rounded-2xl p-gutter lg:p-[40px] shadow-sm relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full pointer-events-none"></div>
      <h2 className="font-headline-md text-headline-md text-on-surface mb-6">Send a Message</h2>

      {/* Success Notification Banner */}
      {successMsg && (
        <div
          role="status"
          aria-live="polite"
          className="mb-6 p-4 rounded-xl bg-tertiary-fixed/30 border border-tertiary text-on-tertiary-container flex items-start gap-3 transition-all duration-300"
        >
          <span className="material-symbols-outlined text-tertiary shrink-0 mt-0.5">check_circle</span>
          <div>
            <p className="font-label-md text-label-md font-semibold text-tertiary">Inquiry Received</p>
            <p className="font-body-md text-body-md text-on-surface mt-1">{successMsg}</p>
          </div>
        </div>
      )}

      {/* Error Notification Banner */}
      {errorMsg && (
        <div
          role="alert"
          aria-live="polite"
          className="mb-6 p-4 rounded-xl bg-error-container/40 border border-error text-error flex items-start gap-3 transition-all duration-300"
        >
          <span className="material-symbols-outlined text-error shrink-0 mt-0.5">error</span>
          <div>
            <p className="font-label-md text-label-md font-semibold text-error">Unable to Send</p>
            <p className="font-body-md text-body-md text-on-surface mt-1">{errorMsg}</p>
          </div>
        </div>
      )}

      <form className="flex flex-col gap-6" onSubmit={handleSubmit} noValidate>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* First Name */}
          <div className="flex flex-col gap-2 group">
            <label className="font-label-md text-label-md text-on-surface" htmlFor="firstName">
              First Name <span className="text-primary">*</span>
            </label>
            <input
              className="w-full bg-surface-container-lowest text-on-surface font-body-md text-body-md rounded-lg px-4 py-3 outline-none border border-outline-variant focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
              id="firstName"
              required
              maxLength={100}
              type="text"
              placeholder="e.g. Alex"
              value={formData.firstName}
              onChange={handleChange}
              disabled={isSubmitting}
            />
          </div>

          {/* Last Name */}
          <div className="flex flex-col gap-2 group">
            <label className="font-label-md text-label-md text-on-surface" htmlFor="lastName">
              Last Name <span className="text-primary">*</span>
            </label>
            <input
              className="w-full bg-surface-container-lowest text-on-surface font-body-md text-body-md rounded-lg px-4 py-3 outline-none border border-outline-variant focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
              id="lastName"
              required
              maxLength={100}
              type="text"
              placeholder="e.g. Vance"
              value={formData.lastName}
              onChange={handleChange}
              disabled={isSubmitting}
            />
          </div>
        </div>

        {/* Business Email */}
        <div className="flex flex-col gap-2 group">
          <label className="font-label-md text-label-md text-on-surface" htmlFor="email">
            Business Email <span className="text-primary">*</span>
          </label>
          <input
            className="w-full bg-surface-container-lowest text-on-surface font-body-md text-body-md rounded-lg px-4 py-3 outline-none border border-outline-variant focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
            id="email"
            required
            maxLength={100}
            type="email"
            placeholder="alex@company.com"
            value={formData.email}
            onChange={handleChange}
            disabled={isSubmitting}
          />
        </div>

        {/* Company & Inquiry Type */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2 group">
            <label className="font-label-md text-label-md text-on-surface" htmlFor="company">
              Company Name
            </label>
            <input
              className="w-full bg-surface-container-lowest text-on-surface font-body-md text-body-md rounded-lg px-4 py-3 outline-none border border-outline-variant focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
              id="company"
              maxLength={100}
              type="text"
              placeholder="e.g. Acme Fintech Ltd"
              value={formData.company}
              onChange={handleChange}
              disabled={isSubmitting}
            />
          </div>
          <div className="flex flex-col gap-2 group">
            <label className="font-label-md text-label-md text-on-surface" htmlFor="inquiryType">
              Service of Interest
            </label>
            <select
              className="w-full bg-surface-container-lowest text-on-surface font-body-md text-body-md rounded-lg px-4 py-3 outline-none border border-outline-variant focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 appearance-none cursor-pointer"
              id="inquiryType"
              value={formData.inquiryType}
              onChange={handleChange}
              disabled={isSubmitting}
            >
              <option value="">Select an option</option>
              <option value="Payment Gateway & Collections">Payment Gateway & Collections</option>
              <option value="Bulk Payouts & Transfers">Bulk Payouts & Transfers</option>
              <option value="Merchant Verification & Identity">Merchant Verification & Identity</option>
              <option value="Cloud Systems">Cloud Systems</option>
              <option value="Data Analytics">Data Analytics</option>
              <option value="Cyber Security">Cyber Security</option>
              <option value="Custom Fintech Infrastructure">Custom Fintech Infrastructure</option>
              <option value="Other / General Inquiry">Other / General Inquiry</option>
            </select>
          </div>
        </div>

        {/* Message */}
        <div className="flex flex-col gap-2 group">
          <label className="font-label-md text-label-md text-on-surface" htmlFor="message">
            Message <span className="text-primary">*</span>
          </label>
          <textarea
            className="w-full bg-surface-container-lowest text-on-surface font-body-md text-body-md rounded-lg px-4 py-3 outline-none border border-outline-variant focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 resize-none"
            id="message"
            required
            maxLength={5000}
            rows="5"
            placeholder="Tell us about your requirements, transaction volume, or infrastructure questions..."
            value={formData.message}
            onChange={handleChange}
            disabled={isSubmitting}
          ></textarea>
          <div className="flex justify-end text-outline text-xs">
            {formData.message.length}/5000 characters
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-2">
          <button
            disabled={isSubmitting}
            aria-busy={isSubmitting}
            className={`w-full md:w-auto px-8 py-4 ${
              submitted ? 'bg-tertiary' : 'bg-primary'
            } text-on-primary font-label-md text-label-md rounded-lg hover:bg-primary-container hover:shadow-md transition-all duration-300 flex items-center justify-center gap-2 group ${
              isSubmitting ? 'opacity-80 cursor-not-allowed' : ''
            }`}
            type="submit"
          >
            <span>
              {isSubmitting
                ? 'Sending Inquiry...'
                : submitted
                ? 'Message Sent!'
                : 'Send Message'}
            </span>
            <span className="material-symbols-outlined text-on-primary group-hover:translate-x-1 transition-transform">
              {isSubmitting
                ? 'hourglass_empty'
                : submitted
                ? 'check'
                : 'arrow_forward'}
            </span>
          </button>
        </div>
      </form>
    </div>
  );
}
