// Karma configuration
// Generated on Mon Jan 18 2016 12:43:59 GMT+0800 (CST)
const path = require('path')

module.exports = function (config) {
  config.set({
    urlRoot: '/test/',

    proxies: {
      '/test': 'http://localhost:3001/test'
    },

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'chai'],

    // list of files / patterns to load in the browser
    files: [
      'node_modules/babel-polyfill/dist/polyfill.min.js',
      'test/index.js'
    ],

    preprocessors: {
      // add webpack as preprocessor
      'test/index.js': ['webpack', 'sourcemap'],
      'src/**/*.js': ['webpack', 'sourcemap', 'coverage']
    },

    webpack: {
      devtool: 'inline-source-map',
      entry: './test/index.js',
      externals: {
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true
      },
      module: {
        preLoaders: [{
          test: /\.jsx?$/,
          include: [
            path.resolve(__dirname, 'src')
          ],
          loader: 'isparta-instrumenter'
        }],
        loaders: [{
          test: /\.jsx?$/, loaders: ['babel'],
          include: [
            path.resolve(__dirname, 'src'),
            path.resolve(__dirname, 'test'),
            path.resolve(__dirname, 'node_modules/refetch')
          ]
        },
          {test: /\.(css|less)$/, loader: 'style-loader!css-loader?localIdentName=[hash:base64:8]!less-loader'},
          {test: /\.(ttf|eot|woff|woff2|otf|svg)/, loader: 'file-loader?name=./font/[name].[ext]'},
          {test: /\.json$/, loader: 'file-loader?name=./json/[name].json'},
          {test: /\.(png|jpg|jpeg|gif)$/, loader: 'url-loader?limit=10000&name=./images/[name].[ext]'}
        ]
      }
    },

    webpackServer: {
      noInfo: true
    },

    // list of files to exclude
    exclude: [],

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['mocha', 'coverage'],

    coverageReporter: {
      reporters: [
        {type: 'text-summary'},
        {type: 'html', dir: 'coverage/'}
      ]
    },
    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // plugins list
    plugins: [
      'karma-mocha',
      'karma-mocha-reporter',
      'karma-chai',
      'karma-phantomjs-launcher',
      'karma-webpack',
      'karma-sourcemap-loader',
      'karma-coverage'
    ]
  })
}
