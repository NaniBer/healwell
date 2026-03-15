/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        healwell: {
          cream: "#f0ebe5",
          black: "#111111",
          darkGray: "#666666",
          gray: "#999999",
          lightGray: "#e0e0e0",
          sage: "#8fa898",
        },
        telegram: {
          bg: "#2481cc",
          text: "#ffffff",
        },
      },
      spacing: {
        18: "4.5rem", // 72px for major breaks
      },
      animation: {
        "fade-in": "fadeIn 0.2s ease-out",
        "slide-up": "slideUp 0.3s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
