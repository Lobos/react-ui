var path = require('path');
var devConf = require('./webpack.config.dev.js');

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
  plugins: devConf.plugins,
  externals: {
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true,
    'react/addons': true
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/, loaders: ['babel'],
        include: [
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, 'test'),
          path.resolve(__dirname, 'node_modules/refetch')
        ]
      },

      {
        test: /\.(css|less)$/,
        loaders: ['style-loader', 'css-loader?localIdentName=[local]', 'postcss-loader', 'less-loader']
      },

      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader?modules&localIdentName=[local]', 'postcss-loader', 'sass-loader']
      },

      {
        test: /\.json$/,
        loader: 'file-loader?name=./json/[name].json'
      },

      {
        test: /\.(png|jpg|jpeg|gif)$/,
        loader: 'url-loader?limit=10000&name=./images/[name].[ext]'
      }
    ],

    preLoaders: devConf.module.preLoaders.constructor === Array ? devConf.module.preLoaders : [devConf.module.preLoaders]
  }
};
