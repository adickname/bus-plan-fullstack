import plugin from "tailwindcss";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        "puff-in-center": " 0.7s cubic-bezier(0.470, 0.000, 0.745, 0.715) both",
      },
      keyframes: {
        "puff-in-center": {
          "0%": {
            transform: "scale(2)",
            filter: "blur(4px)",
            opacity: 0,
          },
          "100%": {
            transform: "scale(1)",
            filter: "blur(0px)",
            opacity: 1,
          },
        },
      },
      fontFamily: {
        greatvibes: ["Great Vibes", "cursive"],
      },
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
