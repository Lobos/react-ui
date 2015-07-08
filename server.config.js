module.exports = require("./make-webpack-config")({
  entry: {
    app: "./server/src/index.js"
  },
  separateStylesheet: true,
  minimize: true,
  path: "./server/static",
  filename: 'js/[name].js'
});
