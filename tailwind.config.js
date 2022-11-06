/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: "var(--color-background)",
        },
        primary: {
          DEFAULT: "var(--color-primary)",
        },
        secondary: {
          DEFAULT: "var(--color-secondary)",
        },
        accent: {
          DEFAULT: "var(--color-accent)",
        },
        card: {
          DEFAULT: "var(--color-card)",
        },
        neutral: {
          DEFAULT: "var(--color-neutral)",
          light: "var(--color-neutral-light)",
        },
        text: {
          DEFAULT: "var(--color-text)",
        },
        light: {
          DEFAULT: "var(--color-light)",
        },
        dark: {
          DEFAULT: "var(--color-dark)",
        },
        success: {
          dark: "var(--color-success-dark)",
          DEFAULT: "var(--color-success)",
        },
        danger: {
          dark: "var(--color-danger-dark)",
          DEFAULT: "var(--color-danger)",
        },
        warning: {
          DEFAULT: "var(--color-warning)",
        },
      },
    },
  },
  plugins: [],
}