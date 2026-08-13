import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import airVideo from '../assets/can_u_able_to_see_video_of_air.mp4';
import taksharaVideo from '../assets/for_Takshara_Technologies_and.mp4';
import mapOfTakshara from '../assets/mapOf_takshara.png';

export default function Home() {
  const [activeTab, setActiveTab] = useState('accept');

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="w-full max-w-max mx-auto px-margin-mobile lg:px-margin-desktop py-margin-desktop flex flex-col lg:flex-row items-center gap-gutter">
        <div className="flex-1 flex flex-col items-start gap-gutter z-10">
          <h1 className="font-headline-lg text-headline-lg text-on-background max-w-2xl">
            <span className="text-primary">India’s Trusted Payment &amp; Payout Infrastructure.</span>
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl">
            Takshara Technologies delivers scalable, secure, and intelligent infrastructure to accelerate your digital transformation and drive sustainable business growth.
          </p>
          <div className="flex flex-wrap items-center gap-base pt-base">
            <Link to="/solutions" className="px-gutter py-3 bg-primary text-on-primary font-label-md text-label-md rounded-lg shadow-md hover:bg-primary-container transition-all hover:shadow-lg hover:-translate-y-0.5">
              Explore Solutions
            </Link>
            <button 
              onClick={() => {
                const videoSection = document.getElementById('demo-video');
                if (videoSection) videoSection.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-gutter py-3 bg-surface-container-highest text-on-surface font-label-md text-label-md rounded-lg hover:bg-surface-variant transition-colors flex items-center gap-base cursor-pointer"
            >
              <span className="material-symbols-outlined">play_circle</span>
              Watch Demo
            </button>
          </div>
        </div>

        {/* Hero Video Container */}
        <div className="flex-1 w-full lg:w-1/2 rounded-2xl overflow-hidden relative group">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover rounded-2xl"
            src={airVideo}
          />
        </div>
      </section>

      {/* Integrated Payments, Payouts & Compliance Section */}
      <section className="w-full bg-surface-container-lowest/50 py-16 lg:py-24 relative overflow-hidden border-t border-b border-outline-variant/30">
        <div className="max-w-max mx-auto px-margin-mobile lg:px-margin-desktop flex flex-col gap-12 relative z-10">
          
          {/* Header */}
          <div className="flex flex-col items-center text-center gap-4 max-w-4xl mx-auto">
            <h2 className="font-headline-lg text-3xl md:text-4xl lg:text-5xl font-bold text-on-surface tracking-tight">
              Payments, Payouts &amp; Compliance—Built to Work Together
            </h2>
            <p className="font-body-lg text-base md:text-lg text-on-surface-variant max-w-2xl leading-relaxed">
              One merchant account to collect online, disburse at scale, and verify customers—similar to leading Indian payment stacks, tailored for your growth stage.
            </p>
            
            {/* Pill Tabs */}
            <div className="flex items-center gap-3 mt-4 p-1.5 bg-surface-container-low rounded-full border border-outline-variant/40">
              <button
                onClick={() => setActiveTab('accept')}
                className={`px-6 py-2 rounded-full font-label-md text-sm transition-all duration-300 ${
                  activeTab === 'accept'
                    ? 'bg-primary text-on-primary font-semibold shadow-sm'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container/60'
                }`}
              >
                Accept
              </button>
              <button
                onClick={() => setActiveTab('disburse')}
                className={`px-6 py-2 rounded-full font-label-md text-sm transition-all duration-300 ${
                  activeTab === 'disburse'
                    ? 'bg-primary text-on-primary font-semibold shadow-sm'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container/60'
                }`}
              >
                Disburse
              </button>
              <button
                onClick={() => setActiveTab('verify')}
                className={`px-6 py-2 rounded-full font-label-md text-sm transition-all duration-300 ${
                  activeTab === 'verify'
                    ? 'bg-primary text-on-primary font-semibold shadow-sm'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container/60'
                }`}
              >
                Verify
              </button>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            
            {/* Card 1: Accept payments */}
            <div className={`bg-surface rounded-2xl p-6 lg:p-8 border transition-all duration-300 flex flex-col justify-between shadow-sm hover:shadow-md ${
              activeTab === 'accept' ? 'border-primary ring-2 ring-primary/20' : 'border-outline-variant/50'
            }`}>
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="material-symbols-outlined text-primary text-2xl" style={{ fontVariationSettings: '"FILL" 1' }}>shopping_cart</span>
                  <h3 className="font-headline-md text-xl font-bold text-on-surface">Accept payments</h3>
                </div>
                <p className="font-body-md text-sm text-on-surface-variant mb-6 leading-relaxed">
                  Website, app, and social checkout with high success rates on UPI and cards.
                </p>
                
                <ul className="flex flex-col text-sm text-on-surface">
                  <li className="py-3 border-b border-outline-variant/30 flex items-center gap-2">
                    Payment Gateway &amp; checkout
                  </li>
                  <li className="py-3 border-b border-outline-variant/30 flex items-center gap-2">
                    Payment Links &amp; Pages
                  </li>
                  <li className="py-3 border-b border-outline-variant/30 flex items-center gap-2">
                    UPI QR, AutoPay &amp; Soft POS
                  </li>
                  <li className="py-3 border-b border-outline-variant/30 flex items-center gap-2">
                    Invoices &amp; recurring billing
                  </li>
                </ul>
              </div>

              <div className="pt-6 mt-2">
                <Link to="/services" className="inline-flex items-center gap-1 text-primary font-semibold text-sm hover:gap-2 transition-all">
                  <span>Explore payment products</span>
                  <span>&rarr;</span>
                </Link>
              </div>
            </div>

            {/* Card 2: Make payouts */}
            <div className={`bg-surface rounded-2xl p-6 lg:p-8 border transition-all duration-300 flex flex-col justify-between shadow-sm hover:shadow-md ${
              activeTab === 'disburse' ? 'border-primary ring-2 ring-primary/20' : 'border-outline-variant/50'
            }`}>
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="material-symbols-outlined text-primary text-2xl" style={{ fontVariationSettings: '"FILL" 1' }}>currency_rupee</span>
                  <h3 className="font-headline-md text-xl font-bold text-on-surface">Make payouts</h3>
                </div>
                <p className="font-body-md text-sm text-on-surface-variant mb-6 leading-relaxed">
                  Send money 24×7 to bank accounts, UPI, and wallets—with dashboard or APIs.
                </p>
                
                <ul className="flex flex-col text-sm text-on-surface">
                  <li className="py-3 border-b border-outline-variant/30 flex items-center gap-2">
                    Vendor &amp; salary payouts
                  </li>
                  <li className="py-3 border-b border-outline-variant/30 flex items-center gap-2">
                    Bulk refunds &amp; incentives
                  </li>
                  <li className="py-3 border-b border-outline-variant/30 flex items-center gap-2">
                    Auto Collect &amp; virtual accounts
                  </li>
                  <li className="py-3 border-b border-outline-variant/30 flex items-center gap-2">
                    Instant settlement where eligible
                  </li>
                </ul>
              </div>

              <div className="pt-6 mt-2">
                <Link to="/solutions" className="inline-flex items-center gap-1 text-primary font-semibold text-sm hover:gap-2 transition-all">
                  <span>Explore payouts</span>
                  <span>&rarr;</span>
                </Link>
              </div>
            </div>

            {/* Card 3: Verify identity */}
            <div className={`bg-surface rounded-2xl p-6 lg:p-8 border transition-all duration-300 flex flex-col justify-between shadow-sm hover:shadow-md ${
              activeTab === 'verify' ? 'border-primary ring-2 ring-primary/20' : 'border-outline-variant/50'
            }`}>
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="material-symbols-outlined text-primary text-2xl" style={{ fontVariationSettings: '"FILL" 1' }}>badge</span>
                  <h3 className="font-headline-md text-xl font-bold text-on-surface">Verify identity</h3>
                </div>
                <p className="font-body-md text-sm text-on-surface-variant mb-6 leading-relaxed">
                  Secure onboarding with verification APIs for KYC-heavy industries.
                </p>
                
                <ul className="flex flex-col text-sm text-on-surface">
                  <li className="py-3 border-b border-outline-variant/30 flex items-center gap-2">
                    Bank account verification
                  </li>
                  <li className="py-3 border-b border-outline-variant/30 flex items-center gap-2">
                    PAN &amp; Aadhaar checks
                  </li>
                  <li className="py-3 border-b border-outline-variant/30 flex items-center gap-2">
                    GST validation
                  </li>
                  <li className="py-3 border-b border-outline-variant/30 flex items-center gap-2">
                    Fraud-aware workflows
                  </li>
                </ul>
              </div>

              <div className="pt-6 mt-2">
                <Link to="/solutions" className="inline-flex items-center gap-1 text-primary font-semibold text-sm hover:gap-2 transition-all">
                  <span>Explore verification</span>
                  <span>&rarr;</span>
                </Link>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Core Capabilities (Bento Grid) */}
      <section className="w-full max-w-max mx-auto px-margin-mobile lg:px-margin-desktop py-margin-desktop flex flex-col gap-margin-desktop">
        <div className="flex flex-col items-center text-center gap-base max-w-3xl mx-auto">
          <span className="font-label-md text-label-md text-primary tracking-widest uppercase">Our Capabilities</span>
          <h2 className="font-headline-lg text-headline-lg text-on-surface">Architecting the Future</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            Comprehensive technology stacks designed to scale with your ambition. Explore the core pillars of Takshara Technologies.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter auto-rows-[400px]">
          {/* Card 1: Cloud */}
          <div className="lg:col-span-2 bg-surface-container-lowest rounded-2xl shadow-sm hover:shadow-md transition-shadow p-margin-desktop flex flex-col justify-between group overflow-hidden relative">
            <div className="absolute right-0 bottom-0 w-64 h-64 bg-primary-fixed blur-2xl opacity-40 rounded-full translate-x-1/3 translate-y-1/3 group-hover:scale-110 transition-transform duration-700"></div>
            <div className="flex flex-col gap-base relative z-10 max-w-md">
              <div className="w-12 h-12 rounded-lg bg-primary-container flex items-center justify-center mb-base text-on-primary-container">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: '"FILL" 1' }}>cloud_sync</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-on-surface">Cloud Systems</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Seamlessly migrate, manage, and scale your operations with our enterprise-grade cloud architecture. High availability meets unparalleled performance.
              </p>
            </div>
            <Link to="/services" className="w-fit font-label-md text-label-md text-primary flex items-center gap-2 hover:gap-3 transition-all relative z-10 mt-gutter">
              Learn more <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>

          {/* Card 2: Cyber Security */}
          <div className="bg-surface-container-lowest rounded-2xl shadow-sm hover:shadow-md transition-shadow p-gutter flex flex-col justify-between group relative overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center opacity-10 group-hover:opacity-20 transition-opacity duration-500"
              style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuA_QPsT-vsX8V55W8WEK6t9tHfbUbCeiL6W62KLWt3GmDPOFzSCCLNZVbkbw_TCR7x76GUJ7Y-Jl3iFNTCqyPLcJ3C9ms0t8LpvHKHU8qWTFKCBKzVy2q4c9pSnUH_RHMFC3GYb3UYSeLZBto4I7iF0rE2Vzh0Nj6_Lw2BFcY9VZ9mQ6nkWHZEk-pdG68lZyR6Mzq1-kdKLA1qcn4K6PNSfAUQz7CmK1fkpiNIeCBWhjNHFVlBphYyM")' }}
            ></div>
            <div className="flex flex-col gap-base relative z-10">
              <div className="w-12 h-12 rounded-lg bg-error-container flex items-center justify-center mb-base text-on-error-container">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: '"FILL" 1' }}>security</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-on-surface">Cyber Security</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Military-grade encryption and threat detection systems keeping your assets secure 24/7.
              </p>
            </div>
            <Link to="/services" className="w-fit font-label-md text-label-md text-primary flex items-center gap-2 hover:gap-3 transition-all relative z-10 mt-gutter">
              Learn more <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>

          {/* Card 3: Data Analytics */}
          <div className="bg-surface-container rounded-2xl shadow-inner p-gutter flex flex-col justify-between group overflow-hidden">
            <div className="flex flex-col gap-base relative z-10">
              <div className="w-12 h-12 rounded-lg bg-tertiary-container flex items-center justify-center mb-base text-on-tertiary-container">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: '"FILL" 1' }}>monitoring</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-on-surface">Data Analytics</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Transform raw data into actionable intelligence with AI-driven insights and real-time visualization dashboards.
              </p>
            </div>
            <div className="mt-gutter w-full h-32 bg-surface-container-lowest rounded-lg shadow-sm p-4 relative overflow-hidden flex items-end gap-2">
              <div className="w-1/6 bg-tertiary/20 h-1/3 rounded-t-sm"></div>
              <div className="w-1/6 bg-tertiary/40 h-1/2 rounded-t-sm"></div>
              <div className="w-1/6 bg-tertiary/60 h-2/3 rounded-t-sm"></div>
              <div className="w-1/6 bg-tertiary/80 h-3/4 rounded-t-sm"></div>
              <div className="w-1/6 bg-tertiary h-full rounded-t-sm shadow-[0_0_12px_rgba(0,75,89,0.5)]"></div>
              <div className="w-1/6 bg-tertiary/60 h-5/6 rounded-t-sm"></div>
            </div>
          </div>

          {/* Card 4: Global Network */}
          <div className="lg:col-span-2 bg-surface-container-lowest rounded-2xl shadow-sm hover:shadow-md transition-shadow p-0 flex flex-col md:flex-row group overflow-hidden">
            <div className="flex-1 p-margin-desktop flex flex-col justify-center gap-base">
              <h3 className="font-headline-md text-headline-md text-on-surface">Global Network Infrastructure</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Low latency, high bandwidth connectivity across our distributed global network. Reach your customers anywhere in the world instantly.
              </p>
              <Link to="/solutions" className="w-fit font-label-md text-label-md text-primary flex items-center gap-2 hover:gap-3 transition-all mt-base">
                View network map <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>
            <div className="flex-1 min-h-[250px] relative">
              <img src={mapOfTakshara} alt="Takshara Global Infrastructure" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-surface-container-lowest via-surface-container-lowest/40 to-transparent"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform & Innovation Showcase Video Section */}
      <section id="demo-video" className="w-full max-w-max mx-auto px-margin-mobile lg:px-margin-desktop py-margin-desktop relative">
        <div className="w-full bg-surface-container-low rounded-3xl p-6 lg:p-10 border border-outline-variant/40 shadow-lg relative overflow-hidden flex flex-col items-center gap-6 text-center">
          {/* Section Header */}
          <div className="flex flex-col items-center gap-3 max-w-2xl mx-auto">
            <span className="font-label-md text-label-md text-primary tracking-widest uppercase font-semibold">
              Platform Showcase
            </span>
            <h2 className="font-headline-lg text-2xl md:text-3xl font-bold text-on-surface">
              Empowering the Future of Digital Payments
            </h2>
            <p className="font-body-lg text-on-surface-variant text-sm md:text-base">
              Explore how Takshara Technologies powers high-volume, secure fintech operations with next-gen payments infrastructure.
            </p>
          </div>

          {/* Compact Video Player Container */}
          <div className="w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl relative bg-black/90 aspect-video max-h-[400px] group">
            <video
              controls
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover rounded-2xl"
              src={taksharaVideo}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full max-w-max mx-auto px-margin-mobile lg:px-margin-desktop py-margin-desktop mb-margin-desktop">
        <div className="w-full bg-primary text-on-primary rounded-3xl p-margin-desktop flex flex-col md:flex-row items-center justify-between gap-gutter shadow-xl relative overflow-hidden">
          <svg className="absolute right-0 bottom-0 w-96 h-96 opacity-20 translate-x-1/4 translate-y-1/4" fill="currentColor" viewBox="0 0 100 100">
            <circle cx="50" cy="50" fill="none" r="40" stroke="currentColor" strokeWidth="2"></circle>
            <circle cx="50" cy="50" fill="none" r="30" stroke="currentColor" strokeDasharray="4 4" strokeWidth="2"></circle>
            <circle cx="50" cy="50" fill="none" r="20" stroke="currentColor" strokeWidth="1"></circle>
          </svg>
          <div className="flex flex-col gap-base relative z-10 max-w-2xl">
            <h2 className="font-headline-lg text-headline-lg">Ready to upgrade your enterprise?</h2>
            <p className="font-body-lg text-body-lg text-primary-fixed">
              Join thousands of forward-thinking companies powered by Takshara Technologies. Start your free consultation today.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-base relative z-10 w-full md:w-auto">
            <Link to="/contact" className="px-gutter py-3 bg-surface-container-lowest text-primary font-label-md text-label-md rounded-lg shadow-md hover:bg-surface-container transition-colors whitespace-nowrap text-center">
              Contact Sales
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
