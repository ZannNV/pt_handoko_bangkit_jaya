import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          900: "var(--color-navy-900)",
          700: "var(--color-navy-700)",
          100: "var(--color-navy-100)",
        },
        orange: {
          500: "var(--color-orange-500)",
          100: "var(--color-orange-100)",
        },
        page: "var(--color-bg-page)",
        card: "var(--color-bg-card)",
        divider: "var(--color-border)",
        content: {
          primary: "var(--color-text-primary)",
          muted: "var(--color-text-muted)",
          onDark: "var(--color-text-dark-primary)",
          mutedOnDark: "var(--color-text-dark-muted)",
        },
        status: {
          success: {
            bg: "var(--color-status-success-bg)",
            text: "var(--color-status-success-text)",
          },
          warning: {
            bg: "var(--color-status-warning-bg)",
            text: "var(--color-status-warning-text)",
          },
          info: {
            bg: "var(--color-status-info-bg)",
            text: "var(--color-status-info-text)",
          },
          danger: {
            bg: "var(--color-status-danger-bg)",
            text: "var(--color-status-danger-text)",
          },
          neutral: {
            bg: "var(--color-status-neutral-bg)",
            text: "var(--color-status-neutral-text)",
          },
        },
      },
      boxShadow: {
        card: "var(--shadow-card)",
        modal: "var(--shadow-modal)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "sans-serif"],
      },
      fontSize: {
        display: ["40px", { lineHeight: "48px" }],
        h1: ["28px", { lineHeight: "36px" }],
        h2: ["20px", { lineHeight: "28px" }],
        h3: ["16px", { lineHeight: "24px" }],
        isi: ["14px", { lineHeight: "22px" }],
        label: ["13px", { lineHeight: "18px" }],
        kecil: ["12px", { lineHeight: "16px" }],
        tombol: ["14px", { lineHeight: "20px" }],
      },
      maxWidth: {
        desktop: "1440px",
      },
    },
  },
  plugins: [],
};

export default config;
