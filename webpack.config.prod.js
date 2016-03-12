var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var precss = require('precss');

module.exports = {
  devtool: 'source-map',
  entry: {
    ReactUI: './src/index',
    Form: './standalone/form/index.js'
  },
  output: {
    path: path.join(__dirname, 'dist'),
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
      { test: /\.(css|less)$/, loader: 'style-loader!css-loader!postcss-loader!less-loader' },
      { test: /\.(png|jpg|jpeg|gif)$/, loader: 'url-loader?limit=10000&name=./images/[name].[ext]' }
    ]
  },
  postcss: function(){
    return [autoprefixer, precss];
  }
};
