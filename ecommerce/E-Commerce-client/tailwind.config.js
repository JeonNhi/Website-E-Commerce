/**
 * @format
 * @type {import('tailwindcss').Config}
 */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  theme: {
    fontFamily: {
      main: ["Poppins", "sans-serif"],
      lato: ["Lato", "sans-serif"],
    },
    listStyleType: {
      none: "none",
      disc: "disc",
      decimal: "decimal",
      square: "square",
    },

    flexGrow: {
      1: 1,
    },
    extend: {
      width: {
        main: "1220px",
      },
      backgroundColor: {
        main: "#ee3131",
        overlay: "rgba(0,0,0,0.3)",
        overlayLoader: "rgba(0,0,0,0.1)",
      },
      colors: {
        main: "#ee3131",
        heading: "#151515",
      },
      textColor: {
        title: "#505050",
      },
      flex: {
        2: "2 2 0%",
        3: "3 3 0%",
        4: "4 4 0%",
        5: "5 5 0%",
      },
      animation: {
        "slide-top": "slide-top 1s ease",
      },
      boxShadow: {
        search: "0 0 0 0.1rem #1a1b188c",
        cart: "0px 20px 45px 10px #c8c8c866",
      },

      keyframes: {
        "slide-top": {
          "0%": {
            "-webkit-transform": "translateY(80px)",
            transform: " translateY(80px) ",
            opacity: "0",
          },
          "100%": {
            " -webkit-transform": "translateY(0)",
            transform: "translateY(0)",
            opacity: "1",
          },
        },
      },
    },
  },
  plugins: [],
};
