module.exports = {
  darkMode: "class",
  purge: {
    enabled: true,
    content: ["../templates/*.html", "./js/*.js"],
    options: {
      safelist: ["dark", "error", "info"],
    },
  },
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
  },
  experimental: {
    darkModeVariant: true,
  },

  plugins: [require("@tailwindcss/forms")],
};
