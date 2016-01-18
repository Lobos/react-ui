var path = require('path');

module.exports = {
  devtool: 'inline-source-map',
  module: {
    loaders: [{
      test: /\.jsx?$/, loaders: ['babel'], include: [
        path.resolve(__dirname, 'src'),
        path.resolve(__dirname, 'test/utils'),
        path.resolve(__dirname, 'test/components')
      ]
    },
      {test: /\.(css|less)$/, loader: 'style-loader!css-loader?localIdentName=[hash:base64:8]!less-loader'},
      {test: /\.(ttf|eot|woff|woff2|otf|svg)/, loader: 'file-loader?name=./font/[name].[ext]'},
      {test: /\.json$/, loader: 'file-loader?name=./json/[name].json'},
      {test: /\.(png|jpg|jpeg|gif)$/, loader: 'url-loader?limit=10000&name=./images/[name].[ext]'}
    ]
  }
};
