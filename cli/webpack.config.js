var path = require('path')
var webpack = require('webpack')
var autoprefixer = require('autoprefixer')
var precss = require('precss')

module.exports = {
  entry: {
    'demo': './demo/index.js'
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].js',
    chunkFilename: 'chunk/[name].js'
  },
  externals: {'react': 'React', 'react-dom': 'ReactDOM'},
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015'],
          plugins: ['transform-object-rest-spread', 'react-require']
        }
      },
      {
        test: /\.(css|less)$/,
        loader: 'style-loader!css-loader!postcss-loader!less-loader'
      },
      {
        test: /\.scss$/,
        loaders: [
          'style-loader',
          'css-loader?modules&localIdentName=[hash:base64:8]',
          'postcss-loader',
          'sass-loader'
        ]
      },
      { test: /\.(png|jpg|jpeg|gif)$/,
        loader: 'url-loader?limit=10000&name=./images/[name].[ext]'
      }
    ]
  },
  postcss: function () {
    return [autoprefixer({ browsers: ['> 1%', 'IE 9'] }), precss]
  }
}
