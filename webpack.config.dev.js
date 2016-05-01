var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var precss = require('precss');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: {
    app: [
      'webpack-hot-middleware/client',
      './docs/src/js/app.jsx',
      './docs/src/less/style.less'
    ],
    Form: [
      'webpack-hot-middleware/client',
      './standalone/form/index.js'
    ],
    formBuilder: [
      'webpack-hot-middleware/client',
      './standalone/formBuilder/index.js'
    ]
  },
  output: {
    path: path.join(__dirname, 'docs'),
    filename: 'js/[name].js',
    libraryTarget: 'umd',
    library: '[name]',
    publicPath: '/'
  },
  externals: {'react': 'React', 'react-dom': 'ReactDOM', 'react-router': 'ReactRouter'},
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [
      { test: /\.jsx?$/, loaders: ['babel'], include: [
        path.resolve(__dirname, 'standalone'),
        path.resolve(__dirname, 'src'),
        path.resolve(__dirname, 'docs'),
        path.resolve(__dirname, 'node_modules/refetch')
      ] },
      { test: /\.(css|less)$/, loaders: ['style-loader', 'css-loader?localIdentName=[local]-[hash:base64:5]', 'postcss-loader', 'less-loader'] },
      { test: /\.scss$/, loaders: ['style-loader', 'css-loader?localIdentName=[local]-[hash:base64:5]', 'postcss-loader', 'sass-loader'] },
      { test: /\.(ttf|eot|woff|woff2|otf|svg)/, loader: 'file-loader?name=./font/[name].[ext]' },
      { test: /\.json$/, loader: 'file-loader?name=./json/[name].json' },
      { test: /\.(png|jpg|jpeg|gif)$/, loader: 'url-loader?limit=10000&name=./images/[name].[ext]' }
    ],
    preLoaders: [
      { test: /\.less$/, loader: 'rctui-theme-loader?theme=' },
      { test: /\.jsx?$/, loader: 'rctui-example-loader', include: [path.resolve(__dirname, 'docs')] }
    ]
  },
  postcss: function(){
    return [autoprefixer, precss];
  }

};
