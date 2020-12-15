module.exports = {
  purge: ["./../templates/*.html", "./js/*.js"],
  darkMode: "class",
  theme: {
    fontFamily: {
      "header-light": "Museo-300",
      "header-medium": "Museo-500",
      "header-bold": "Museo-700",
      "body-light": "Helvetica Neue Light",
      "body-roman": "Helvetica Neue Roman",
      "body-medium": "Helvetica Neue Medium",
      "body-bold": "Helvetica Neue Bold",
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
