import React, { useState } from 'react';
import officeMap from '../assets/mapOf_takshara.png';

export default function Contact() {
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    if (errorMsg) setErrorMsg('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const rawApiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/contact';
      const backendUrl = rawApiUrl.includes('/api/contact')
        ? rawApiUrl
        : `${rawApiUrl.replace(/\/$/, '')}/api/contact`;

      const response = await fetch(backendUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitted(true);
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          company: '',
          inquiryType: '',
          message: '',
        });

        setTimeout(() => {
          setSubmitted(false);
        }, 5000);
      } else {
        setErrorMsg(data.message || 'Failed to send message. Please try again.');
      }
    } catch (err) {
      console.error('Contact form submission error:', err);
      setErrorMsg('Could not connect to backend server. Please check network or VITE_API_URL configuration.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col w-full">
      <div className="relative w-full overflow-hidden bg-surface-container-lowest">
        {/* Ambient Background Graphic */}
        <div className="absolute -top-[20%] -right-[10%] w-[60%] h-[120%] bg-gradient-to-bl from-primary-fixed/30 to-transparent rounded-full blur-3xl opacity-60 pointer-events-none"></div>
        <div className="absolute -bottom-[20%] -left-[10%] w-[50%] h-[100%] bg-gradient-to-tr from-secondary-fixed/20 to-transparent rounded-full blur-3xl opacity-40 pointer-events-none"></div>
        <div className="max-w-max mx-auto px-margin-mobile lg:px-margin-desktop py-margin-desktop lg:py-[120px] relative z-10">

          {/* Header Section */}
          <div className="flex flex-col gap-base mb-margin-desktop lg:w-2/3">
            <span className="font-label-md text-label-md text-primary uppercase tracking-wider">Connect With Us</span>
            <h1 className="font-headline-lg text-headline-lg text-on-surface">Let's Discuss Your Digital Transformation.</h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-[800px] mt-4">
              Whether you're looking to simplify payment collection, automate bulk payouts, or verify merchants and customers at scale, our team of experts is ready to help.
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-margin-desktop relative">

            {/* Left Column: Contact Form */}
            <div className="lg:col-span-7 flex flex-col gap-gutter">
              <div className="bg-surface rounded-2xl p-gutter lg:p-[40px] shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full pointer-events-none"></div>
                <h2 className="font-headline-md text-headline-md text-on-surface mb-6">Send a Message</h2>
                <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* First Name */}
                    <div className="flex flex-col gap-2 group">
                      <label className="font-label-md text-label-md text-on-surface" htmlFor="firstName">First Name</label>
                      <input
                        className="w-full bg-surface-container-lowest text-on-surface font-body-md text-body-md rounded-lg px-4 py-3 outline-none border border-outline-variant focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                        id="firstName"
                        required
                        type="text"
                        value={formData.firstName}
                        onChange={handleChange}
                      />
                    </div>
                    {/* Last Name */}
                    <div className="flex flex-col gap-2 group">
                      <label className="font-label-md text-label-md text-on-surface" htmlFor="lastName">Last Name</label>
                      <input
                        className="w-full bg-surface-container-lowest text-on-surface font-body-md text-body-md rounded-lg px-4 py-3 outline-none border border-outline-variant focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                        id="lastName"
                        required
                        type="text"
                        value={formData.lastName}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-2 group">
                    <label className="font-label-md text-label-md text-on-surface" htmlFor="email">Business Email</label>
                    <input
                      className="w-full bg-surface-container-lowest text-on-surface font-body-md text-body-md rounded-lg px-4 py-3 outline-none border border-outline-variant focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                      id="email"
                      required
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Company & Inquiry Type */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2 group">
                      <label className="font-label-md text-label-md text-on-surface" htmlFor="company">Company</label>
                      <input
                        className="w-full bg-surface-container-lowest text-on-surface font-body-md text-body-md rounded-lg px-4 py-3 outline-none border border-outline-variant focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                        id="company"
                        type="text"
                        value={formData.company}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="flex flex-col gap-2 group">
                      <label className="font-label-md text-label-md text-on-surface" htmlFor="inquiryType">Inquiry Type</label>
                      <select
                        className="w-full bg-surface-container-lowest text-on-surface font-body-md text-body-md rounded-lg px-4 py-3 outline-none border border-outline-variant focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 appearance-none cursor-pointer"
                        id="inquiryType"
                        value={formData.inquiryType}
                        onChange={handleChange}
                      >
                        <option disabled value="">Select an option</option>
                        <option value="cloud">Cloud Systems</option>
                        <option value="data">Data Analytics</option>
                        <option value="security">Cyber Security</option>
                        <option value="other">Other / General</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="flex flex-col gap-2 group">
                    <label className="font-label-md text-label-md text-on-surface" htmlFor="message">Message</label>
                    <textarea
                      className="w-full bg-surface-container-lowest text-on-surface font-body-md text-body-md rounded-lg px-4 py-3 outline-none border border-outline-variant focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 resize-none"
                      id="message"
                      required
                      rows="5"
                      value={formData.message}
                      onChange={handleChange}
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <div className="mt-4">
                    <button
                      disabled={isSubmitting}
                      className={`w-full md:w-auto px-8 py-4 ${submitted ? 'bg-tertiary' : 'bg-primary'} text-on-primary font-label-md text-label-md rounded-lg hover:bg-primary-container hover:shadow-md transition-all duration-300 flex items-center justify-center gap-2 group ${isSubmitting ? 'opacity-80 cursor-not-allowed' : ''}`}
                      type="submit"
                    >
                      <span>{isSubmitting ? 'Sending...' : submitted ? 'Message Sent!' : 'Send Message'}</span>
                      <span className="material-symbols-outlined text-on-primary group-hover:translate-x-1 transition-transform">
                        {isSubmitting ? 'hourglass_empty' : submitted ? 'check' : 'arrow_forward'}
                      </span>
                    </button>
                    {errorMsg && (
                      <p className="font-label-sm text-label-sm text-error mt-2">{errorMsg}</p>
                    )}
                  </div>
                </form>
              </div>
            </div>

            {/* Right Column: Info & Map */}
            <div className="lg:col-span-5 flex flex-col gap-gutter">
              {/* Contact Info Card */}
              <div className="bg-surface-container-low rounded-2xl p-gutter lg:p-[40px] shadow-sm flex flex-col gap-8">
                <h3 className="font-headline-md text-headline-md text-on-surface">Global Headquarters</h3>
                <div className="flex flex-col gap-6">
                  {/* Address */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-on-primary-fixed" style={{ fontVariationSettings: "'FILL' 1" }}>location_on</span>
                    </div>
                    <div>
                      <h4 className="font-label-md text-label-md text-on-surface mb-1">Address</h4>
                      <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                        Second Floor,Vasundra Tower,<br />
                        Behind S.P.Office,Patel Nagar,<br />
                        City Center Gwalior,<br />
                        Madhya Pradesh, India - 474002
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-secondary-fixed flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-on-secondary-fixed" style={{ fontVariationSettings: "'FILL' 1" }}>call</span>
                    </div>
                    <div>
                      <h4 className="font-label-md text-label-md text-on-surface mb-1">Phone</h4>
                      <p className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors cursor-pointer">
                        +91 7089185703
                      </p>
                      <p className="font-label-sm text-label-sm text-outline mt-1">Mon-Fri, 9am - 6pm PST</p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-tertiary-fixed flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-on-tertiary-fixed" style={{ fontVariationSettings: "'FILL' 1" }}>mail</span>
                    </div>
                    <div>
                      <h4 className="font-label-md text-label-md text-on-surface mb-1">Email</h4>
                      <a
                        href="mailto:Contact@cairnlooptechnologies.com"
                        className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
                      >
                        Contact@cairnlooptechnologies.com
                      </a>
                      <p className="font-label-sm text-label-sm text-outline mt-1">We typically reply within 24 hours.</p>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="mt-4 pt-6 border-t border-outline-variant flex items-center gap-4">
                  <span className="font-label-md text-label-md text-on-surface mr-2">Follow Us:</span>
                  <a className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center hover:bg-primary-fixed hover:text-on-primary-fixed transition-colors text-on-surface-variant" href="#">
                    <span className="material-symbols-outlined text-[20px]">language</span>
                  </a>
                  <a className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center hover:bg-primary-fixed hover:text-on-primary-fixed transition-colors text-on-surface-variant" href="#">
                    <span className="material-symbols-outlined text-[20px]">share</span>
                  </a>
                </div>
              </div>

              {/* Map Container */}
              <div className="h-[300px] w-full rounded-2xl overflow-hidden shadow-sm relative group">
                <img
                  alt="Cairnloop Office Map"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  src={officeMap}
                />
                <div className="absolute bottom-4 left-4 right-4 bg-surface-container-lowest/90 backdrop-blur-sm p-4 rounded-xl flex items-center justify-between border border-outline-variant/50">
                  <span className="font-label-md text-label-md text-on-surface">View on Google Maps</span>
                  <a
                    href="https://share.google/cX0j6AHSpBQZnhmGH"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="w-8 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-primary-container transition-colors">
                      <span className="material-symbols-outlined text-on-primary text-[16px]">
                        open_in_new
                      </span>
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
