import React from 'react';
import { Link } from 'react-router-dom';

export default function Solutions() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <div className="relative w-full overflow-hidden bg-surface-container-lowest">
        <div className="absolute inset-0 z-0">
          <svg className="w-full h-full text-primary-fixed opacity-50" fill="none" preserveAspectRatio="none" viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 288L48 272C96 256 192 224 288 197.3C384 171 480 149 576 165.3C672 181 768 235 864 250.7C960 267 1056 245 1152 213.3C1248 181 1344 139 1392 117.3L1440 96L1440 0L1392 0C1344 0 1248 0 1152 0C1056 0 960 0 864 0C768 0 672 0 576 0C480 0 384 0 288 0C192 0 96 0 48 0L0 0Z" fill="currentColor"></path>
          </svg>
        </div>
        <div className="relative z-10 max-w-max mx-auto px-margin-mobile lg:px-margin-desktop pt-24 pb-32">
          <div className="max-w-3xl">

            <h1 className="font-headline-lg text-headline-lg text-on-surface mb-6">Transforming Complexity into Capability</h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-10 max-w-2xl">
              At Cairnloop Technologies, we build modern payment and payout infrastructure that helps businesses simplify transactions, streamline operations, and scale with confidence.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/services" className="px-8 py-3 bg-primary text-on-primary font-label-md text-label-md rounded-lg shadow-md hover:bg-primary-container transition-all hover:shadow-lg hover:-translate-y-0.5">
                Explore Architecture
              </Link>
              <Link to="/contact" className="px-8 py-3 bg-surface-container-lowest border border-primary text-primary font-label-md text-label-md rounded-lg hover:bg-primary-fixed transition-colors">
                Request a Consultation
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Solutions Cards Section */}
      <div className="bg-background -mt-12 relative z-20 pb-32">
        <div className="max-w-max mx-auto px-margin-mobile lg:px-margin-desktop">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
            {/* Solution Card 1 */}
            <div className="group bg-surface-container-lowest rounded-xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden">
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-tertiary-fixed rounded-full opacity-20 group-hover:scale-150 transition-transform duration-500"></div>
              <div className="w-12 h-12 bg-primary-fixed rounded-lg flex items-center justify-center mb-6 relative z-10">
                <span className="material-symbols-outlined text-primary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>cloud_sync</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-on-surface mb-4 relative z-10">Cloud Native Ecosystem</h3>
              <p className="font-body-md text-body-md text-on-surface-variant mb-6 relative z-10">
                Modernize legacy applications with microservices architecture, serverless computing, and dynamic container orchestration across multi-cloud environments.
              </p>
              <Link to="/services" className="inline-flex items-center gap-2 text-primary font-label-md text-label-md hover:text-primary-container transition-colors relative z-10">
                View Technical Specs <span className="material-symbols-outlined text-sm transition-transform group-hover:translate-x-1">arrow_forward</span>
              </Link>
            </div>

            {/* Solution Card 2 */}
            <div className="group bg-surface-container-lowest rounded-xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden">
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-secondary-fixed rounded-full opacity-20 group-hover:scale-150 transition-transform duration-500"></div>
              <div className="w-12 h-12 bg-secondary-fixed rounded-lg flex items-center justify-center mb-6 relative z-10">
                <span className="material-symbols-outlined text-secondary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>analytics</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-on-surface mb-4 relative z-10">Predictive Intelligence</h3>
              <p className="font-body-md text-body-md text-on-surface-variant mb-6 relative z-10">
                Harness disparate data streams through unified lakes, deploying machine learning models that generate real-time actionable insights and automate decision-making.
              </p>
              <Link to="/services" className="inline-flex items-center gap-2 text-secondary font-label-md text-label-md hover:text-secondary-container transition-colors relative z-10">
                View Technical Specs <span className="material-symbols-outlined text-sm transition-transform group-hover:translate-x-1">arrow_forward</span>
              </Link>
            </div>

            {/* Solution Card 3 */}
            <div className="group bg-surface-container-lowest rounded-xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden">
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-error-container rounded-full opacity-20 group-hover:scale-150 transition-transform duration-500"></div>
              <div className="w-12 h-12 bg-error-container rounded-lg flex items-center justify-center mb-6 relative z-10">
                <span className="material-symbols-outlined text-error text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>security</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-on-surface mb-4 relative z-10">Zero-Trust Security Mesh</h3>
              <p className="font-body-md text-body-md text-on-surface-variant mb-6 relative z-10">
                Implement continuous verification, granular access controls, and automated threat response to safeguard critical assets in an increasingly perimeter-less world.
              </p>
              <Link to="/services" className="inline-flex items-center gap-2 text-error font-label-md text-label-md hover:text-error-container transition-colors relative z-10">
                View Technical Specs <span className="material-symbols-outlined text-sm transition-transform group-hover:translate-x-1">arrow_forward</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
