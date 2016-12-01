var path = require('path')
var webpack = require('webpack')
var autoprefixer = require('autoprefixer')
var precss = require('precss')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: {
    ReactUI: './src/index'
  },
  output: {
    path: path.join(__dirname, 'build'),
    libraryTarget: 'umd',
    library: '[name]',
    filename: '[name].js'
  },
  externals: {'react': 'React', 'react-dom': 'ReactDOM'},
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true, // React doesn't support IE8
        warnings: false
      },
      mangle: {
        screw_ie8: true
      },
      output: {
        comments: false,
        screw_ie8: true
      }
    }),
    new ExtractTextPlugin('build/[name].css')
  ],
  module: {
    loaders: [
      { test: /\.jsx?$/, loaders: ['babel'] },
      { test: /\.scss$/, loader: ExtractTextPlugin.extract('style', ['css?modules&localIdentName=[hash:base64:8]', 'postcss', 'sass']) }
    ],
    preLoaders: [
      { test: /\.scss$/, loader: 'rctui-theme-loader?theme=' }
    ]
  },
  postcss: function () {
    return [autoprefixer({ browsers: ['> 1%', 'IE 9'] }), precss]
  }
}
