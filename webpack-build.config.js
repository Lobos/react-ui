module.exports = require("./make-webpack-config")({
  entry: {
    ReactUI: ["./src/js/index.js"]
  },
  //separateStylesheet: true,
  //minimize: true,
  path: "./dist",
  filename: '[name].js',
  library: "[name]"
});
