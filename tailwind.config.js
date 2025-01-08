/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "354px",
      md: "360px",
      lg: "400px",
      xl: "500px",
      "max-phone": { raw: "(max-width: 480px)" },
      "max-small": { raw: "(max-height: 706px)" },
      "max-xsmall": { raw: "(max-height: 640px)" },
      xsmall: { raw: "(min-height: 640px)" },
    },
    extend: {},
  },
  plugins: [],
};
