var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var precss = require('precss');

module.exports = {
  entry: {
    ReactUI: './src/index',
    Form: './standalone/form/index.js'
  },
  output: {
    path: path.join(__dirname, 'build'),
    libraryTarget: 'umd',
    library: '[name]',
    filename: '[name].js'
  },
  externals: {'react': 'React', 'react-dom': 'ReactDOM'},
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  ],
  module: {
    loaders: [
      { test: /\.jsx?$/, loaders: ['babel'] },
      { test: /\.scss$/, loaders: ['style-loader', 'css-loader?modules&localIdentName=[hash:base64:8]', 'postcss-loader', 'sass-loader'] }
    ],
    preLoaders: [
      { test: /\.scss$/, loader: 'rctui-theme-loader?theme=' }
    ]
  },
  postcss: function () {
    return [autoprefixer({ browsers: ['> 1%', 'IE 9'] }), precss];
  }
};
