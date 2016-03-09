var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'inline-source-map',
  context: path.resolve(__dirname, 'test'),

  entry: ['webpack-hot-middleware/client',
    'mocha!./index.js'],
  output: {
    path: path.join(__dirname, 'test'),
    filename: 'static/testBundle.js',
    publicPath: '/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  externals: {
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true
  },
  module: {
    loaders: [{
      test: /\.jsx?$/, loaders: ['babel'],
      include: [
        path.resolve(__dirname, 'src'),
        path.resolve(__dirname, 'test/utils'),
        path.resolve(__dirname, 'test/components'),
        path.resolve(__dirname, 'node_modules/refetch')
      ]
    },
      {test: /\.(css|less)$/, loader: 'style-loader!css-loader?localIdentName=[hash:base64:8]!less-loader'},
      {test: /\.(ttf|eot|woff|woff2|otf|svg)/, loader: 'file-loader?name=./font/[name].[ext]'},
      {test: /\.json$/, loader: 'file-loader?name=./json/[name].json'},
      {test: /\.(png|jpg|jpeg|gif)$/, loader: 'url-loader?limit=10000&name=./images/[name].[ext]'}
    ]
  }
};
