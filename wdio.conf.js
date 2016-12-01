exports.config = {
  //
  // ==================
  // Specify Test Files
  // ==================
  // Define which test specs should run. The pattern is relative to the location of this
  // file.
  //
  specs: [
    // './test/e2e/*Spec.js'
    './test/e2e/DatePickerSpec.js'
  ],
  // Patterns to exclude.
  exclude: [
    // 'path/to/excluded/files'
  ],
  //
  // ============
  // Capabilities
  // ============
  // Define your capabilities here. WebdriverIO can run multiple capabilties at the same
  // time. Depending on the number of capabilities WebdriverIO launches several test
  // sessions. Within your capabilities you can overwrite the spec and exclude option in
  // order to group specific specs to a specific capability.
  //
  // If you have trouble getting all important capabilities together check out Sauce Labs
  // platform configurator. A great tool to configure your capabilities.
  // https://docs.saucelabs.com/reference/platforms-configurator
  //
  capabilities: [{
    browserName: 'chrome'
  }],
  //
  // ===================
  // Test Configurations
  // ===================
  // Define all options that are relevant for the WebdriverIO instance here
  //
  // Level of logging verbosity.
  logLevel: 'verbose',
  //
  // Enables colors for log output
  coloredLogs: true,
  //
  // Saves a screenshot to a given path if a command fails.
  screenshotPath: './errorShots/',
  //
  // Shorten url command calls by setting a base url. If your url parameter starts with "/"
  // the base url gets prepended.
  baseUrl: 'http://localhost',
  //
  // Default timeout for all waitForXXX commands.
  waitforTimeout: 10000,

  maxInstances: 1,
  //
  // Initialise the browser instance with a WebdriverIO plugin. The object should have the
  // plugin name as key and the desired plugin options as property. Make sure you have
  // the plugin installed before running any tests. The following plugins are currently
  // available:
  // WebdriverCSS: https://github.com/webdriverio/webdrivercss
  // WebdriverRTC: https://github.com/webdriverio/webdriverrtc
  // Browserevent: https://github.com/webdriverio/browserevent
  // plugins: {
  //     webdrivercss: {
  //         screenshotRoot: 'my-shots',
  //         failedComparisonsRoot: 'diffs',
  //         misMatchTolerance: 0.05,
  //         screenWidth: [320,480,640,1024]
  //     },
  //     webdriverrtc: {},
  //     browserevent: {}
  // },
  //
  // Framework you want to run your specs with.
  // The following are supported: mocha, jasmine and cucumber
  // see also: http://webdriver.io/guide/testrunner/frameworks.html
  //
  // Make sure you have the node package for the specific framework installed before running
  // any tests. If not please install the following package:
  // Mocha: `$ npm install mocha`
  // Jasmine: `$ npm install jasmine`
  // Cucumber: `$ npm install cucumber`
  framework: 'mocha',
  mochaOpts: {
    ui: 'bdd',
    compilers: ['js:babel-core/register']
  },
  //
  // Test reporter for stdout.
  // The following are supported: dot (default), spec and xunit
  // see also: http://webdriver.io/guide/testrunner/reporters.html
  reporter: 'dot',
  // Services
  services: ['selenium-standalone'],
  //
  // =====
  // Hooks
  // =====
  // Run functions before or after the test. If one of them return with a promise, WebdriverIO
  // will wait until that promise got resolved to continue.
  // see also: http://webdriver.io/guide/testrunner/hooks.html
  //
  // Gets executed before all workers get launched.
  onPrepare: function () {
    // do something
  },
  //
  // Gets executed before test execution begins. At this point you will have access to all global
  // variables like `browser`. It is the perfect place to define custom commands.
  before: function () {
    // do something

    global.expect = require('chai').expect

    browser.url('http://localhost:3000')

    const title = browser.getTitle()

    expect(title).to.be.equal('React ui docs')
  },
  //
  // Gets executed after all tests are done. You still have access to all global variables from
  // the test.
  after: function () {
    // do something
  },
  //
  // Gets executed after all workers got shut down and the process is about to exit. It is not
  // possible to defer the end of the process using a promise.
  onComplete: function () {
    // do something
  }
}
