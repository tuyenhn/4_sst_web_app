module.exports = {
  purge: ["./../templates/*.html", "./js/*.js"],
  darkMode: "class",
  theme: {
    fontFamily: {
      "header-bold": "Open Sans Bold",
      "header-light": "Open Sans Light",
      "header-medium": "Open Sans Medium",
      "body-light": "Nunito Sans Light",
      "body-roman": "Nunito Sans Roman",
      "body-medium": "Nunito Sans Medium",
      "body-bold": "Nunito Sans Bold",
    },
    backgroundColor: (theme) => ({
      ...theme("colors"),
      "bg-primary": "#000054",
    }),

    extend: {
      backgroundOpacity: {
        80: "0.8",
      },
    },
  },
  variants: {
    display: ["group-hover"],
    extend: {
      backgroundColor: ["active"],
      textColor: ["active"],
      margin: ["hover", "focus"],
      opacity: ["responsive", "hover"],
    },
  },
  experimental: {
    darkModeVariant: true,
  },

  plugins: [require("@tailwindcss/forms")],
};
