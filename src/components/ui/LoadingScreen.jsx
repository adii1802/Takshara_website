import React, { useState, useEffect } from 'react';

/**
 * Light-Themed Translucent Page Overlay featuring Takshara Logo
 * 
 * Provides a clean, elegant light-mode frosted glass transition overlay
 * with the Takshara logo when refreshing the page or switching routes.
 */
export default function LoadingScreen({ isVisible = true, onComplete }) {
  const [rendered, setRendered] = useState(isVisible);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    let exitTimer;
    let enterTimer;

    if (isVisible) {
      setRendered(true);
      enterTimer = setTimeout(() => {
        setAnimating(true);
      }, 15);
    } else {
      setAnimating(false);
      exitTimer = setTimeout(() => {
        setRendered(false);
        if (onComplete) onComplete();
      }, 400);
    }

    return () => {
      clearTimeout(enterTimer);
      clearTimeout(exitTimer);
    };
  }, [isVisible, onComplete]);

  if (!rendered) return null;

  return (
    <div
      aria-hidden={!animating}
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center transition-all duration-400 ease-in-out select-none ${
        animating
          ? 'opacity-100 backdrop-blur-2xl bg-white/70 pointer-events-auto'
          : 'opacity-0 backdrop-blur-none bg-white/0 pointer-events-none'
      }`}
    >
      {/* Soft Light Ambient Radial Background Glow */}
      <div
        className={`absolute w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-blue-300/30 via-cyan-200/30 to-indigo-200/30 blur-3xl transition-all duration-700 pointer-events-none ${
          animating ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
        }`}
      />

      {/* Central Light Translucent Glass Logo Card */}
      <div
        className={`relative z-10 flex flex-col items-center px-8 py-8 sm:px-12 sm:py-10 bg-white/80 backdrop-blur-xl border border-white/90 shadow-2xl shadow-blue-900/10 rounded-3xl transition-all duration-500 transform ${
          animating ? 'scale-100 translate-y-0 opacity-100' : 'scale-95 translate-y-2 opacity-0'
        }`}
      >
        {/* Logo Container with Soft Shimmer Ring */}
        <div className="relative mb-5 flex items-center justify-center">
          <div className="absolute -inset-3 rounded-2xl bg-gradient-to-r from-blue-400/25 via-cyan-400/25 to-blue-600/25 blur-md animate-pulse" />

          <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center p-3 bg-white rounded-2xl border border-blue-100 shadow-md shadow-blue-500/10">
            {/* Custom Takshara Ribbon 'T' Logo SVG */}
            <svg
              viewBox="0 0 200 200"
              className="w-full h-full drop-shadow-[0_4px_12px_rgba(0,61,155,0.25)]"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="t-stem-gradient-light" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#003d9b" />
                  <stop offset="50%" stopColor="#0052cc" />
                  <stop offset="100%" stopColor="#0066ff" />
                </linearGradient>

                <linearGradient id="t-wing-gradient-light" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00c6ff" />
                  <stop offset="50%" stopColor="#0072ff" />
                  <stop offset="100%" stopColor="#003d9b" />
                </linearGradient>

                <linearGradient id="t-top-gradient-light" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#001848" />
                  <stop offset="100%" stopColor="#0040a2" />
                </linearGradient>
              </defs>

              <path d="M 30 35 H 125 L 105 65 H 30 Z" fill="url(#t-top-gradient-light)" />
              <path d="M 68 65 L 100 65 L 100 170 L 68 185 Z" fill="url(#t-stem-gradient-light)" />
              <path d="M 135 35 L 175 35 L 108 160 L 108 115 Z" fill="url(#t-wing-gradient-light)" />
              <path d="M 108 65 L 135 35 L 108 115 Z" fill="#001848" opacity="0.4" />
            </svg>
          </div>
        </div>

        {/* Brand Typography (Light Mode Slate & Primary Blue) */}
        <div className="text-center space-y-1">
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-widest text-slate-900 font-headline-md">
            TAKSHARA
          </h2>
          <p className="text-[11px] font-bold tracking-[0.25em] text-primary uppercase">
            Fintech Infrastructure
          </p>
        </div>

        {/* Light Translucent Loading Progress Bar */}
        <div className="w-36 sm:w-44 h-1.5 bg-slate-100 border border-slate-200/80 rounded-full overflow-hidden mt-6 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-blue-500 to-cyan-400 rounded-full animate-shimmer" />
        </div>
      </div>
    </div>
  );
}
