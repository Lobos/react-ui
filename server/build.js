'use strict';

var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

function build(key, minimize, separateStylesheet, callback) {
  var config = {
    entry: {
      ReactUI: ["./build/" + key + "/index.js"]
    },
    output: {
      path: "./build/" + key,
      filename: 'ReactUI.js',
      library: 'ReactUI',
      libraryTarget: 'umd'
    },
    target: 'web',
    module: {
      loaders: [
        { test: /\.jsx$|\.js$/, loader: "babel-loader?stage=0" }, 
        { test: /\.json$/, loader: "file-loader?name=./json/[name].json" },
        { test: /\.png$|\.jpg$|\.jpeg$|\.gif$|\.svg$/, loader: "url-loader?limit=10000&name=./images/[name].[ext]" },
        { test: /\.ttf$|\.eot$|\.woff$|\.woff2$|\.otf$/, loader: "file-loader?name=./font/[name].[ext]" }
      ]
    }, 
    externals: [
      {
        "react": {
          "root": "React", 
          "commonjs2": "react", 
          "commonjs": "react", 
          "amd": "react"
        }
      }
    ], 
    plugins: [
      new webpack.PrefetchPlugin("react"),
		  new webpack.PrefetchPlugin("react/lib/ReactComponentBrowserEnvironment"),
      new webpack.DefinePlugin({
				"process.env": {
					NODE_ENV: JSON.stringify("production")
				}
			})
    ]
  };

  if (minimize) {
    config.plugins.push(
      new webpack.optimize.UglifyJsPlugin({
				compressor: {
					warnings: false
				}
			}),
			new webpack.optimize.DedupePlugin()
    );
  }

  if (separateStylesheet) {
		config.plugins.push(
      new ExtractTextPlugin("[name].css")
    );
    config.module.loaders.push(
      { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader') }
    );
    config.module.loaders.push(
      { test: /\.less$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader') }
    );
  } else {
    config.module.loaders.push(
      { test: /\.css$/, loader: 'style-loader!css-loader' }
    );
    config.module.loaders.push(
      { test: /\.less$/, loader: 'style-loader!css-loader!less-loader' }
    );
  }

  webpack(config, (err, stats) => {
    callback(null, key);
  });
}

function getBuildThunk(key, minimize, css) {
  return function(callback) {
    build(key, minimize, css, callback);
  };
}

module.exports = { getBuildThunk: getBuildThunk };
