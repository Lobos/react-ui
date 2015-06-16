module.exports = require("./make-webpack-config")({
  entry: {
    //Button: "./src/js/components/button.jsx",
    //Checkbox: ["./src/js/components/checkbox.jsx"],
    //CheckboxGroup: ["./src/js/components/checkbox-group.jsx"],
    //Icon: "./src/js/components/icon.jsx"
    ReactUI: "./src/js/index.js"
  },
  //separateStylesheet: true,
  //minimize: true,
  path: "./build",
  filename: '[name].js',
  library: "[name]"
});
