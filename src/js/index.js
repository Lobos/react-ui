// http://facebook.github.io/react/docs/working-with-the-browser.html#polyfills-needed-to-support-older-browsers
require('./polyfills/es5-shim')

module.exports = {
  Icon: require('./components/icon.jsx'),
  Loading: require('./components/loading.jsx'),
  Message: require('./components/message.jsx'),
  Select: require('./components/select.jsx'),
  
  // mixins
  Mixins: {
    Classable: require('./mixins/classable'),
    ClickAwayable: require('./mixins/click-awayable'),
    Fixable: require('./mixins/fixable'),
    //Pageable: require('./mixins/pageable'),
    //Requestable: require('./mixins/requestable'),
    Validatable: require('./mixins/validatable'),
    WindowListenable: require('./mixins/window-listenable')
  },

  Utils: {
    CssEvent: require('./utils/css-event'),
    Datetime: require('./utils/date-time'),
    Dom: require('./utils/dom'),
    Events: require('./utils/events'),
    Lang: require('./utils/lang'),
    //Request: require('./utils/request'),
    Superagent: require('./superagent'),
    TransitionEnd: require('./utils/transition-end')
  }
}
