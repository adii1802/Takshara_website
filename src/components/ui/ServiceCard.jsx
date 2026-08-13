import React from 'react';

export default function ServiceCard({ icon, title, description, features = [], badgeBg = "bg-primary-fixed", badgeText = "text-on-primary-fixed", iconColor = "text-primary" }) {
  return (
    <div className="group bg-surface-container-lowest rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-outline-variant/30 flex flex-col h-full">
      <div className={`w-14 h-14 rounded-xl ${badgeBg} flex items-center justify-center mb-6 ${badgeText} group-hover:scale-110 transition-transform duration-300`}>
        <span className="material-symbols-outlined text-3xl">{icon}</span>
      </div>
      <h3 className="font-headline-md text-headline-md text-on-surface mb-3">{title}</h3>
      <p className="font-body-md text-body-md text-on-surface-variant flex-grow mb-6">
        {description}
      </p>
      {features.length > 0 && (
        <ul className="flex flex-col gap-2 mb-8">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-center gap-2 text-on-surface font-label-sm text-label-sm">
              <span className={`material-symbols-outlined ${iconColor} text-sm`}>check_circle</span> {feature}
            </li>
          ))}
        </ul>
      )}
      <button className={`mt-auto flex items-center gap-2 ${iconColor} font-label-md text-label-md hover:underline`}>
        Learn more <span className="material-symbols-outlined text-sm">east</span>
      </button>
    </div>
  );
}
