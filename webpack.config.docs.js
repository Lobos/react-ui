var path = require('path')
var webpack = require('webpack')
var autoprefixer = require('autoprefixer')
var precss = require('precss')

module.exports = {
  entry: {
    app: './docs/src/js/app.jsx'
  },
  output: {
    path: path.join(__dirname, 'docs/dist'),
    libraryTarget: 'umd',
    library: '[name]',
    filename: 'js/[name].js',
    chunkFilename: 'js/chunk/[name].js'
  },
  externals: {'react': 'React', 'react-dom': 'ReactDOM', 'quill': 'Quill'},
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
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
    })
  ],
  resolve: {
    alias: {
      rctui: path.resolve(__dirname, 'src')
    },
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, loaders: ['babel'] },
      { test: /\.(css|less)$/, loader: 'style-loader!css-loader!postcss-loader!less-loader' },
      { test: /\.scss$/, loaders: ['style-loader', 'css-loader?modules&localIdentName=[name]-[local]', 'postcss-loader', 'sass-loader'] },
      { test: /\.(ttf|eot|woff|woff2|otf|svg)/, loader: 'file-loader?name=./font/[name].[ext]' },
      { test: /\.json$/, loader: 'file-loader?name=./json/[name].json' },
      { test: /\.(png|jpg|jpeg|gif)$/, loader: 'url-loader?limit=10000&name=./images/[name].[ext]' }
    ],
    preLoaders: [
      { test: /\.jsx?$/, loader: 'rctui-example-loader', include: [path.resolve(__dirname, 'docs')] },
      { test: /\.scss$/, loader: 'rctui-theme-loader?theme=' }
    ]
  },
  postcss: function () {
    return [autoprefixer({ browsers: ['> 1%', 'IE 9'] }), precss]
  }
}
