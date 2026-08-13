/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary-fixed": "#dae2ff",
        "surface-container": "#edeef0",
        "on-tertiary-fixed": "#001f27",
        "inverse-surface": "#2e3132",
        "on-secondary-fixed": "#051a3e",
        "error-container": "#ffdad6",
        "tertiary": "#004b59",
        "background": "#f8f9fb",
        "on-primary-fixed-variant": "#0040a2",
        "surface-variant": "#e1e2e4",
        "surface-tint": "#0c56d0",
        "on-tertiary-fixed-variant": "#004e5d",
        "surface-container-lowest": "#ffffff",
        "surface": "#f8f9fb",
        "primary": "#003d9b",
        "on-tertiary-container": "#76e2ff",
        "surface-container-high": "#e7e8ea",
        "secondary-container": "#bfd1ff",
        "on-primary-container": "#c4d2ff",
        "outline": "#737685",
        "on-error": "#ffffff",
        "primary-container": "#0052cc",
        "on-surface-variant": "#434654",
        "outline-variant": "#c3c6d6",
        "on-secondary-fixed-variant": "#35466c",
        "secondary": "#4c5e85",
        "on-primary-fixed": "#001848",
        "tertiary-container": "#006477",
        "on-error-container": "#93000a",
        "inverse-primary": "#b2c5ff",
        "surface-container-low": "#f3f4f6",
        "on-tertiary": "#ffffff",
        "on-secondary-container": "#485980",
        "on-background": "#191c1e",
        "primary-fixed-dim": "#b2c5ff",
        "error": "#ba1a1a",
        "surface-dim": "#d9dadc",
        "on-primary": "#ffffff",
        "inverse-on-surface": "#f0f1f3",
        "on-secondary": "#ffffff",
        "tertiary-fixed-dim": "#48d7f9",
        "on-surface": "#191c1e",
        "surface-container-highest": "#e1e2e4",
        "surface-bright": "#f8f9fb",
        "tertiary-fixed": "#afecff",
        "secondary-fixed": "#d8e2ff",
        "secondary-fixed-dim": "#b4c6f3"
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        full: "9999px"
      },
      spacing: {
        "margin-desktop": "64px",
        "margin-mobile": "16px",
        "max-width": "1280px",
        base: "8px",
        gutter: "24px"
      },
      fontFamily: {
        "body-lg": ["Inter", "sans-serif"],
        "label-md": ["Inter", "sans-serif"],
        "headline-lg": ["Manrope", "sans-serif"],
        "body-md": ["Inter", "sans-serif"],
        "label-sm": ["Inter", "sans-serif"],
        "headline-lg-mobile": ["Manrope", "sans-serif"],
        "headline-md": ["Manrope", "sans-serif"]
      },
      fontSize: {
        "body-lg": ["18px", { lineHeight: "28px", fontWeight: "400" }],
        "label-md": ["14px", { lineHeight: "20px", letterSpacing: "0.05em", fontWeight: "600" }],
        "headline-lg": ["40px", { lineHeight: "48px", letterSpacing: "-0.02em", fontWeight: "700" }],
        "body-md": ["16px", { lineHeight: "24px", fontWeight: "400" }],
        "label-sm": ["12px", { lineHeight: "16px", fontWeight: "500" }],
        "headline-lg-mobile": ["32px", { lineHeight: "40px", letterSpacing: "-0.01em", fontWeight: "700" }],
        "headline-md": ["24px", { lineHeight: "32px", fontWeight: "600" }]
      }
    }
  },
  plugins: [],
}
