var webpack = require('webpack');

var plugins = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': '"production"'
  })
];

/*
plugins.push(
  new webpack.optimize.UglifyJsPlugin({
    compressor: {
      warnings: false
    }
  })
);
*/

module.exports = {

  entry: "./src/js/index.js",
  output: {
    path: 'dist',
    filename: "rctui.js",
    library: 'RctUI',
    libraryTarget: 'umd'
  },

  externals: [
    {
      "react": {
        root: "React",
        commonjs2: "react",
        commonjs: "react",
        amd: "react"
      }
    }
  ],

  module: {
    loaders: [
      { test: /\.css$/, loader: "css" },
      { test: /\.less$/, loader: "style!css!less" },
      { test: /\.js$/, loader: 'babel-loader' },
      { text: /\.js$/, loader: 'eslint-loader', exclude: /(node_modules|\.css$|\.less$)/ }
    ]
  },

  node: {
    Buffer: false
  },

  plugins: plugins

};
