module.exports = require("./make-webpack-config")({
  entry: {
    app: "./docs/src/js/app.jsx"
  },
  separateStylesheet: true,
  path: "./docs/app",
  library: "app"
});
