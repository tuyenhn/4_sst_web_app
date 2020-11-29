module.exports = {
  purge: ["./app/templates/*.html", "./app/static/js/*.js"],
  darkMode: false, // or 'media' or 'class'
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
    // boxShadow: {
    //   inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06);",
    // },
    extend: {},
  },
  variants: {
    extend: {
      backgroundColor: ["active"],
    },
  },
  plugins: [],
};
