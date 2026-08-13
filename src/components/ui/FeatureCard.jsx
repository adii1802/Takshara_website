import React from 'react';

export default function FeatureCard({ icon, title, description, linkText = "Learn more", linkUrl = "/services", className = "" }) {
  return (
    <div className={`bg-surface-container-lowest rounded-2xl shadow-sm hover:shadow-md transition-shadow p-gutter flex flex-col justify-between group relative overflow-hidden ${className}`}>
      <div className="flex flex-col gap-base relative z-10">
        <div className="w-12 h-12 rounded-lg bg-primary-container flex items-center justify-center mb-base text-on-primary-container">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: '"FILL" 1' }}>
            {icon}
          </span>
        </div>
        <h3 className="font-headline-md text-headline-md text-on-surface">{title}</h3>
        <p className="font-body-md text-body-md text-on-surface-variant">
          {description}
        </p>
      </div>
      <a href={linkUrl} className="w-fit font-label-md text-label-md text-primary flex items-center gap-2 hover:gap-3 transition-all relative z-10 mt-gutter">
        {linkText} <span className="material-symbols-outlined text-sm">arrow_forward</span>
      </a>
    </div>
  );
}
