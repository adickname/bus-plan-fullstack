import plugin from "tailwindcss";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        "puff-in": "puff 0.7s cubic-bezier(0.470, 0.000, 0.745, 0.715) both",
        /*  jelloHorizontal: {
          animation: "jello-horizontal 0.9s both",
        }, */
      },
      keyframes: {
        puff: {
          "0%": {
            transform: "scale(2)",
            filter: "blur(4px)",
            opacity: 0,
          },
          "100%": {
            transform: "scale(1)",
            filter: "blur(0px)",
            opacity: 1,
            backgroundColor: "bg-red-400",
          },
        },
      },
      /*  keyframes: {
        jelloHorizontal: {
          "0%": {
            transform: "scale3d(1, 1, 1)",
          },
          "30%": {
            transform: "scale3d(1.25, 0.75, 1)",
          },
          "40%": {
            transform: "scale3d(0.75, 1.25, 1)",
          },
          "50%": {
            transform: " scale3d(1.15, 0.85, 1)",
          },
          "65%": {
            transform: "scale3d(0.95, 1.05, 1)",
          },
          "75%": {
            transform: "scale3d(1.05, 0.95, 1)",
          },
          "100%:": {
            transform: "scale3d(1, 1, 1)",
          },
        }, */
    },
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
