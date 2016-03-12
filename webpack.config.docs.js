var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var precss = require('precss');

module.exports = {
  entry: {
    app: './docs/src/js/app.jsx',
    Form: './standalone/form/index.js'
  },
  output: {
    path: path.join(__dirname, 'docs/dist'),
    filename: 'js/[name].js'
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
      { test: /\.(ttf|eot|woff|woff2|otf|svg)/, loader: 'file-loader?name=./font/[name].[ext]' },
      { test: /\.json$/, loader: 'file-loader?name=./json/[name].json' },
      { test: /\.(png|jpg|jpeg|gif)$/, loader: 'url-loader?limit=10000&name=./images/[name].[ext]' }
    ],
    preLoaders: [
      { test: /\.jsx?$/, loader: 'rctui-example-loader', include: [path.resolve(__dirname, 'docs')] }
    ]
  },
  postcss: function(){
    return [autoprefixer, precss];
  }
};
