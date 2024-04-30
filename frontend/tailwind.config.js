import plugin from "tailwindcss";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    fontFamily: {
      greatvibes: ["Great Vibes", "cursive"],
    },
  },
  plugins: [
    plugin(function ({ addBase, config }) {
      addBase({
        body: { backgroundColor: "#374151" },
      });
    }),
  ],
};
