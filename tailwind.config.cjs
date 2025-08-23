﻿// tailwind.config.cjs
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Assistant", "sans-serif"],
      },
    },
  },
  plugins: [],
};
