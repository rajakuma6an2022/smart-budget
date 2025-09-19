module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
        heading: ["Poppins", "ui-sans-serif", "system-ui"],
        mono: ["Fira Code", "monospace"],
      },
      colors: {
        bg: {
          DEFAULT: "var(--color-bg)",
        },
        card: {
          DEFAULT: "var(--color-card)",
        },
        text: {
          DEFAULT: "var(--color-text)",
          muted: "var(--color-text-muted)",
        },
        primary: {
          DEFAULT: "var(--color-primary)",
        },
        accent: {
          DEFAULT: "var(--color-accent)",
        },
        danger: {
          DEFAULT: "var(--color-danger)",
        },
      },
    },
  },
  plugins: [],
};
