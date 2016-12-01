var path = require('path')
var webpack = require('webpack')
var autoprefixer = require('autoprefixer')
var precss = require('precss')

module.exports = {
  devtool: 'source-map',
  entry: {
    app: [
      'webpack-hot-middleware/client',
      './docs/src/js/app.jsx',
      './docs/src/less/style.less'
    ]
  },
  output: {
    path: path.join(__dirname, 'docs'),
    filename: 'js/[name].js',
    libraryTarget: 'umd',
    library: '[name]',
    publicPath: '/',
    chunkFilename: 'js/chunk/[name].js'
  },
  externals: {'react': 'React', 'react-dom': 'ReactDOM', 'react-router': 'ReactRouter'},
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  resolve: {
    alias: {
      rctui: path.resolve(__dirname, 'src')
    },
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        include: [
          path.resolve(__dirname, 'standalone'),
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, 'docs'),
          path.resolve(__dirname, 'node_modules/refetch'),
          path.resolve(__dirname, 'node_modules/react-language')
        ]
      },
      { test: /\.(css|less)$/, loaders: ['style-loader', 'css-loader?localIdentName=[local]-[hash:base64:5]', 'postcss-loader', 'less-loader'] },
      { test: /\.scss$/, loaders: ['style-loader', 'css-loader?modules&localIdentName=[local]-[hash:base64:5]', 'postcss-loader', 'sass-loader'] },
      { test: /\.(ttf|eot|woff|woff2|otf|svg)/, loader: 'file-loader?name=./font/[name].[ext]' },
      { test: /\.json$/, loader: 'file-loader?name=./json/[name].json' },
      { test: /\.(png|jpg|jpeg|gif)$/, loader: 'url-loader?limit=10000&name=./images/[name].[ext]' }
    ],
    preLoaders: [
      { test: /\.scss$/, loader: 'rctui-theme-loader?theme=' },
      { test: /\.jsx?$/, loader: 'rctui-example-loader', include: [path.resolve(__dirname, 'docs')] }
    ]
  },
  postcss: function () {
    return [autoprefixer({ browsers: ['> 1%', 'IE 9'] }), precss]
  }
}
