var path = require('path');

module.exports = {
    devtool: 'cheap-module-eval-source-map',
    entry: './test/components/index.js',
    output: {
        path: path.join(__dirname, 'docs'),
        filename: 'js/testBundle.js',
        publicPath: '/'
    },
    externals: {'react': 'React', 'react-dom': 'ReactDOM'},
    module: {
        loaders: [{
            test: /\.jsx?$/, loaders: ['babel'], include: [
                path.resolve(__dirname, 'src'),
                path.resolve(__dirname, 'test/components'),
                path.resolve(__dirname, 'docs'),
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
