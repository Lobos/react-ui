var path = require('path')
var devConf = require('./webpack.config.dev.js')

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
    loaders: [{
      test: /\.jsx?$/, loaders: ['babel'],
      include: [
        path.resolve(__dirname, 'src'),
        path.resolve(__dirname, 'test'),
        path.resolve(__dirname, 'node_modules/refetch')
      ]
    }
    ].concat(devConf.module.loaders.slice(1)),

    preLoaders: [devConf.module.preLoaders]
  }
}
