module.exports = {
  purge: ["./../templates/*.html", "./js/*.js"],
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
    backgroundColor:theme => ({
      ...theme('colors'),
      'bg-primary':'#000054',
      'bg-secondary':'',
    })
    ,extend:{
      backgroundOpacity:{
        '80':'0.8',
      }
    }
    
    // boxShadow: {
    //   inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06);",
    // },
    
  },
  variants: {
    extend: {
      backgroundColor: ["active"],
    },
  },
  plugins: [],
};
