module.exports = require("./make-webpack-config")({
  entry: {
    app: "./docs/src/js/app.jsx"
  },
  //minimize: true,
  separateStylesheet: true,
  path: "./docs",
  library: "rctui"
});
