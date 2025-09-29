/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        primary: "#2C5282",
        secondary: "#3182CE",
        accent: "#63B3ED",
        dark: "#1A365D",
        light: "#EBF4FF",
        neutral: "#E2E8F0",

        white: "#FFFFFF",
        gray: {
          100: "#F7FAFC",
          200: "#EDF2F7",
          300: "#E2E8F0",
          400: "#CBD5E0",
          500: "#A0AEC0",
          600: "#718096",
          700: "#4A5568",
          800: "#2D3748",
          900: "#1A202C",
        },

        success: "#38A169",
        warning: "#D69E2E",
        error: "#E53E3E",

        terciary: "#5f6268",
        red: "#9a0000",
      },
      gradientColorStops: {
        "blue-gradient": {
          start: "#3182CE",
          end: "#2C5282",
        },
      },
    },
  },
  plugins: [],
};
