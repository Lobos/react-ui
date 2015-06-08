module.exports = require("./make-webpack-config")({
  entry: {
    Icon: "./src/js/components/icon.jsx"
  },
  //separateStylesheet: true,
  //minimize: true,
  path: "./build",
  filename: '[name].js',
  library: "[name]"
});
