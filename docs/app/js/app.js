(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("react-router"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "react-router"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("react"), require("react-router")) : factory(root["React"], root["ReactRouter"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_52__, __WEBPACK_EXTERNAL_MODULE_106__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(52);
	var Router = __webpack_require__(106);
	var AppRoutes = __webpack_require__(107);

	// load language
	__webpack_require__(156);

	Router.create({
	  routes: AppRoutes,
	  scrollBehavior: Router.ScrollToTopBehavior
	}).run(function (Handler) {
	  React.render(React.createElement(Handler, null), document.body);
	});

	// static files
	__webpack_require__(159);

/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_52__;

/***/ },
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */,
/* 73 */,
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */,
/* 83 */,
/* 84 */,
/* 85 */,
/* 86 */,
/* 87 */,
/* 88 */,
/* 89 */,
/* 90 */,
/* 91 */,
/* 92 */,
/* 93 */,
/* 94 */,
/* 95 */,
/* 96 */,
/* 97 */,
/* 98 */,
/* 99 */,
/* 100 */,
/* 101 */,
/* 102 */,
/* 103 */,
/* 104 */,
/* 105 */,
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_106__;

/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _reactRouter = __webpack_require__(106);

	var Master = __webpack_require__(108);
	var Home = __webpack_require__(158);

	var menulist = [];
	__webpack_require__(111).forEach(function (menu) {
	  if (menu.handler) {
	    menulist.push(React.createElement(_reactRouter.Route, { name: menu.route, handler: menu.handler }));
	  }
	});

	var AppRoutes = React.createElement(
	  _reactRouter.Route,
	  { name: 'root', path: '/', handler: Master },
	  React.createElement(_reactRouter.Route, { name: 'home', handler: Home }),
	  menulist,
	  React.createElement(_reactRouter.DefaultRoute, { handler: Home })
	);

	module.exports = AppRoutes;

/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _reactRouter = __webpack_require__(106);

	var React = __webpack_require__(52);
	var NavList = __webpack_require__(109);
	var Message = __webpack_require__(147);

	module.exports = React.createClass({
	  displayName: "Master",

	  render: function render() {
	    return React.createElement(
	      "div",
	      null,
	      React.createElement(NavList, null),
	      React.createElement(
	        "div",
	        { className: "main" },
	        React.createElement(_reactRouter.RouteHandler, null)
	      ),
	      React.createElement(Message, null)
	    );
	  }
	});

/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var classnames = __webpack_require__(110);
	var React = __webpack_require__(52);
	var Router = __webpack_require__(106);
	var menulist = __webpack_require__(111);
	var Icon = __webpack_require__(114);

	module.exports = React.createClass({
	  displayName: 'NavList',

	  mixins: [Router.State],

	  getInitialState: function getInitialState() {
	    return {
	      active: false
	    };
	  },

	  getClasses: function getClasses(name, route) {
	    return classnames(name, {
	      active: this.context.router.isActive(route)
	    });
	  },

	  routeChange: function routeChange(route) {
	    this.context.router.transitionTo(route);
	    this.setState({ active: false });
	  },

	  toggle: function toggle() {
	    var active = !this.state.active;
	    this.setState({ active: active });
	  },

	  render: function render() {
	    var list = menulist.map(function (m) {
	      return React.createElement(
	        'li',
	        { className: 'pure-menu-item' },
	        React.createElement(
	          'a',
	          { onClick: this.routeChange.bind(this, m.route), className: this.getClasses('pure-menu-link', m.route) },
	          m.text
	        )
	      );
	    }, this);

	    return React.createElement(
	      'div',
	      { className: classnames('nav', { active: this.state.active }) },
	      React.createElement(
	        'div',
	        { className: 'nav-list pure-menu' },
	        React.createElement(
	          'a',
	          { onClick: this.toggle, className: 'nav-handler' },
	          React.createElement(Icon, { icon: 'navicon', size: 'lg' })
	        ),
	        React.createElement(
	          'a',
	          { className: 'pure-menu-heading', onClick: this.routeChange.bind(this, '/') },
	          'React UI'
	        ),
	        React.createElement(
	          'ul',
	          { className: 'pure-menu-list' },
	          list
	        )
	      ),
	      React.createElement('div', { onClick: this.toggle, className: 'overlay' })
	    );
	  }
	});

/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/*!
	  Copyright (c) 2015 Jed Watson.
	  Licensed under the MIT License (MIT), see
	  http://jedwatson.github.io/classnames
	*/

	'use strict';

	(function () {
		'use strict';

		function classNames() {

			var classes = '';

			for (var i = 0; i < arguments.length; i++) {
				var arg = arguments[i];
				if (!arg) continue;

				var argType = typeof arg;

				if ('string' === argType || 'number' === argType) {
					classes += ' ' + arg;
				} else if (Array.isArray(arg)) {
					classes += ' ' + classNames.apply(null, arg);
				} else if ('object' === argType) {
					for (var key in arg) {
						if (arg.hasOwnProperty(key) && arg[key]) {
							classes += ' ' + key;
						}
					}
				}
			}

			return classes.substr(1);
		}

		if (true) {
			// AMD. Register as an anonymous module.
			!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
				return classNames;
			}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else if (typeof module !== 'undefined' && module.exports) {
			module.exports = classNames;
		} else {
			window.classNames = classNames;
		}
	})();

/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = [{ route: 'button', text: 'Button', handler: __webpack_require__(124) }, { route: 'checkbox', text: 'Checkbox', handler: __webpack_require__(129) }, { route: 'checkbox-group', text: 'Checkbox Group', handler: __webpack_require__(133) }, { route: 'icon', text: 'Icon', handler: __webpack_require__(112) }, { route: 'message', text: 'Message', handler: __webpack_require__(145) }, { route: 'radio-group', text: 'Radio Group', handler: __webpack_require__(157) }];

/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(52);
	var Prettify = __webpack_require__(113);
	var Icon = __webpack_require__(114);

	module.exports = React.createClass({
	  displayName: 'Pages/Icon',

	  mixins: [Prettify],

	  render: function render() {
	    return React.createElement(
	      'div',
	      null,
	      React.createElement(
	        'div',
	        { className: 'header' },
	        React.createElement(
	          'h1',
	          null,
	          'Icon'
	        ),
	        React.createElement(
	          'h2',
	          null,
	          '图标，使用',
	          React.createElement(
	            'a',
	            { href: 'http://fontawesome.io/' },
	            'font-awesome'
	          )
	        )
	      ),
	      React.createElement(
	        'div',
	        { className: 'content' },
	        React.createElement(
	          'pre',
	          { className: 'prettyprint' },
	          '<Icon icon="string" spin={bool} size={int|string} />'
	        ),
	        React.createElement(
	          'p',
	          null,
	          React.createElement(
	            'b',
	            null,
	            'icon:'
	          ),
	          '图标名称，详见',
	          React.createElement(
	            'a',
	            { href: 'http://fontawesome.io/icons/' },
	            'fontawesome'
	          )
	        ),
	        React.createElement(
	          'p',
	          null,
	          React.createElement(
	            'b',
	            null,
	            'spin:'
	          ),
	          '是否旋转。默认值为 ',
	          React.createElement(
	            'em',
	            null,
	            'false'
	          )
	        ),
	        React.createElement(
	          'p',
	          null,
	          React.createElement(
	            'b',
	            null,
	            'size:'
	          ),
	          '图标尺寸，可选值为 ',
	          React.createElement(
	            'em',
	            null,
	            '[lg|2x|3x|4x|5x]'
	          ),
	          '，或者为数字 ',
	          React.createElement(
	            'em',
	            null,
	            '1-5'
	          )
	        ),
	        React.createElement(
	          'h2',
	          { className: 'subhead' },
	          'Normal'
	        ),
	        React.createElement(Icon, { icon: 'home' }),
	        ' home',
	        React.createElement(
	          'pre',
	          { className: 'prettyprint' },
	          '<Icon icon="camera-retro" /> camera-retro'
	        ),
	        React.createElement(
	          'h2',
	          { className: 'subhead' },
	          'Spin'
	        ),
	        React.createElement(Icon, { icon: 'spinner', spin: true }),
	        '   ',
	        React.createElement(Icon, { icon: 'refresh', spin: true }),
	        React.createElement(
	          'pre',
	          { className: 'prettyprint' },
	          '<Icon icon="spinner" spin={true} />\r<Icon icon="refresh" spin={true} />'
	        ),
	        React.createElement(
	          'h2',
	          { className: 'subhead' },
	          'Size'
	        ),
	        React.createElement(Icon, { icon: 'camera-retro' }),
	        ' normal',
	        React.createElement('br', null),
	        React.createElement(Icon, { icon: 'camera-retro', size: 'lg' }),
	        ' lg',
	        React.createElement('br', null),
	        React.createElement(Icon, { icon: 'camera-retro', size: 2 }),
	        ' 2x',
	        React.createElement('br', null),
	        React.createElement(Icon, { icon: 'camera-retro', size: 3 }),
	        ' 3x',
	        React.createElement('br', null),
	        React.createElement(Icon, { icon: 'camera-retro', size: 4 }),
	        ' 4x',
	        React.createElement('br', null),
	        React.createElement(Icon, { icon: 'camera-retro', size: 5 }),
	        ' 5x',
	        React.createElement(
	          'pre',
	          { className: 'prettyprint' },
	          '<Icon icon="camera-retro" />\n<Icon icon="camera-retro" size="lg" />\n<Icon icon="camera-retro" size="2x" />\n<Icon icon="camera-retro" size="3" />\n<Icon icon="camera-retro" size={4} />\n<Icon icon="camera-retro" size={5} />'
	        ),
	        React.createElement(
	          'h2',
	          { className: 'subhead' },
	          'Method'
	        ),
	        React.createElement(
	          'p',
	          null,
	          '有两个实例方法控制旋转，',
	          React.createElement(
	            'em',
	            null,
	            'spin'
	          ),
	          ' 和 ',
	          React.createElement(
	            'em',
	            null,
	            'unspin'
	          )
	        ),
	        React.createElement(
	          'pre',
	          { className: 'prettyprint' },
	          'icon.spin()\ricon.unspin()'
	        )
	      )
	    );
	  }
	});

/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(52);

	module.exports = {
	  componentDidMount: function componentDidMount() {
	    var node = React.findDOMNode(this);
	    window.prettyPrint(null, node);
	  }
	};

/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(115);

	var React = __webpack_require__(52);
	var Classable = __webpack_require__(123);

	module.exports = React.createClass({
	  displayName: 'Icon',

	  propTypes: {
	    icon: React.PropTypes.string,
	    size: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
	    spin: React.PropTypes.bool
	  },

	  mixins: [Classable],

	  getInitialState: function getInitialState() {
	    return {
	      spin: this.props.spin
	    };
	  },

	  spin: function spin() {
	    this.setState({ spin: true });
	  },

	  unspin: function unspin() {
	    this.setState({ spin: false });
	  },

	  render: function render() {
	    var classes = ['icon'];

	    if (this.state.spin) {
	      classes.push('icon-spin');
	    }

	    if (this.props.icon) {
	      classes.push('icon-' + this.props.icon);
	    }

	    var size = this.props.size;
	    if (size) {
	      if (typeof size === 'number' || size.length === 1) {
	        size = size + 'x';
	      }
	      classes.push('icon-' + size);
	    }

	    return React.createElement('i', { className: this.getClasses.apply(this, classes) });
	  }
	});

/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 116 */,
/* 117 */,
/* 118 */,
/* 119 */,
/* 120 */,
/* 121 */,
/* 122 */,
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

	var React = __webpack_require__(52);
	var classnames = __webpack_require__(110);

	module.exports = {

	  propTypes: {
	    className: React.PropTypes.string
	  },

	  getClasses: function getClasses() {
	    var mainArguments = Array.prototype.slice.call(arguments);
	    if (this.props.className) {
	      mainArguments.push(this.props.className);
	    }

	    return classnames.apply(undefined, _toConsumableArray(mainArguments));
	  }
	};

/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(52);
	var Prettify = __webpack_require__(113);
	var Button = __webpack_require__(125);
	var Icon = __webpack_require__(114);

	module.exports = React.createClass({
	  displayName: 'Pages/Button',

	  mixins: [Prettify],

	  disableExample: function disableExample(event) {
	    var button = this.refs.button;
	    if (event.target.checked) {
	      button.disable(React.createElement(
	        'span',
	        null,
	        React.createElement(Icon, { icon: 'lock' }),
	        '我被禁用了'
	      ));
	    } else {
	      button.enable('我又可以使用了');
	    }
	  },

	  render: function render() {
	    return React.createElement(
	      'div',
	      null,
	      React.createElement(
	        'div',
	        { className: 'header' },
	        React.createElement(
	          'h1',
	          null,
	          'Button'
	        ),
	        React.createElement(
	          'h2',
	          null,
	          '按钮'
	        )
	      ),
	      React.createElement(
	        'div',
	        { className: 'content' },
	        React.createElement(
	          'pre',
	          { className: 'prettyprint' },
	          '<Button type="submit|button" disabled={bool} once={bool} status="string" onClick={function}>\r {string|element}\r</Button>'
	        ),
	        React.createElement(
	          'p',
	          null,
	          React.createElement(
	            'b',
	            null,
	            'type:'
	          ),
	          ' 按钮类型，可选值为 ',
	          React.createElement(
	            'em',
	            null,
	            'submit|button'
	          ),
	          ' ，不填默认值为 ',
	          React.createElement(
	            'em',
	            null,
	            'button'
	          )
	        ),
	        React.createElement(
	          'p',
	          null,
	          React.createElement(
	            'b',
	            null,
	            'status:'
	          ),
	          ' 按钮类别，会为按钮添加 ',
	          React.createElement(
	            'em',
	            null,
	            'pure-button-[status]'
	          ),
	          ' 的className，purecss包含 ',
	          React.createElement(
	            'em',
	            null,
	            'primary'
	          ),
	          ' 这个值，可自行扩展 ',
	          React.createElement(
	            'em',
	            null,
	            'success|error'
	          ),
	          ' 等'
	        ),
	        React.createElement(
	          'p',
	          null,
	          React.createElement(
	            'b',
	            null,
	            'once:'
	          ),
	          ' 值为 ',
	          React.createElement(
	            'em',
	            null,
	            'true'
	          ),
	          ' 时，当button点击过后，状态会变更为 ',
	          React.createElement(
	            'em',
	            null,
	            'disabled'
	          ),
	          ' ，必须调用 ',
	          React.createElement(
	            'em',
	            null,
	            'enable'
	          ),
	          ' 方法激活才能再次使用。默认值为 ',
	          React.createElement(
	            'em',
	            null,
	            'false'
	          )
	        ),
	        React.createElement(
	          'p',
	          null,
	          React.createElement(
	            'b',
	            null,
	            'disabled:'
	          ),
	          ' 与 button 的 ',
	          React.createElement(
	            'em',
	            null,
	            'disabled'
	          ),
	          ' 属性相同'
	        ),
	        React.createElement(
	          'p',
	          null,
	          React.createElement(
	            'b',
	            null,
	            'onClick:'
	          ),
	          ' 点击事件'
	        ),
	        React.createElement(
	          'h2',
	          { className: 'subhead' },
	          '普通按钮'
	        ),
	        React.createElement(
	          'p',
	          null,
	          React.createElement(
	            Button,
	            { status: 'primary' },
	            'Primary Button'
	          ),
	          ' ',
	          React.createElement(
	            Button,
	            null,
	            'Button'
	          )
	        ),
	        React.createElement(
	          'pre',
	          { className: 'prettyprint' },
	          '<Button status="primary">Primary Button</Button>\n<Button>Button</Button>'
	        ),
	        React.createElement(
	          'h2',
	          { className: 'subhead' },
	          '带图标按钮'
	        ),
	        React.createElement(
	          'p',
	          null,
	          React.createElement(
	            Button,
	            null,
	            React.createElement(Icon, { icon: 'home' }),
	            ' Home'
	          ),
	          ' ',
	          React.createElement(
	            Button,
	            null,
	            React.createElement(Icon, { icon: 'cog' }),
	            ' Settings'
	          )
	        ),
	        React.createElement(
	          'pre',
	          { className: 'prettyprint' },
	          '<Button><Icon icon="home" /> Home</Button>\r<Button><Icon icon="cog" /> Settings</Button>'
	        ),
	        React.createElement(
	          'h2',
	          { className: 'subhead' },
	          '扩展'
	        ),
	        React.createElement(
	          'p',
	          null,
	          'Button 默认会添加 ',
	          React.createElement(
	            'em',
	            null,
	            'button-extend'
	          ),
	          ' 类，如果需要给所有Button添加样式（如圆角，更改padding等），定义 ',
	          React.createElement(
	            'em',
	            null,
	            'button-extend'
	          ),
	          ' 即可。'
	        ),
	        React.createElement(
	          'p',
	          null,
	          React.createElement(
	            'em',
	            null,
	            '注意：本文档里的按钮受 ',
	            React.createElement(
	              'em',
	              null,
	              'button-extend'
	            ),
	            ' 影响，圆角已改变，purecss圆角只有2像素'
	          )
	        ),
	        React.createElement(
	          'pre',
	          { className: 'prettyprint' },
	          '.button-extend {\n  border-radius: 4px;\n}\n.button-success, .button-error, .button-warning, .button-info {\n  color: #fff;\n  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);\n}\n.button-success {\n  background: rgb(28, 184, 65);\n}\n.button-error {\n  background: rgb(202, 60, 60);\n}\n.button-warning {\n  background: rgb(223, 117, 20);\n}\n.button-info {\n  background: rgb(66, 184, 221);\n}\n.button-large {\n  font-size: 120%;\n}'
	        ),
	        React.createElement(
	          'p',
	          null,
	          React.createElement(
	            Button,
	            { status: 'success' },
	            'Success Button'
	          ),
	          ' ',
	          React.createElement(
	            Button,
	            { status: 'warning' },
	            'Warning Button'
	          ),
	          ' ',
	          React.createElement(
	            Button,
	            { status: 'error' },
	            'Error Button'
	          ),
	          ' ',
	          React.createElement(
	            Button,
	            { status: 'info' },
	            'Info Button'
	          ),
	          React.createElement('br', null)
	        ),
	        React.createElement(
	          'pre',
	          { className: 'prettyprint' },
	          '<Button status="success">Success Button</Button>\n<Button status="warning">Warning Button</Button>\n<Button status="error">Error Button</Button>\n<Button status="info">Info Button</Button>'
	        ),
	        React.createElement(
	          'p',
	          null,
	          '也可以直接添加className'
	        ),
	        React.createElement(
	          'p',
	          null,
	          React.createElement(
	            Button,
	            { className: 'button-large' },
	            'Large Button'
	          )
	        ),
	        React.createElement(
	          'pre',
	          { className: 'prettyprint' },
	          '<Button className="large-button">Large Button</Button>'
	        ),
	        React.createElement(
	          'h2',
	          { className: 'subhead' },
	          'once'
	        ),
	        React.createElement(
	          'p',
	          null,
	          React.createElement(
	            Button,
	            { once: true },
	            '只能点击一次'
	          )
	        ),
	        React.createElement(
	          'pre',
	          { className: 'prettyprint' },
	          '<Button once={true}>只能点击一次</Button>'
	        ),
	        React.createElement(
	          'h2',
	          { className: 'subhead' },
	          'enable(elem)/disabled(elem)'
	        ),
	        React.createElement(
	          'p',
	          null,
	          '两个实例方法 ',
	          React.createElement(
	            'em',
	            null,
	            'enable'
	          ),
	          '（启用） 和 ',
	          React.createElement(
	            'em',
	            null,
	            'disable'
	          ),
	          ' （禁用），可以传入一个参数（字符串或者element）替换按钮内容'
	        ),
	        React.createElement(
	          'p',
	          null,
	          React.createElement(
	            Button,
	            { ref: 'button' },
	            'Button'
	          ),
	          ' ',
	          React.createElement(
	            'label',
	            { className: 'pure-checkbox' },
	            React.createElement('input', { onClick: this.disableExample, type: 'checkbox' }),
	            ' 禁用'
	          )
	        ),
	        React.createElement(
	          'pre',
	          { className: 'prettyprint' },
	          '<Button ref="button">Button</Button>\n<label className="pure-checkbox">\n  <input onClick={this.disableExample} type="checkbox" /> 禁用\n</label>'
	        ),
	        React.createElement(
	          'pre',
	          { className: 'prettyprint' },
	          'disableExample: function (event) {\n  var button = this.refs.button;\n  if (event.target.checked) {\n    button.disable(<span><Icon icon="lock" />我被禁用了</span>);\n  } else {\n    button.enable("我又可以使用了");\n  }\n}'
	        )
	      )
	    );
	  }
	});

/***/ },
/* 125 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(126);
	var React = __webpack_require__(52);
	var Classable = __webpack_require__(123);

	module.exports = React.createClass({
	  displayName: 'Button',

	  propTypes: {
	    children: React.PropTypes.any,
	    disabled: React.PropTypes.bool,
	    onClick: React.PropTypes.func,
	    once: React.PropTypes.bool,
	    status: React.PropTypes.string,
	    type: React.PropTypes.oneOf(['submit', 'button'])
	  },

	  mixins: [Classable],

	  getInitialState: function getInitialState() {
	    return {
	      disabled: this.props.disabled,
	      show: null
	    };
	  },

	  disable: function disable(elem) {
	    this.setState({ disabled: true, show: elem });
	  },

	  enable: function enable(elem) {
	    this.setState({ disabled: false, show: elem });
	  },

	  handleClick: function handleClick() {
	    if (this.props.onClick) {
	      this.props.onClick();
	    }
	    if (this.props.once) {
	      this.disable();
	    }
	  },

	  render: function render() {
	    var status = this.props.status;
	    if (status) {
	      status = 'button-' + status;
	    }
	    var className = this.getClasses('pure-button', status, { 'pure-button-primary': status === 'button-primary' }, 'button-extend');

	    var show = this.state.show || this.props.children;

	    return React.createElement(
	      'button',
	      { onClick: this.handleClick, disabled: this.state.disabled, className: className, type: this.props.type || 'button' },
	      show
	    );
	  }
	});

/***/ },
/* 126 */
/***/ function(module, exports, __webpack_require__) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 127 */,
/* 128 */,
/* 129 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(52);
	var Prettify = __webpack_require__(113);
	var Checkbox = __webpack_require__(130);

	module.exports = React.createClass({
	  displayName: 'Pages/Checkbox',

	  mixins: [Prettify],

	  render: function render() {
	    return React.createElement(
	      'div',
	      null,
	      React.createElement(
	        'div',
	        { className: 'header' },
	        React.createElement(
	          'h1',
	          null,
	          'Checkbox'
	        ),
	        React.createElement(
	          'h2',
	          null,
	          '复选框'
	        )
	      ),
	      React.createElement(
	        'div',
	        { className: 'content' },
	        React.createElement(
	          'pre',
	          { className: 'prettyprint' },
	          '<Checkbox text="string" value={any} checked={bool} readOnly={bool} onChange={function} />'
	        ),
	        React.createElement(
	          'p',
	          null,
	          React.createElement(
	            'b',
	            null,
	            'text:'
	          ),
	          '显示的文字信息'
	        ),
	        React.createElement(
	          'p',
	          null,
	          React.createElement(
	            'b',
	            null,
	            'value:'
	          ),
	          '值，不填写 ',
	          React.createElement(
	            'em',
	            null,
	            'getValue'
	          ),
	          ' 得到的值为 ',
	          React.createElement(
	            'em',
	            null,
	            'bool'
	          )
	        ),
	        React.createElement(
	          'p',
	          null,
	          React.createElement(
	            'b',
	            null,
	            'checked:'
	          ),
	          '是否选中，默认为 ',
	          React.createElement(
	            'em',
	            null,
	            'false'
	          )
	        ),
	        React.createElement(
	          'p',
	          null,
	          React.createElement(
	            'b',
	            null,
	            'readOnly:'
	          ),
	          '是否只读，默认为 ',
	          React.createElement(
	            'em',
	            null,
	            'false'
	          )
	        ),
	        React.createElement(
	          'p',
	          null,
	          React.createElement(
	            'b',
	            null,
	            'onChange:'
	          ),
	          '状态改变触发事件'
	        ),
	        React.createElement(
	          'h2',
	          { className: 'subhead' },
	          'Example'
	        ),
	        React.createElement(
	          'p',
	          null,
	          React.createElement(Checkbox, { text: 'checkbox' })
	        ),
	        React.createElement(
	          'pre',
	          { className: 'prettyprint' },
	          '<Checkbox text="checkbox" />'
	        ),
	        React.createElement(
	          'h2',
	          { className: 'subhead' },
	          'Readonly'
	        ),
	        React.createElement(
	          'p',
	          null,
	          React.createElement(Checkbox, { checked: true, readOnly: true, text: 'readonly checkbox' })
	        ),
	        React.createElement(
	          'pre',
	          { className: 'prettyprint' },
	          '<Checkbox checked={true} readOnly={true} text="readonly checkbox" />'
	        ),
	        React.createElement(
	          'h2',
	          { className: 'subhead' },
	          'getValue()'
	        ),
	        React.createElement(
	          'p',
	          null,
	          '获取值，选中状态下如果有 ',
	          React.createElement(
	            'em',
	            null,
	            'value'
	          ),
	          '，返回 ',
	          React.createElement(
	            'em',
	            null,
	            'value'
	          ),
	          ' ，否则返回 ',
	          React.createElement(
	            'em',
	            null,
	            'true'
	          ),
	          ' ，未选中状态返回 ',
	          React.createElement(
	            'em',
	            null,
	            'false'
	          )
	        ),
	        React.createElement(
	          'h2',
	          { className: 'subhead' },
	          'setValue(value)'
	        ),
	        React.createElement(
	          'p',
	          null,
	          '如果 ',
	          React.createElement(
	            'em',
	            null,
	            'value'
	          ),
	          ' 值与 ',
	          React.createElement(
	            'em',
	            null,
	            'props.value'
	          ),
	          ' 相等，或者值为 ',
	          React.createElement(
	            'em',
	            null,
	            'true'
	          ),
	          ' 或者 ',
	          React.createElement(
	            'em',
	            null,
	            '1'
	          ),
	          ' ，设置为选中状态'
	        )
	      )
	    );
	  }
	});

/***/ },
/* 130 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(131);
	var React = __webpack_require__(52);

	module.exports = React.createClass({
	  displayName: 'Checkbox',

	  propTypes: {
	    checked: React.PropTypes.bool,
	    index: React.PropTypes.number,
	    onChange: React.PropTypes.func,
	    readOnly: React.PropTypes.bool,
	    text: React.PropTypes.text,
	    value: React.PropTypes.any
	  },

	  getInitialState: function getInitialState() {
	    return {
	      checked: !!this.props.checked
	    };
	  },

	  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	    if (nextProps.checked !== this.props.checked) {
	      this.setState({ checked: nextProps.checked });
	    }
	  },

	  handleChange: function handleChange(event) {
	    if (this.props.readOnly) {
	      return;
	    }

	    this.setState({ checked: event.target.checked });
	    if (this.props.onChange) {
	      this.props.onChange(event.target.checked, this.props.value, this.props.index);
	    }
	  },

	  getValue: function getValue() {
	    return React.findDOMNode(this.refs.input).checked ? this.props.value || true : false;
	  },

	  setValue: function setValue(value) {
	    var checked = value === true || value === 1 || value === this.state.value;
	    this.setState({ checked: checked });
	  },

	  render: function render() {
	    return React.createElement(
	      'label',
	      { className: 'pure-checkbox rui-checkbox' },
	      React.createElement('input', { ref: 'input', type: 'checkbox', onChange: this.handleChange, checked: this.state.checked, value: this.props.value }),
	      ' ' + this.props.text
	    );
	  }
	});

/***/ },
/* 131 */
/***/ function(module, exports, __webpack_require__) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 132 */,
/* 133 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(52);
	var Prettify = __webpack_require__(113);
	var CheckboxGroup = __webpack_require__(134);

	var textValue = __webpack_require__(144);

	module.exports = React.createClass({
	  displayName: 'Pages/Checkbox',

	  mixins: [Prettify],

	  getInitialState: function getInitialState() {
	    return {
	      inline: false
	    };
	  },

	  toggleInline: function toggleInline() {
	    this.setState({ inline: !this.state.inline });
	  },

	  render: function render() {
	    var _this = this;

	    return React.createElement(
	      'div',
	      null,
	      React.createElement(
	        'div',
	        { className: 'header' },
	        React.createElement(
	          'h1',
	          null,
	          'Checkbox Group'
	        ),
	        React.createElement(
	          'h2',
	          null,
	          '一组复选框'
	        )
	      ),
	      React.createElement(
	        'div',
	        { className: 'content' },
	        React.createElement(
	          'pre',
	          { className: 'prettyprint' },
	          '<CheckboxGroup data={array} sep={string||null} cache={bool} inline={bool} onChange={function}\r  readOnly={bool} src="string" textKey="string" valueKey="string" value={any} />'
	        ),
	        React.createElement(
	          'p',
	          null,
	          React.createElement(
	            'b',
	            null,
	            'data:'
	          ),
	          '数据，与 ',
	          React.createElement(
	            'em',
	            null,
	            'src'
	          ),
	          ' 二选一，优先使用data'
	        ),
	        React.createElement(
	          'p',
	          null,
	          React.createElement(
	            'b',
	            null,
	            'sep:'
	          ),
	          '返回值分隔字符，默认值为 ',
	          React.createElement(
	            'em',
	            null,
	            ','
	          ),
	          ' 。值设为 ',
	          React.createElement(
	            'em',
	            null,
	            '\'\''
	          ),
	          ' 或 ',
	          React.createElement(
	            'em',
	            null,
	            'null'
	          ),
	          ' 时，返回值类型为 ',
	          React.createElement(
	            'em',
	            null,
	            'array'
	          )
	        ),
	        React.createElement(
	          'p',
	          null,
	          React.createElement(
	            'b',
	            null,
	            'inline:'
	          ),
	          '为 ',
	          React.createElement(
	            'em',
	            null,
	            'true'
	          ),
	          ' 时，各选项横向排列。默认为 ',
	          React.createElement(
	            'em',
	            null,
	            'false'
	          )
	        ),
	        React.createElement(
	          'p',
	          null,
	          React.createElement(
	            'b',
	            null,
	            'onChange:'
	          ),
	          '当选项改变时回调方法，参数为 ',
	          React.createElement(
	            'em',
	            null,
	            'value'
	          )
	        ),
	        React.createElement(
	          'p',
	          null,
	          React.createElement(
	            'b',
	            null,
	            'readOnly:'
	          ),
	          '为 ',
	          React.createElement(
	            'em',
	            null,
	            'true'
	          ),
	          ' 时，只读。默认为 ',
	          React.createElement(
	            'em',
	            null,
	            'false'
	          )
	        ),
	        React.createElement(
	          'p',
	          null,
	          React.createElement(
	            'b',
	            null,
	            'src:'
	          ),
	          '服务器端数据地址，与 ',
	          React.createElement(
	            'em',
	            null,
	            'data'
	          ),
	          ' 二选一'
	        ),
	        React.createElement(
	          'p',
	          null,
	          React.createElement(
	            'b',
	            null,
	            'cache:'
	          ),
	          '数据缓存，只有当数据为远程获取时有效。默认为 ',
	          React.createElement(
	            'em',
	            null,
	            'true'
	          )
	        ),
	        React.createElement(
	          'p',
	          null,
	          React.createElement(
	            'b',
	            null,
	            'textKey:'
	          ),
	          '数据结构中显示文字的key，不填默认为 ',
	          React.createElement(
	            'em',
	            null,
	            'text'
	          )
	        ),
	        React.createElement(
	          'p',
	          null,
	          React.createElement(
	            'b',
	            null,
	            'valueKey:'
	          ),
	          '数据结构中返回值的key，不填默认为 ',
	          React.createElement(
	            'em',
	            null,
	            'value'
	          )
	        ),
	        React.createElement(
	          'p',
	          null,
	          React.createElement(
	            'b',
	            null,
	            'value:'
	          ),
	          '选中值'
	        ),
	        React.createElement(
	          'h2',
	          { className: 'subhead' },
	          '数据结构'
	        ),
	        React.createElement(
	          'p',
	          null,
	          '标准结构为 ',
	          React.createElement(
	            'em',
	            null,
	            'text'
	          ),
	          ', ',
	          React.createElement(
	            'em',
	            null,
	            'value'
	          ),
	          ' key组成的数组'
	        ),
	        React.createElement(
	          'pre',
	          { className: 'prettyprint' },
	          '[{"text":"北京","value":"beijing"},{"text":"上海", "value":"shanghai"}]'
	        ),
	        React.createElement(
	          'p',
	          null,
	          '可以使用自定义数组，指定 ',
	          React.createElement(
	            'em',
	            null,
	            'textKey'
	          ),
	          ', ',
	          React.createElement(
	            'em',
	            null,
	            'valueKey'
	          )
	        ),
	        React.createElement(
	          'pre',
	          { className: 'prettyprint' },
	          '[{"cn":"北京","py":"beijing"},{"cn":"上海", "py":"shanghai"}]'
	        ),
	        React.createElement(
	          'p',
	          null,
	          '可以使用一维数组，这种情况下，显示文字与值相同'
	        ),
	        React.createElement(
	          'pre',
	          { className: 'prettyprint' },
	          '["北京","上海","广州"]'
	        ),
	        React.createElement(
	          'h2',
	          { className: 'subhead' },
	          'Object Data'
	        ),
	        React.createElement(
	          'p',
	          null,
	          React.createElement(CheckboxGroup, { inline: true, data: textValue })
	        ),
	        React.createElement(
	          'pre',
	          { className: 'prettyprint' },
	          '<CheckboxGroup inline={true} data={data} />'
	        ),
	        React.createElement(
	          'pre',
	          { className: 'prettyprint' },
	          'data = [\n  { "value": "nanjing", "text": "南京" },\n  { "value": "beijing", "text": "北京" },\n  { "value": "guangzhou", "text": "广州" },\n  { "value": "shenzhen", "text": "深圳" },\n  { "value": "chengdu", "text": "成都" },\n  { "value": "chongqing", "text": "重庆" },\n  { "value": "shanghai", "text": "上海" }\n]'
	        ),
	        React.createElement(
	          'h2',
	          { className: 'subhead' },
	          'Array Data'
	        ),
	        React.createElement(
	          'p',
	          null,
	          React.createElement(CheckboxGroup, { ref: 'array', sep: '', onChange: function () {
	              return console.log(_this.refs.array.getValue());
	            }, inline: true, value: ['北京', '广州'], data: ['南京', '北京', '上海', '广州', '深圳', '成都', '重庆', '西安'] })
	        ),
	        React.createElement(
	          'pre',
	          { className: 'prettyprint' },
	          '<CheckboxGroup inline={true} value={["北京", "广州"]} data={["南京", "北京", "上海", "广州", "深圳", "成都", "重庆", "西安"]} />'
	        ),
	        React.createElement(
	          'h2',
	          { className: 'subhead' },
	          'Readonly'
	        ),
	        React.createElement(
	          'p',
	          null,
	          React.createElement(CheckboxGroup, { readOnly: true, inline: true, value: ['北京', '广州'], data: ['南京', '北京', '上海', '广州', '深圳', '成都', '重庆', '西安'] })
	        ),
	        React.createElement(
	          'pre',
	          { className: 'prettyprint' },
	          '<CheckboxGroup readOnly={true} inline={true} value={["北京", "广州"]} data={["南京", "北京", "上海", "广州", "深圳", "成都", "重庆", "西安"]} />'
	        ),
	        React.createElement(
	          'h2',
	          { className: 'subhead' },
	          'Remote Data'
	        ),
	        React.createElement(
	          'p',
	          null,
	          React.createElement(CheckboxGroup, { ref: 'remote', onChange: function () {
	              return console.log(_this.refs.remote.getValue());
	            }, cache: false, inline: true, value: 'shanghai,chengdu', src: 'json/text-value.json' })
	        ),
	        React.createElement(
	          'pre',
	          { className: 'prettyprint' },
	          '<CheckboxGroup inline={true} value="shanghai,chengdu" cache={false} src="json/text-value.json" />'
	        ),
	        React.createElement(
	          'h2',
	          { className: 'subhead' },
	          'Data Sep'
	        ),
	        React.createElement(
	          'p',
	          null,
	          React.createElement(CheckboxGroup, { ref: 'sep', onChange: function () {
	              return console.log(_this.refs.sep.getValue());
	            }, inline: true, sep: '|', value: 'shanghai|chengdu', src: 'json/text-value.json' })
	        ),
	        React.createElement(
	          'pre',
	          { className: 'prettyprint' },
	          '<CheckboxGroup inline={true} sep="|" value="shanghai|chengdu" src="json/text-value.json" />'
	        )
	      )
	    );
	  }
	});

/***/ },
/* 134 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(131);

	var React = __webpack_require__(52);
	var Checkbox = __webpack_require__(130);
	var Strings = __webpack_require__(135);
	var Classable = __webpack_require__(123);
	var Objects = __webpack_require__(136);
	var Resource = __webpack_require__(138);
	var ReceiveValue = __webpack_require__(143);

	module.exports = React.createClass({
	  displayName: 'CheckboxGroup',

	  propTypes: {
	    cache: React.PropTypes.bool,
	    data: React.PropTypes.array,
	    inline: React.PropTypes.bool,
	    onChange: React.PropTypes.func,
	    readOnly: React.PropTypes.bool,
	    sep: React.PropTypes.string,
	    src: React.PropTypes.string,
	    textKey: React.PropTypes.string,
	    value: React.PropTypes.any,
	    valueKey: React.PropTypes.string
	  },

	  mixins: [Classable, ReceiveValue, Resource],

	  getDefaultProps: function getDefaultProps() {
	    return {
	      sep: ',',
	      textKey: 'text',
	      valueKey: 'value'
	    };
	  },

	  getInitialState: function getInitialState() {
	    return {
	      data: []
	    };
	  },

	  formatValue: function formatValue(value) {
	    return Strings.toArray(value, this.props.sep);
	  },

	  initData: function initData(data) {
	    data = Objects.toTextValue(data, this.props.textKey, this.props.valueKey);
	    this.setState({ data: data });
	  },

	  handleChange: function handleChange(checked, value) {
	    if (typeof value !== 'string') {
	      value = value.toString();
	    }

	    var values = this.state.value;
	    if (checked) {
	      values.push(value);
	    } else {
	      var i = values.indexOf(value);
	      if (i >= 0) {
	        values.splice(i, 1);
	      }
	    }

	    if (this.props.onChange) {
	      this.props.onChange(values);
	    }

	    this.setState({ value: values });
	  },

	  getValue: function getValue(sep) {
	    var value = this.state.value;
	    sep = sep || this.props.sep;
	    if (sep) {
	      value = value.join(sep);
	    }
	    return value;
	  },

	  render: function render() {
	    var _this = this;

	    var className = this.getClasses('checkbox-group', {
	      'inline': this.props.inline
	    });
	    var values = this.state.value;

	    var items = this.state.data.map(function (item, i) {
	      var value = _this.props.sep ? item.value.toString() : item.value;
	      var checked = values.indexOf(value) >= 0;
	      return React.createElement(Checkbox, { key: i, index: i, readOnly: _this.props.readOnly, checked: checked, onChange: _this.handleChange, text: item.text, value: item.value });
	    });

	    return React.createElement(
	      'div',
	      { className: className },
	      this.state.msg || items
	    );
	  }
	});

/***/ },
/* 135 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function format() {
	  var args = [].slice.call(arguments),
	      str = args.shift();
	  return str.replace(/{(\d+)}/g, function (match, number) {
	    return typeof args[number] !== undefined ? args[number] : match;
	  });
	}

	function substitute(str, obj) {
	  return str.replace(/\\?\{([^{}]+)\}/g, function (match, name) {
	    if (match.charAt(0) === '\\') {
	      return match.slice(1);
	    }
	    return obj[name] !== null ? obj[name] : '';
	  });
	}

	function toArray(value, sep) {
	  if (!value) {
	    value = [];
	  }
	  if (typeof value === 'string' && sep) {
	    value = value.split(sep);
	  } else if (!(value instanceof Array)) {
	    value = [value];
	  } else if (sep) {
	    // if use sep, convert every value to string
	    value = value.map(function (v) {
	      return v.toString();
	    });
	  }

	  return value;
	}

	module.exports = { format: format, substitute: substitute, toArray: toArray };

/***/ },
/* 136 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var type = __webpack_require__(137);

	function isEmpty(obj) {

	  // null and undefined are "empty"
	  if (obj === null || obj === undefined) {
	    return true;
	  }

	  switch (type(obj)) {
	    case 'nan':
	      return true;
	    case 'array':
	    case 'string':
	    case 'arguments':
	      return obj.length === 0;
	    case 'object':
	      return Object.keys(obj).length === 0;
	    default:
	      return false;
	  }
	}

	function forEach(obj, fn, context) {
	  Object.keys(obj).forEach(function (key) {
	    return fn.call(context, obj[key], key);
	  });
	}

	function toTextValue(arr) {
	  var textKey = arguments[1] === undefined ? 'text' : arguments[1];
	  var valueKey = arguments[2] === undefined ? 'value' : arguments[2];

	  arr = arr.map(function (s) {
	    if (type(s) !== 'object') {
	      return { text: s, value: s };
	    } else {
	      return { text: s[textKey], value: s[valueKey] };
	    }
	  });
	  return arr;
	}

	module.exports = { forEach: forEach, isEmpty: isEmpty, toTextValue: toTextValue };

/***/ },
/* 137 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/component/type
	/**
	 * toString ref.
	 */

	'use strict';

	var toString = Object.prototype.toString;

	/**
	 * Return the type of `val`.
	 *
	 * @param {Mixed} val
	 * @return {String}
	 * @api public
	 */

	module.exports = function (val) {
	  switch (toString.call(val)) {
	    case '[object Date]':
	      return 'date';
	    case '[object RegExp]':
	      return 'regexp';
	    case '[object Arguments]':
	      return 'arguments';
	    case '[object Array]':
	      return 'array';
	    case '[object Error]':
	      return 'error';
	  }

	  if (val === null) {
	    return 'null';
	  }
	  if (val === undefined) {
	    return 'undefined';
	  }
	  if (val !== val) {
	    return 'nan';
	  }
	  if (val && val.nodeType === 1) {
	    return 'element';
	  }

	  val = val.valueOf ? val.valueOf() : Object.prototype.valueOf.apply(val);

	  return typeof val;
	};

/***/ },
/* 138 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Qwest = __webpack_require__(139);
	var clone = __webpack_require__(140);
	var Lang = __webpack_require__(141);

	module.exports = {
	  componentWillMount: function componentWillMount() {
	    this.$getResource(this.props);
	  },

	  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	    if (nextProps.src !== this.props.src || nextProps.data !== this.props.data) {
	      this.$getResource(nextProps);
	    }
	  },

	  $getResource: function $getResource(props) {
	    if (props.data) {
	      if (this.initData) {
	        this.initData(props.data);
	      } else {
	        this.setState({ data: props.data });
	      }
	    } else if (props.src) {
	      this.setState({ msg: Lang.get('request.loading'), data: [] });

	      // default use cache
	      var cache = props.cache === undefined ? true : !!props.cache;
	      Qwest.get(props.src, null, { cache: cache }).then((function (res) {
	        var data = res.status === 1 ? res.data : res instanceof Array ? res : undefined;

	        if (!data) {
	          var msg = res.msg ? res.msg : Lang.get('request.failure');
	          this.setState({ msg: msg });
	          return;
	        } else {
	          this.setState({ msg: null });
	        }

	        data = clone(data);

	        // initialize data
	        if (this.initData) {
	          this.initData(data);
	        } else {
	          this.setState({ data: data });
	        }
	      }).bind(this))['catch']((function () {
	        this.setState({ msg: Lang.get('request.failure') });
	      }).bind(this));
	    }
	  }
	};

/***/ },
/* 139 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*! qwest 1.7.0 (https://github.com/pyrsmk/qwest) */

	'use strict';

	;(function (context, name, definition) {
		if (typeof module != 'undefined' && module.exports) {
			module.exports = definition;
		} else if (true) {
			!(__WEBPACK_AMD_DEFINE_FACTORY__ = (definition), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else {
			context[name] = definition;
		}
	})(undefined, 'qwest', (function () {

		var win = window,
		    doc = document,
		    _before,
		   
		// Default response type for XDR in auto mode
		defaultXdrResponseType = 'json',
		   
		// Variables for limit mechanism
		_limit = null,
		    requests = 0,
		    request_stack = [],
		   
		// Get XMLHttpRequest object
		getXHR = function getXHR() {
			return win.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
		},
		   
		// Guess XHR version
		xhr2 = getXHR().responseType === '',
		   

		// Core function
		qwest = function qwest(method, url, data, options, before) {

			// Format
			method = method.toUpperCase();
			data = data || null;
			options = options || {};

			// Define variables
			var nativeResponseParsing = false,
			    crossOrigin,
			    xhr,
			    xdr = false,
			    timeoutInterval,
			    aborted = false,
			    attempts = 0,
			    headers = {},
			    mimeTypes = {
				text: '*/*',
				xml: 'text/xml',
				json: 'application/json',
				post: 'application/x-www-form-urlencoded'
			},
			    accept = {
				text: '*/*',
				xml: 'application/xml; q=1.0, text/xml; q=0.8, */*; q=0.1',
				json: 'application/json; q=1.0, text/*; q=0.8, */*; q=0.1'
			},
			    contentType = 'Content-Type',
			    vars = '',
			    i,
			    j,
			    serialized,
			    then_stack = [],
			    catch_stack = [],
			    complete_stack = [],
			    response,
			    success,
			    error,
			    func,
			   

			// Define promises
			promises = {
				then: function then(func) {
					if (options.async) {
						then_stack.push(func);
					} else if (success) {
						func.call(xhr, response);
					}
					return promises;
				},
				'catch': function _catch(func) {
					if (options.async) {
						catch_stack.push(func);
					} else if (error) {
						func.call(xhr, response);
					}
					return promises;
				},
				complete: function complete(func) {
					if (options.async) {
						complete_stack.push(func);
					} else {
						func.call(xhr);
					}
					return promises;
				}
			},
			    promises_limit = {
				then: function then(func) {
					request_stack[request_stack.length - 1].then.push(func);
					return promises_limit;
				},
				'catch': function _catch(func) {
					request_stack[request_stack.length - 1]['catch'].push(func);
					return promises_limit;
				},
				complete: function complete(func) {
					request_stack[request_stack.length - 1].complete.push(func);
					return promises_limit;
				}
			},
			   

			// Handle the response
			handleResponse = function handleResponse() {
				// Verify request's state
				// --- https://stackoverflow.com/questions/7287706/ie-9-javascript-error-c00c023f
				if (aborted) {
					return;
				}
				// Prepare
				var i, req, p, responseType;
				--requests;
				// Clear the timeout
				clearInterval(timeoutInterval);
				// Launch next stacked request
				if (request_stack.length) {
					req = request_stack.shift();
					p = qwest(req.method, req.url, req.data, req.options, req.before);
					for (i = 0; func = req.then[i]; ++i) {
						p.then(func);
					}
					for (i = 0; func = req['catch'][i]; ++i) {
						p['catch'](func);
					}
					for (i = 0; func = req.complete[i]; ++i) {
						p.complete(func);
					}
				}
				// Handle response
				try {
					// Init
					var responseText = 'responseText',
					    responseXML = 'responseXML',
					    parseError = 'parseError';
					// Process response
					if (nativeResponseParsing && 'response' in xhr && xhr.response !== null) {
						response = xhr.response;
					} else if (options.responseType == 'document') {
						var frame = doc.createElement('iframe');
						frame.style.display = 'none';
						doc.body.appendChild(frame);
						frame.contentDocument.open();
						frame.contentDocument.write(xhr.response);
						frame.contentDocument.close();
						response = frame.contentDocument;
						doc.body.removeChild(frame);
					} else {
						// Guess response type
						responseType = options.responseType;
						if (responseType == 'auto') {
							if (xdr) {
								responseType = defaultXdrResponseType;
							} else {
								var ct = xhr.getResponseHeader(contentType) || '';
								if (ct.indexOf(mimeTypes.json) > -1) {
									responseType = 'json';
								} else if (ct.indexOf(mimeTypes.xml) > -1) {
									responseType = 'xml';
								} else {
									responseType = 'text';
								}
							}
						}
						// Handle response type
						switch (responseType) {
							case 'json':
								try {
									if ('JSON' in win) {
										response = JSON.parse(xhr[responseText]);
									} else {
										response = eval('(' + xhr[responseText] + ')');
									}
								} catch (e) {
									throw 'Error while parsing JSON body : ' + e;
								}
								break;
							case 'xml':
								// Based on jQuery's parseXML() function
								try {
									// Standard
									if (win.DOMParser) {
										response = new DOMParser().parseFromString(xhr[responseText], 'text/xml');
									}
									// IE<9
									else {
										response = new ActiveXObject('Microsoft.XMLDOM');
										response.async = 'false';
										response.loadXML(xhr[responseText]);
									}
								} catch (e) {
									response = undefined;
								}
								if (!response || !response.documentElement || response.getElementsByTagName('parsererror').length) {
									throw 'Invalid XML';
								}
								break;
							default:
								response = xhr[responseText];
						}
					}
					// Late status code verification to allow data when, per example, a 409 is returned
					// --- https://stackoverflow.com/questions/10046972/msie-returns-status-code-of-1223-for-ajax-request
					if ('status' in xhr && !/^2|1223/.test(xhr.status)) {
						throw xhr.status + ' (' + xhr.statusText + ')';
					}
					// Execute 'then' stack
					success = true;
					p = response;
					if (options.async) {
						for (i = 0; func = then_stack[i]; ++i) {
							p = func.call(xhr, p);
						}
					}
				} catch (e) {
					error = true;
					// Execute 'catch' stack
					if (options.async) {
						for (i = 0; func = catch_stack[i]; ++i) {
							func.call(xhr, e, response);
						}
					}
				}
				// Execute complete stack
				if (options.async) {
					for (i = 0; func = complete_stack[i]; ++i) {
						func.call(xhr, response);
					}
				}
			},
			   

			// Handle errors
			handleError = function handleError(e) {
				error = true;
				--requests;
				// Clear the timeout
				clearInterval(timeoutInterval);
				// Execute 'catch' stack
				if (options.async) {
					for (i = 0; func = catch_stack[i]; ++i) {
						func.call(xhr, e, null);
					}
				}
			},
			   

			// Recursively build the query string
			buildData = function buildData(data, key) {
				var res = [],
				    enc = encodeURIComponent,
				    p;
				if (typeof data === 'object' && data != null) {
					for (p in data) {
						if (data.hasOwnProperty(p)) {
							var built = buildData(data[p], key ? key + '[' + p + ']' : p);
							if (built !== '') {
								res = res.concat(built);
							}
						}
					}
				} else if (data != null && key != null) {
					res.push(enc(key) + '=' + enc(data));
				}
				return res.join('&');
			};

			// New request
			++requests;

			if ('retries' in options) {
				if (win.console && console.warn) {
					console.warn('[Qwest] The retries option is deprecated. It indicates total number of requests to attempt. Please use the "attempts" option.');
				}
				options.attempts = options.retries;
			}

			// Normalize options
			options.async = 'async' in options ? !!options.async : true;
			options.cache = 'cache' in options ? !!options.cache : method != 'GET';
			options.dataType = 'dataType' in options ? options.dataType.toLowerCase() : 'post';
			options.responseType = 'responseType' in options ? options.responseType.toLowerCase() : 'auto';
			options.user = options.user || '';
			options.password = options.password || '';
			options.withCredentials = !!options.withCredentials;
			options.timeout = 'timeout' in options ? parseInt(options.timeout, 10) : 30000;
			options.attempts = 'attempts' in options ? parseInt(options.attempts, 10) : 1;

			// Guess if we're dealing with a cross-origin request
			i = url.match(/\/\/(.+?)\//);
			crossOrigin = i && i[1] ? i[1] != location.host : false;

			// Prepare data
			if ('ArrayBuffer' in win && data instanceof ArrayBuffer) {
				options.dataType = 'arraybuffer';
			} else if ('Blob' in win && data instanceof Blob) {
				options.dataType = 'blob';
			} else if ('Document' in win && data instanceof Document) {
				options.dataType = 'document';
			} else if ('FormData' in win && data instanceof FormData) {
				options.dataType = 'formdata';
			}
			switch (options.dataType) {
				case 'json':
					data = JSON.stringify(data);
					break;
				case 'post':
					data = buildData(data);
			}

			// Prepare headers
			if (options.headers) {
				var format = function format(match, p1, p2) {
					return p1 + p2.toUpperCase();
				};
				for (i in options.headers) {
					headers[i.replace(/(^|-)([^-])/g, format)] = options.headers[i];
				}
			}
			if (!headers[contentType] && method != 'GET') {
				if (options.dataType in mimeTypes) {
					if (mimeTypes[options.dataType]) {
						headers[contentType] = mimeTypes[options.dataType];
					}
				}
			}
			if (!headers.Accept) {
				headers.Accept = options.responseType in accept ? accept[options.responseType] : '*/*';
			}
			if (!crossOrigin && !headers['X-Requested-With']) {
				// because that header breaks in legacy browsers with CORS
				headers['X-Requested-With'] = 'XMLHttpRequest';
			}

			// Prepare URL
			if (method == 'GET' && data) {
				vars += data;
			}
			if (!options.cache) {
				if (vars) {
					vars += '&';
				}
				vars += '__t=' + +new Date();
			}
			if (vars) {
				url += (/\?/.test(url) ? '&' : '?') + vars;
			}

			// The limit has been reached, stock the request
			if (_limit && requests == _limit) {
				request_stack.push({
					method: method,
					url: url,
					data: data,
					options: options,
					before: before,
					then: [],
					'catch': [],
					complete: []
				});
				return promises_limit;
			}

			// Send the request
			var send = function send() {
				// Get XHR object
				xhr = getXHR();
				if (crossOrigin) {
					if (!('withCredentials' in xhr) && win.XDomainRequest) {
						xhr = new XDomainRequest(); // CORS with IE8/9
						xdr = true;
						if (method != 'GET' && method != 'POST') {
							method = 'POST';
						}
					}
				}
				// Open connection
				if (xdr) {
					xhr.open(method, url);
				} else {
					xhr.open(method, url, options.async, options.user, options.password);
					if (xhr2 && options.async) {
						xhr.withCredentials = options.withCredentials;
					}
				}
				// Set headers
				if (!xdr) {
					for (var i in headers) {
						xhr.setRequestHeader(i, headers[i]);
					}
				}
				// Verify if the response type is supported by the current browser
				if (xhr2 && options.responseType != 'document' && options.responseType != 'auto') {
					// Don't verify for 'document' since we're using an internal routine
					try {
						xhr.responseType = options.responseType;
						nativeResponseParsing = xhr.responseType == options.responseType;
					} catch (e) {}
				}
				// Plug response handler
				if (xhr2 || xdr) {
					xhr.onload = handleResponse;
					xhr.onerror = handleError;
				} else {
					xhr.onreadystatechange = function () {
						if (xhr.readyState == 4) {
							handleResponse();
						}
					};
				}
				// Override mime type to ensure the response is well parsed
				if (options.responseType != 'auto' && 'overrideMimeType' in xhr) {
					xhr.overrideMimeType(mimeTypes[options.responseType]);
				}
				// Run 'before' callback
				if (before) {
					before.call(xhr);
				}
				// Send request
				if (xdr) {
					setTimeout(function () {
						// https://developer.mozilla.org/en-US/docs/Web/API/XDomainRequest
						xhr.send(method != 'GET' ? data : null);
					}, 0);
				} else {
					xhr.send(method != 'GET' ? data : null);
				}
			};

			// Timeout/attempts
			var timeout = function timeout() {
				timeoutInterval = setTimeout(function () {
					aborted = true;
					xhr.abort();
					if (!options.attempts || ++attempts != options.attempts) {
						aborted = false;
						timeout();
						send();
					} else {
						aborted = false;
						error = true;
						response = 'Timeout (' + url + ')';
						if (options.async) {
							for (i = 0; func = catch_stack[i]; ++i) {
								func.call(xhr, response);
							}
						}
					}
				}, options.timeout);
			};

			// Start the request
			timeout();
			send();

			// Return promises
			return promises;
		};

		// Return external qwest object
		var create = function create(method) {
			return function (url, data, options) {
				var b = _before;
				_before = null;
				return qwest(method, this.base + url, data, options, b);
			};
		},
		    obj = {
			base: '',
			before: function before(callback) {
				_before = callback;
				return obj;
			},
			get: create('GET'),
			post: create('POST'),
			put: create('PUT'),
			'delete': create('DELETE'),
			xhr2: xhr2,
			limit: function limit(by) {
				_limit = by;
			},
			setDefaultXdrResponseType: function setDefaultXdrResponseType(type) {
				defaultXdrResponseType = type.toLowerCase();
			}
		};
		return obj;
	})());

/***/ },
/* 140 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/component/clone
	/**
	 * Module dependencies.
	 */

	'use strict';

	var type = __webpack_require__(137);

	/**
	 * Clones objects.
	 *
	 * @param {Mixed} any object
	 * @api public
	 */

	function clone(obj) {
	  switch (type(obj)) {
	    case 'object':
	      var copy = {};
	      for (var key in obj) {
	        if (obj.hasOwnProperty(key)) {
	          copy[key] = clone(obj[key]);
	        }
	      }
	      return copy;

	    case 'array':
	      var arr = new Array(obj.length);
	      for (var i = 0, l = obj.length; i < l; i++) {
	        arr[i] = clone(obj[i]);
	      }
	      return arr;

	    case 'regexp':
	      // from millermedeiros/amd-utils - MIT
	      var flags = '';
	      flags += obj.multiline ? 'm' : '';
	      flags += obj.global ? 'g' : '';
	      flags += obj.ignoreCase ? 'i' : '';
	      return new RegExp(obj.source, flags);

	    case 'date':
	      return new Date(obj.getTime());

	    default:
	      // string, number, boolean, …
	      return obj;
	  }
	}

	/**
	 * Module exports.
	 */

	module.exports = clone;

/***/ },
/* 141 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var merge = __webpack_require__(142);
	var lang = {};

	module.exports = {
	  set: function set() {
	    var args = [].slice.call(arguments);
	    args.forEach(function (arg) {
	      lang = merge(lang, arg);
	    });
	  },

	  get: function get(path) {
	    if (!path || typeof path !== 'string') {
	      return undefined;
	    }

	    var paths = path.split('.');
	    var result = lang;

	    for (var i = 0, count = paths.length; i < count; i++) {
	      result = result[paths[i]];
	      if (result === undefined) {
	        console.warn('' + path + ' not found...');
	        return undefined;
	      }
	    }

	    return result;
	  }
	};

/***/ },
/* 142 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	(function (root, factory) {
	    if (true) {
	        !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof exports === 'object') {
	        module.exports = factory();
	    } else {
	        root.deepmerge = factory();
	    }
	})(undefined, function () {

	    return function deepmerge(target, src) {
	        var array = Array.isArray(src);
	        var dst = array && [] || {};

	        if (array) {
	            target = target || [];
	            dst = dst.concat(target);
	            src.forEach(function (e, i) {
	                if (typeof dst[i] === 'undefined') {
	                    dst[i] = e;
	                } else if (typeof e === 'object') {
	                    dst[i] = deepmerge(target[i], e);
	                } else {
	                    if (target.indexOf(e) === -1) {
	                        dst.push(e);
	                    }
	                }
	            });
	        } else {
	            if (target && typeof target === 'object') {
	                Object.keys(target).forEach(function (key) {
	                    dst[key] = target[key];
	                });
	            }
	            Object.keys(src).forEach(function (key) {
	                if (typeof src[key] !== 'object' || !src[key]) {
	                    dst[key] = src[key];
	                } else {
	                    if (!target[key]) {
	                        dst[key] = src[key];
	                    } else {
	                        dst[key] = deepmerge(target[key], src[key]);
	                    }
	                }
	            });
	        }

	        return dst;
	    };
	});

/***/ },
/* 143 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = {
	  getInitialState: function getInitialState() {
	    return {
	      value: this.$formatValue(this.props.value)
	    };
	  },

	  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	    if (nextProps.value !== this.props.value) {
	      this.setState({ value: this.$formatValue(nextProps.value) });
	    }
	  },

	  setValue: function setValue(value) {
	    value = this.$formatValue(value);
	    this.setState({ value: value });
	  },

	  $formatValue: function $formatValue(value) {
	    if (this.formatValue) {
	      value = this.formatValue(value);
	    }
	    return value;
	  }
	};

/***/ },
/* 144 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = [{ "value": "nanjing", "text": "南京" }, { "value": "beijing", "text": "北京" }, { "value": "guangzhou", "text": "广州" }, { "value": "shenzhen", "text": "深圳" }, { "value": "chengdu", "text": "成都" }, { "value": "chongqing", "text": "重庆" }, { "value": "shanghai", "text": "上海" }];

/***/ },
/* 145 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _srcJs = __webpack_require__(146);

	var React = __webpack_require__(52);
	var Prettify = __webpack_require__(113);

	module.exports = React.createClass({
	  displayName: 'Pages/Message',

	  mixins: [Prettify],

	  render: function render() {
	    return React.createElement(
	      'div',
	      null,
	      React.createElement(
	        'div',
	        { className: 'header' },
	        React.createElement(
	          'h1',
	          null,
	          'Message'
	        ),
	        React.createElement(
	          'h2',
	          null,
	          '通知 / 消息'
	        )
	      ),
	      React.createElement(
	        'div',
	        { className: 'content' },
	        React.createElement(
	          'p',
	          null,
	          '为了实现全局通知，使用了Reflux，需要加入Reflux引用。'
	        ),
	        React.createElement(
	          'p',
	          null,
	          '首先，在页面的某个地方，加入一个',
	          React.createElement(
	            'em',
	            null,
	            'Message Compontent'
	          )
	        ),
	        React.createElement(
	          'pre',
	          { className: 'prettyprint' },
	          '<Message top={bool} clickaway={bool} />'
	        ),
	        React.createElement(
	          'p',
	          null,
	          React.createElement(
	            'b',
	            null,
	            'top:'
	          ),
	          '显示位置，为 ',
	          React.createElement(
	            'em',
	            null,
	            'true'
	          ),
	          ' 时显示在页面顶部， ',
	          React.createElement(
	            'em',
	            null,
	            'false'
	          ),
	          ' 显示在页面左下角'
	        ),
	        React.createElement(
	          'p',
	          null,
	          React.createElement(
	            'b',
	            null,
	            'clickaway:'
	          ),
	          '为 ',
	          React.createElement(
	            'em',
	            null,
	            'true'
	          ),
	          ' 时，点击页面空白处关闭所有消息'
	        ),
	        React.createElement(
	          'h2',
	          { className: 'subhead' },
	          '全局方法'
	        ),
	        React.createElement(
	          'pre',
	          { className: 'prettyprint' },
	          'Message.show(content, type)'
	        ),
	        React.createElement(
	          'p',
	          null,
	          React.createElement(
	            'b',
	            null,
	            'content:'
	          ),
	          '内容，必填，值为 ',
	          React.createElement(
	            'em',
	            null,
	            'string'
	          ),
	          ' 或 ',
	          React.createElement(
	            'em',
	            null,
	            'element'
	          )
	        ),
	        React.createElement(
	          'p',
	          null,
	          React.createElement(
	            'b',
	            null,
	            'type:'
	          ),
	          '样式，会增加一个class ',
	          React.createElement(
	            'em',
	            null,
	            'messsage-[type]'
	          ),
	          '，默认值为 ',
	          React.createElement(
	            'em',
	            null,
	            'info'
	          )
	        ),
	        React.createElement(
	          'h2',
	          { className: 'subhead' },
	          'Example'
	        ),
	        React.createElement(
	          'p',
	          null,
	          React.createElement(
	            'a',
	            { onClick: _srcJs.Message.show.bind(null, 'Info message.') },
	            'info message'
	          )
	        ),
	        React.createElement(
	          'pre',
	          { className: 'prettyprint' },
	          'Message.show("info message.")'
	        ),
	        React.createElement(
	          'p',
	          null,
	          React.createElement(
	            'a',
	            { onClick: _srcJs.Message.show.bind(null, 'error message.', 'error') },
	            'error message'
	          )
	        ),
	        React.createElement(
	          'pre',
	          { className: 'prettyprint' },
	          'Message.error("error message.", "error")'
	        ),
	        React.createElement(
	          'p',
	          null,
	          React.createElement(
	            'a',
	            { onClick: _srcJs.Message.show.bind(null, React.createElement(
	                'div',
	                null,
	                React.createElement(
	                  'h3',
	                  null,
	                  'title'
	                ),
	                React.createElement(
	                  'span',
	                  null,
	                  'span message'
	                )
	              ), 'warn') },
	            'element message'
	          )
	        ),
	        React.createElement(
	          'pre',
	          { className: 'prettyprint' },
	          'Message.warn(<span>warning and span</span>, "title")'
	        ),
	        React.createElement(
	          'p',
	          null,
	          React.createElement(
	            'a',
	            { onClick: _srcJs.Message.show.bind(null, React.createElement(
	                'span',
	                null,
	                React.createElement(_srcJs.Icon, { icon: 'music' }),
	                ' success and icon'
	              ), 'success') },
	            'success message'
	          )
	        ),
	        React.createElement(
	          'pre',
	          { className: 'prettyprint' },
	          'Message.success(<span><Icon icon="music" /> success and icon</span>, "title")'
	        ),
	        React.createElement(
	          'h2',
	          { className: 'subhead' },
	          '扩展'
	        ),
	        React.createElement(
	          'p',
	          null,
	          '默认会添加 ',
	          React.createElement(
	            'em',
	            null,
	            'message-extend'
	          ),
	          ' 类，可以通过这个类进行扩展。'
	        )
	      )
	    );
	  }
	});

/***/ },
/* 146 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.Button = __webpack_require__(125);
	exports.Checkbox = __webpack_require__(130);
	exports.CheckboxGroup = __webpack_require__(134);
	exports.Icon = __webpack_require__(114);
	exports.Message = __webpack_require__(147);
	exports.RadioGroup = __webpack_require__(154);

	exports.Utils = {
	  Objects: __webpack_require__(136),
	  Strings: __webpack_require__(135)
	};

	// ajax
	exports.Qwest = __webpack_require__(139);
	exports.Request = __webpack_require__(139); // alias

	// set language
	__webpack_require__(156);

/***/ },
/* 147 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	__webpack_require__(148);

	var React = __webpack_require__(52);
	var Overlay = __webpack_require__(150);
	var Objects = __webpack_require__(136);
	var Classable = __webpack_require__(123);
	var PubSub = __webpack_require__(153);

	var messages = [];
	var ADD_MESSAGE = 'EB3A79637B40';
	var REMOVE_MESSAGE = '73D4EF15DF50';

	var Item = React.createClass({
	  displayName: 'Message.Item',

	  propTypes: {
	    content: React.PropTypes.string,
	    dismissed: React.PropTypes.dismissed,
	    index: React.PropTypes.number,
	    onDismiss: React.PropTypes.func,
	    type: React.PropTypes.string
	  },

	  mixins: [Classable],

	  getInitialState: function getInitialState() {
	    return {
	      dismissed: this.props.dismissed
	    };
	  },

	  dismiss: function dismiss() {
	    if (this.state.dismissed) {
	      return;
	    }
	    this.setState({ dismissed: true });
	    // wait transition end
	    setTimeout((function () {
	      this.props.onDismiss(this.props.index);
	    }).bind(this), 400);
	  },

	  render: function render() {
	    var className = this.getClasses('message', 'message-' + this.props.type, {
	      'dismissed': this.state.dismissed
	    });

	    return React.createElement(
	      'div',
	      { className: className },
	      React.createElement(
	        'button',
	        { type: 'button', onClick: this.dismiss, className: 'close' },
	        '×'
	      ),
	      this.props.content
	    );
	  }
	});

	var Message = React.createClass({
	  displayName: 'Message',

	  mixins: [Classable],

	  getInitialState: function getInitialState() {
	    return {
	      messages: messages
	    };
	  },

	  componentDidMount: function componentDidMount() {
	    var self = this;
	    PubSub.subscribe(ADD_MESSAGE, function (topic, data) {
	      messages.push(data);
	      self.setState({ messages: messages });
	    });

	    PubSub.subscribe(REMOVE_MESSAGE, function (topic, index) {
	      messages.splice(index, 1);
	      self.setState({ messages: messages });
	    });
	  },

	  dismiss: function dismiss(index) {
	    PubSub.publish(REMOVE_MESSAGE, index);
	  },

	  clear: function clear() {
	    Objects.forEach(this.refs, function (ref) {
	      ref.dismiss();
	    });
	  },

	  render: function render() {
	    var _this = this;

	    var items = this.state.messages.map(function (msg, i) {
	      return React.createElement(Item, _extends({ key: i, index: i, ref: i, onDismiss: _this.dismiss }, msg));
	    });

	    var className = this.getClasses('rui-message', 'message-extend', { 'has-message': this.state.messages.length > 0 });

	    return React.createElement(
	      'div',
	      { className: className },
	      React.createElement(Overlay, { onClick: this.clear }),
	      items
	    );
	  }
	});

	Message.show = function (content, type) {
	  PubSub.publish(ADD_MESSAGE, {
	    content: content,
	    type: type || 'info'
	  });
	};

	module.exports = Message;

/***/ },
/* 148 */
/***/ function(module, exports, __webpack_require__) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 149 */,
/* 150 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _react = __webpack_require__(52);

	var _react2 = _interopRequireDefault(_react);

	var _mixinsClassable = __webpack_require__(123);

	var _mixinsClassable2 = _interopRequireDefault(_mixinsClassable);

	__webpack_require__(151);

	module.exports = _react2['default'].createClass({
	  displayName: 'Overlay',

	  propTypes: {
	    onClick: _react2['default'].PropTypes.func
	  },

	  mixins: [_mixinsClassable2['default']],

	  getDefaultProps: function getDefaultProps() {
	    return {
	      onClick: function onClick() {}
	    };
	  },

	  render: function render() {
	    var className = this.getClasses('overlay');

	    return _react2['default'].createElement('div', { className: className, onClick: this.props.onClick });
	  }
	});

/***/ },
/* 151 */
/***/ function(module, exports, __webpack_require__) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 152 */,
/* 153 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
	Copyright (c) 2010,2011,2012,2013,2014 Morgan Roderick http://roderick.dk
	License: MIT - http://mrgnrdrck.mit-license.org

	https://github.com/mroderick/PubSubJS
	*/
	'use strict';

	(function (root, factory) {
		'use strict';

		if (true) {
			// AMD. Register as an anonymous module.
			!(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else if (typeof exports === 'object') {
			// CommonJS
			factory(exports);
		} else {
			// Browser globals
			var PubSub = {};
			root.PubSub = PubSub;
			factory(PubSub);
		}
	})(typeof window === 'object' && window || undefined, function (PubSub) {
		'use strict';

		var messages = {},
		    lastUid = -1;

		function hasKeys(obj) {
			var key;

			for (key in obj) {
				if (obj.hasOwnProperty(key)) {
					return true;
				}
			}
			return false;
		}

		/**
	  *	Returns a function that throws the passed exception, for use as argument for setTimeout
	  *	@param { Object } ex An Error object
	  */
		function throwException(ex) {
			return function reThrowException() {
				throw ex;
			};
		}

		function callSubscriberWithDelayedExceptions(subscriber, message, data) {
			try {
				subscriber(message, data);
			} catch (ex) {
				setTimeout(throwException(ex), 0);
			}
		}

		function callSubscriberWithImmediateExceptions(subscriber, message, data) {
			subscriber(message, data);
		}

		function deliverMessage(originalMessage, matchedMessage, data, immediateExceptions) {
			var subscribers = messages[matchedMessage],
			    callSubscriber = immediateExceptions ? callSubscriberWithImmediateExceptions : callSubscriberWithDelayedExceptions,
			    s;

			if (!messages.hasOwnProperty(matchedMessage)) {
				return;
			}

			for (s in subscribers) {
				if (subscribers.hasOwnProperty(s)) {
					callSubscriber(subscribers[s], originalMessage, data);
				}
			}
		}

		function createDeliveryFunction(message, data, immediateExceptions) {
			return function deliverNamespaced() {
				var topic = String(message),
				    position = topic.lastIndexOf('.');

				// deliver the message as it is now
				deliverMessage(message, message, data, immediateExceptions);

				// trim the hierarchy and deliver message to each level
				while (position !== -1) {
					topic = topic.substr(0, position);
					position = topic.lastIndexOf('.');
					deliverMessage(message, topic, data, immediateExceptions);
				}
			};
		}

		function messageHasSubscribers(message) {
			var topic = String(message),
			    found = Boolean(messages.hasOwnProperty(topic) && hasKeys(messages[topic])),
			    position = topic.lastIndexOf('.');

			while (!found && position !== -1) {
				topic = topic.substr(0, position);
				position = topic.lastIndexOf('.');
				found = Boolean(messages.hasOwnProperty(topic) && hasKeys(messages[topic]));
			}

			return found;
		}

		function publish(message, data, sync, immediateExceptions) {
			var deliver = createDeliveryFunction(message, data, immediateExceptions),
			    hasSubscribers = messageHasSubscribers(message);

			if (!hasSubscribers) {
				return false;
			}

			if (sync === true) {
				deliver();
			} else {
				setTimeout(deliver, 0);
			}
			return true;
		}

		/**
	  *	PubSub.publish( message[, data] ) -> Boolean
	  *	- message (String): The message to publish
	  *	- data: The data to pass to subscribers
	  *	Publishes the the message, passing the data to it's subscribers
	 **/
		PubSub.publish = function (message, data) {
			return publish(message, data, false, PubSub.immediateExceptions);
		};

		/**
	  *	PubSub.publishSync( message[, data] ) -> Boolean
	  *	- message (String): The message to publish
	  *	- data: The data to pass to subscribers
	  *	Publishes the the message synchronously, passing the data to it's subscribers
	 **/
		PubSub.publishSync = function (message, data) {
			return publish(message, data, true, PubSub.immediateExceptions);
		};

		/**
	  *	PubSub.subscribe( message, func ) -> String
	  *	- message (String): The message to subscribe to
	  *	- func (Function): The function to call when a new message is published
	  *	Subscribes the passed function to the passed message. Every returned token is unique and should be stored if
	  *	you need to unsubscribe
	 **/
		PubSub.subscribe = function (message, func) {
			if (typeof func !== 'function') {
				return false;
			}

			// message is not registered yet
			if (!messages.hasOwnProperty(message)) {
				messages[message] = {};
			}

			// forcing token as String, to allow for future expansions without breaking usage
			// and allow for easy use as key names for the 'messages' object
			var token = 'uid_' + String(++lastUid);
			messages[message][token] = func;

			// return token for unsubscribing
			return token;
		};

		/* Public: Clears all subscriptions
	  */
		PubSub.clearAllSubscriptions = function clearAllSubscriptions() {
			messages = {};
		};

		/*Public: Clear subscriptions by the topic
	 */
		PubSub.clearSubscriptions = function clearSubscriptions(topic) {
			var m;
			for (m in messages) {
				if (messages.hasOwnProperty(m) && m.indexOf(topic) === 0) {
					delete messages[m];
				}
			}
		};

		/* Public: removes subscriptions.
	  * When passed a token, removes a specific subscription.
	  * When passed a function, removes all subscriptions for that function
	  * When passed a topic, removes all subscriptions for that topic (hierarchy)
	  *
	  * value - A token, function or topic to unsubscribe.
	  *
	  * Examples
	  *
	  *		// Example 1 - unsubscribing with a token
	  *		var token = PubSub.subscribe('mytopic', myFunc);
	  *		PubSub.unsubscribe(token);
	  *
	  *		// Example 2 - unsubscribing with a function
	  *		PubSub.unsubscribe(myFunc);
	  *
	  *		// Example 3 - unsubscribing a topic
	  *		PubSub.unsubscribe('mytopic');
	  */
		PubSub.unsubscribe = function (value) {
			var isTopic = typeof value === 'string' && messages.hasOwnProperty(value),
			    isToken = !isTopic && typeof value === 'string',
			    isFunction = typeof value === 'function',
			    result = false,
			    m,
			    message,
			    t;

			if (isTopic) {
				delete messages[value];
				return;
			}

			for (m in messages) {
				if (messages.hasOwnProperty(m)) {
					message = messages[m];

					if (isToken && message[value]) {
						delete message[value];
						result = value;
						// tokens are unique, so we can just stop here
						break;
					}

					if (isFunction) {
						for (t in message) {
							if (message.hasOwnProperty(t) && message[t] === value) {
								delete message[t];
								result = true;
							}
						}
					}
				}
			}

			return result;
		};
	});

/***/ },
/* 154 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(131);
	var React = __webpack_require__(52);
	var Classable = __webpack_require__(123);
	var Objects = __webpack_require__(136);
	var Resource = __webpack_require__(138);
	var ReceiveValue = __webpack_require__(143);
	var Radio = __webpack_require__(155);

	module.exports = React.createClass({
	  displayName: 'RadioGroup',

	  propTypes: {
	    cache: React.PropTypes.bool,
	    data: React.PropTypes.array,
	    inline: React.PropTypes.bool,
	    onChange: React.PropTypes.func,
	    readOnly: React.PropTypes.bool,
	    src: React.PropTypes.string,
	    style: React.PropTypes.object,
	    textKey: React.PropTypes.string,
	    value: React.PropTypes.any,
	    valueKey: React.PropTypes.string
	  },

	  mixins: [Classable, Resource, ReceiveValue],

	  getInitialState: function getInitialState() {
	    return {
	      data: []
	    };
	  },

	  initData: function initData(data) {
	    data = Objects.toTextValue(data, this.props.textKey, this.props.valueKey);
	    this.setState({ data: data });
	  },

	  getValue: function getValue() {
	    return this.state.value;
	  },

	  handleChange: function handleChange(value) {
	    if (this.props.readOnly) {
	      return;
	    }

	    this.setState({ value: value });
	    var change = this.props.onChange;
	    if (change) {
	      setTimeout(function () {
	        change(value);
	      }, 0);
	    }
	  },

	  render: function render() {
	    var className = this.getClasses('radio-group', {
	      'inline': this.props.inline
	    });
	    var items = this.state.data.map(function (item, i) {
	      return React.createElement(Radio, { key: i, onClick: this.handleChange, readOnly: this.props.readOnly, checked: this.state.value === item.value, text: item.text, value: item.value });
	    }, this);

	    return React.createElement(
	      'div',
	      { style: this.props.style, className: className },
	      items
	    );
	  }
	});

/***/ },
/* 155 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(131);
	var React = __webpack_require__(52);

	module.exports = React.createClass({
	  displayName: 'Radio',

	  propTypes: {
	    checked: React.PropTypes.bool,
	    index: React.PropTypes.number,
	    onClick: React.PropTypes.func,
	    readOnly: React.PropTypes.bool,
	    text: React.PropTypes.text,
	    value: React.PropTypes.any
	  },

	  handleClick: function handleClick() {
	    if (this.props.onClick) {
	      this.props.onClick(this.props.value, this.props.index);
	    }
	  },

	  render: function render() {
	    return React.createElement(
	      'div',
	      { className: 'pure-radio rui-radio' },
	      React.createElement(
	        'label',
	        null,
	        React.createElement('input', { ref: 'input', type: 'radio', readOnly: this.props.readOnly, onChange: null, onClick: this.handleClick, checked: this.props.checked, value: this.props.value }),
	        this.props.text
	      )
	    );
	  }
	});

/***/ },
/* 156 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var data = {
	  request: {
	    status: {
	      400: '非法请求',
	      401: '没有访问权限',
	      403: '请求被拒绝',
	      404: '所请求的地址不存在',
	      405: '请求的 HTTP 方法不被允许',
	      500: '服务器错误',
	      503: '服务器错误'
	    },
	    loading: '读取中...',
	    empty: '未知错误.',
	    failure: '获取失败.'
	  },
	  buttons: {
	    add: '新建',
	    back: '返回',
	    fields: '字段',
	    filter: '筛选',
	    refresh: '刷新',
	    reset: '重置',
	    save: '保存'
	  },
	  date: {
	    year: '年',
	    month: '月',
	    fullMonth: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
	    weekday: ['日', '一', '二', '三', '四', '五', '六'],
	    format: {
	      year: 'yyyy年',
	      month: 'MM月',
	      date: 'yyyy-MM-dd',
	      datetime: 'yyyy-MM-dd hh:mm:ss',
	      time: 'hh:mm:ss'
	    }
	  },
	  validation: {
	    hints: {
	      alpha: '英文字符，"-"，"_"',
	      alphanum: '数字、英文字符和"_"',
	      integer: '整数',
	      required: '必填',
	      max: '最大值 {0}',
	      min: '最小值 {0}',
	      maxlen: '最大长度 {0}',
	      maxlens: '最多选择 {0}个选项',
	      minlen: '最小长度 {0}',
	      minlens: '最少选择 {0}个选项',
	      number: '数字',
	      password: '大写英文字符,小写英文字符,数字,特殊字符'
	    },
	    tips: {
	      alpha: '只能包含英文字符，"-"，"_"',
	      alphanum: '只能包含数字、英文字符和"_"',
	      email: '格式不正确',
	      integer: '必须为整数',
	      required: '不能为空',
	      max: '不能大于 {0}',
	      min: '不能小于 {0}',
	      maxlen: '最大长度不能超过 {0} 个字符',
	      maxlens: '最多选择 {0} 个选项',
	      minlen: '最小长度不能少于 {0} 个字符',
	      minlens: '最少选择 {0} 个选项',
	      number: '必须为数字',
	      password: '含有非法字符',
	      url: '格式不正确',
	      hex: '格式不正确，应为6位16进制字符串。例：#ffffff)',
	      rgb: '格式不正确，应为逗号分隔、三个0-255组成的数组。例：rgb(255,255,255)',
	      rgba: '格式不正确，应为三个0-255和0-1组成的数组。例：rgba(255,255,255,1)',
	      hsv: '格式不正确，应为色相(0-360)、彩度(0-100)、明度(0-100)组成的数组。例：hsv(360,100%,100%)'
	    }
	  }
	};

	__webpack_require__(141).set(data);

/***/ },
/* 157 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(52);
	var Prettify = __webpack_require__(113);
	var RadioGroup = __webpack_require__(154);

	var textValue = __webpack_require__(144);

	module.exports = React.createClass({
	  displayName: 'Pages/Checkbox',

	  mixins: [Prettify],

	  getInitialState: function getInitialState() {
	    return {
	      inline: false
	    };
	  },

	  render: function render() {
	    return React.createElement(
	      'div',
	      null,
	      React.createElement(
	        'div',
	        { className: 'header' },
	        React.createElement(
	          'h1',
	          null,
	          'Radio Group'
	        ),
	        React.createElement(
	          'h2',
	          null,
	          '一组单选框'
	        )
	      ),
	      React.createElement(
	        'div',
	        { className: 'content' },
	        React.createElement(
	          'pre',
	          { className: 'prettyprint' },
	          '<RadioGroup data={array} cache={bool} inline={bool} onChange={function} readOnly={bool}\r  src="string" textKey="string" valueKey="string" value={any} />'
	        ),
	        React.createElement(
	          'p',
	          null,
	          React.createElement(
	            'b',
	            null,
	            'data:'
	          ),
	          '数据，与 ',
	          React.createElement(
	            'em',
	            null,
	            'src'
	          ),
	          ' 二选一'
	        ),
	        React.createElement(
	          'p',
	          null,
	          React.createElement(
	            'b',
	            null,
	            'inline:'
	          ),
	          '为 ',
	          React.createElement(
	            'em',
	            null,
	            'true'
	          ),
	          ' 时，各选项横向排列。默认为 ',
	          React.createElement(
	            'em',
	            null,
	            'false'
	          )
	        ),
	        React.createElement(
	          'p',
	          null,
	          React.createElement(
	            'b',
	            null,
	            'onChange:'
	          ),
	          '当选项改变时回调方法，参数为 ',
	          React.createElement(
	            'em',
	            null,
	            'value'
	          )
	        ),
	        React.createElement(
	          'p',
	          null,
	          React.createElement(
	            'b',
	            null,
	            'readOnly:'
	          ),
	          '为 ',
	          React.createElement(
	            'em',
	            null,
	            'true'
	          ),
	          ' 时，只读。默认为 ',
	          React.createElement(
	            'em',
	            null,
	            'false'
	          )
	        ),
	        React.createElement(
	          'p',
	          null,
	          React.createElement(
	            'b',
	            null,
	            'src:'
	          ),
	          '后端数据地址，与 ',
	          React.createElement(
	            'em',
	            null,
	            'data'
	          ),
	          ' 二选一'
	        ),
	        React.createElement(
	          'p',
	          null,
	          React.createElement(
	            'b',
	            null,
	            'cache:'
	          ),
	          '数据缓存，只有当数据为远程获取时有效。默认为 ',
	          React.createElement(
	            'em',
	            null,
	            'true'
	          )
	        ),
	        React.createElement(
	          'p',
	          null,
	          React.createElement(
	            'b',
	            null,
	            'textKey:'
	          ),
	          '数据结构中显示文字的key，不填默认为 ',
	          React.createElement(
	            'em',
	            null,
	            'text'
	          )
	        ),
	        React.createElement(
	          'p',
	          null,
	          React.createElement(
	            'b',
	            null,
	            'valueKey:'
	          ),
	          '数据结构中返回值的key，不填默认为 ',
	          React.createElement(
	            'em',
	            null,
	            'value'
	          )
	        ),
	        React.createElement(
	          'p',
	          null,
	          React.createElement(
	            'b',
	            null,
	            'value:'
	          ),
	          '选中值'
	        ),
	        React.createElement(
	          'h2',
	          { className: 'subhead' },
	          '数据结构'
	        ),
	        React.createElement(
	          'p',
	          null,
	          '标准结构为 ',
	          React.createElement(
	            'em',
	            null,
	            'text'
	          ),
	          ', ',
	          React.createElement(
	            'em',
	            null,
	            'value'
	          ),
	          ' key组成的数组'
	        ),
	        React.createElement(
	          'pre',
	          { className: 'prettyprint' },
	          '[{"text":"北京","value":"beijing"},{"text":"上海", "value":"shanghai"}]'
	        ),
	        React.createElement(
	          'p',
	          null,
	          '可以使用自定义数组，指定 ',
	          React.createElement(
	            'em',
	            null,
	            'textKey'
	          ),
	          ', ',
	          React.createElement(
	            'em',
	            null,
	            'valueKey'
	          )
	        ),
	        React.createElement(
	          'pre',
	          { className: 'prettyprint' },
	          '[{"cn":"北京","py":"beijing"},{"cn":"上海", "py":"shanghai"}]'
	        ),
	        React.createElement(
	          'p',
	          null,
	          '可以使用一维数组，这种情况下，显示文字与值相同'
	        ),
	        React.createElement(
	          'pre',
	          { className: 'prettyprint' },
	          '["北京","上海","广州"]'
	        ),
	        React.createElement(
	          'h2',
	          { className: 'subhead' },
	          'Object Data'
	        ),
	        React.createElement(
	          'p',
	          null,
	          React.createElement(RadioGroup, { inline: true, data: textValue })
	        ),
	        React.createElement(
	          'pre',
	          { className: 'prettyprint' },
	          '<RadioGroup inline={true} data={data} />'
	        ),
	        React.createElement(
	          'pre',
	          { className: 'prettyprint' },
	          'data = [\n  { "value": "nanjing", "text": "南京" },\n  { "value": "beijing", "text": "北京" },\n  { "value": "guangzhou", "text": "广州" },\n  { "value": "shenzhen", "text": "深圳" },\n  { "value": "chengdu", "text": "成都" },\n  { "value": "chongqing", "text": "重庆" },\n  { "value": "shanghai", "text": "上海" }\n]'
	        ),
	        React.createElement(
	          'h2',
	          { className: 'subhead' },
	          'Array Data'
	        ),
	        React.createElement(
	          'p',
	          null,
	          React.createElement(RadioGroup, { inline: true, value: '北京', data: ['南京', '北京', '上海', '广州', '深圳', '成都', '重庆', '西安'] })
	        ),
	        React.createElement(
	          'pre',
	          { className: 'prettyprint' },
	          '<RadioGroup inline={true} value="北京" data={["南京", "北京", "上海", "广州", "深圳", "成都", "重庆", "西安"]} />'
	        ),
	        React.createElement(
	          'h2',
	          { className: 'subhead' },
	          'Readonly'
	        ),
	        React.createElement(
	          'p',
	          null,
	          React.createElement(RadioGroup, { readOnly: true, inline: true, value: '北京', data: ['南京', '北京', '上海', '广州', '深圳', '成都', '重庆', '西安'] })
	        ),
	        React.createElement(
	          'pre',
	          { className: 'prettyprint' },
	          '<RadioGroup readOnly={true} inline={true} value={"北京"} data={["南京", "北京", "上海", "广州", "深圳", "成都", "重庆", "西安"]} />'
	        ),
	        React.createElement(
	          'h2',
	          { className: 'subhead' },
	          'Remote Data'
	        ),
	        React.createElement(
	          'p',
	          null,
	          React.createElement(RadioGroup, { inline: true, stringify: true, value: 'chengdu', src: 'json/text-value.json' })
	        ),
	        React.createElement(
	          'pre',
	          { className: 'prettyprint' },
	          '<RadioGroup inline={true} stringify={true} value="chengdu" src="json/text-value.json" />'
	        )
	      )
	    );
	  }

	});

/***/ },
/* 158 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(52);

	module.exports = React.createClass({
	  displayName: "Home",

	  render: function render() {
	    return React.createElement(
	      "div",
	      null,
	      React.createElement(
	        "div",
	        { className: "hero" },
	        React.createElement(
	          "div",
	          { className: "hero-title" },
	          React.createElement(
	            "h1",
	            null,
	            "React UI"
	          ),
	          React.createElement(
	            "h2",
	            null,
	            "React组件库，样式基于yahoo的",
	            React.createElement(
	              "a",
	              { href: "http://purecss.io/" },
	              "purecss"
	            ),
	            "。"
	          )
	        )
	      )
	    );
	  }
	});

/***/ },
/* 159 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "index.html"

/***/ }
/******/ ])
});
;