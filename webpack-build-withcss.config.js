module.exports = require("./make-webpack-config")({
  entry: {
    ReactUI: ["./src/js/index.js"]
  },
  minimize: true,
  path: "./dist",
  filename: '[name]-with-css.js',
  library: "[name]"
});
