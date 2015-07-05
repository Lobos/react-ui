(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("react-router"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "react-router"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("react"), require("react-router")) : factory(root["React"], root["ReactRouter"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_100__, __WEBPACK_EXTERNAL_MODULE_101__) {
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

	var React = __webpack_require__(100);
	var Router = __webpack_require__(101);
	var AppRoutes = __webpack_require__(102);

	// load language
	__webpack_require__(175);

	Router.create({
	  routes: AppRoutes,
	  scrollBehavior: Router.ScrollToTopBehavior
	}).run(function (Handler) {
	  React.render(React.createElement(Handler, null), document.body);
	});

	// static files
	__webpack_require__(194);
	__webpack_require__(195);
	__webpack_require__(196);
	__webpack_require__(197);
	__webpack_require__(198);

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
/* 52 */,
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
/* 100 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_100__;

/***/ },
/* 101 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_101__;

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _reactRouter = __webpack_require__(101);

	var Master = __webpack_require__(103);
	var Home = __webpack_require__(193);

	var menulist = [];
	var index = 1;

	function addMenu(list) {
	  list.forEach(function (menu) {
	    if (menu.handler) {
	      menulist.push(React.createElement(_reactRouter.Route, { key: index, name: menu.route, handler: menu.handler }));
	    }
	    index++;
	  });
	}
	__webpack_require__(106).forEach(function (list) {
	  addMenu(list);
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
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _reactRouter = __webpack_require__(101);

	var React = __webpack_require__(100);
	var classnames = __webpack_require__(104);
	var NavList = __webpack_require__(105);
	var Message = __webpack_require__(165);

	module.exports = React.createClass({
	  displayName: "Master",

	  getInitialState: function getInitialState() {
	    return {
	      navShow: false
	    };
	  },

	  navToggle: function navToggle(show) {
	    this.setState({ navShow: show });
	  },

	  render: function render() {
	    return React.createElement(
	      "div",
	      { className: classnames({ "nav-show": this.state.navShow }) },
	      React.createElement(NavList, { onToggle: this.navToggle }),
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
/* 104 */
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

		if (typeof module !== 'undefined' && module.exports) {
			module.exports = classNames;
		} else if (true) {
			// AMD. Register as an anonymous module.
			!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
				return classNames;
			}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else {
			window.classNames = classNames;
		}
	})();

/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var classnames = __webpack_require__(104);
	var React = __webpack_require__(100);
	var Router = __webpack_require__(101);
	var menulist = __webpack_require__(106);
	var Icon = __webpack_require__(142);
	var Dom = __webpack_require__(108).Utils.Dom;

	module.exports = React.createClass({
	  displayName: 'NavList',

	  propTypes: {
	    onToggle: React.PropTypes.func
	  },

	  mixins: [Router.State],

	  getInitialState: function getInitialState() {
	    return {
	      active: false,
	      height: 0
	    };
	  },

	  getClasses: function getClasses(name, route) {
	    return classnames(name, {
	      active: this.context.router.isActive(route)
	    });
	  },

	  routeChange: function routeChange(route) {
	    this.context.router.transitionTo(route);
	    if (this.state.active) {
	      this.close();
	    }
	  },

	  mouseMove: function mouseMove(active) {
	    if (active !== undefined && active !== this.state.active) {
	      console.log(active);
	      this.toggle(active);
	    }
	  },

	  toggle: function toggle(active) {
	    var _this = this;

	    if (active === undefined) {
	      active = !this.state.active;
	    }
	    var rs = React.findDOMNode(this.refs.list).style;
	    rs.display = active ? 'block' : 'none';

	    if (active) {
	      var height = window.innerHeight || document.documentElement.clientHeight;
	      rs.maxHeight = height - this.state.height + 'px';
	    }

	    setTimeout(function () {
	      _this.setState({ active: active });
	      _this.props.onToggle(active);
	    }, 0);
	  },

	  show: function show() {
	    var _this2 = this;

	    if (this.state.active) {
	      return;
	    }

	    var rs = React.findDOMNode(this.refs.list).style;
	    rs.display = 'block';
	    var height = window.innerHeight || document.documentElement.clientHeight;
	    var navheight = Dom.getOuterHeight(React.findDOMNode(this));
	    rs.maxHeight = height - navheight + 'px';

	    setTimeout(function () {
	      _this2.setState({ active: true });
	      _this2.props.onToggle(true);
	    }, 0);
	  },

	  close: function close() {
	    var _this3 = this;

	    if (this.state.active === false) {
	      return;
	    }

	    this.setState({ active: false });
	    setTimeout(function () {
	      React.findDOMNode(_this3.refs.list).style.display = 'none';
	      _this3.props.onToggle(false);
	    }, 300);
	  },

	  getRoutesList: function getRoutesList(routes, index) {
	    var list = routes.map(function (r, i) {
	      if (r.route) {
	        return React.createElement(
	          'li',
	          { key: i, className: 'pure-menu-item' },
	          React.createElement(
	            'a',
	            { onClick: this.routeChange.bind(this, r.route), className: this.getClasses('pure-menu-link', r.route) },
	            r.text
	          )
	        );
	      } else if (r.hr) {
	        return React.createElement('hr', { key: i });
	      } else if (r.text) {
	        return React.createElement(
	          'li',
	          { key: i, className: 'pure-menu-item' },
	          React.createElement(
	            'span',
	            { className: 'pure-menu-link' },
	            r.text
	          )
	        );
	      }
	    }, this);

	    return React.createElement(
	      'ul',
	      { key: index, className: 'pure-menu-list' },
	      list
	    );
	  },

	  render: function render() {
	    var list = menulist.map(function (routes, index) {
	      return this.getRoutesList(routes, index);
	    }, this);

	    return React.createElement(
	      'div',
	      { className: classnames('nav', { active: this.state.active }) },
	      React.createElement(
	        'a',
	        { className: 'pure-menu-heading', onClick: this.routeChange.bind(this, '/') },
	        'React UI'
	      ),
	      React.createElement(
	        'a',
	        { className: 'link-github', href: 'https://github.com/Lobos/react-ui' },
	        React.createElement(Icon, { icon: 'github' }),
	        ' github'
	      ),
	      React.createElement(
	        'div',
	        { onMouseEnter: this.show, onMouseLeave: this.close, className: 'nav-inner pure-menu' },
	        React.createElement(
	          'a',
	          { onClick: this.show, className: 'nav-handler' },
	          React.createElement(Icon, { icon: 'menu', size: 'lg' })
	        ),
	        React.createElement(
	          'div',
	          { ref: 'list', className: 'nav-list' },
	          React.createElement('div', { className: 'mouse-move-pad' }),
	          list
	        )
	      ),
	      React.createElement('div', { onClick: this.close, className: 'overlay' })
	    );
	  }
	});

/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = [[{ route: 'form', text: 'Form', handler: __webpack_require__(177) }, { route: 'form-control', text: 'Form Control', handler: __webpack_require__(178) }, { route: 'form-submit', text: 'Form Submit', handler: __webpack_require__(179) }, { route: 'checkbox', text: 'Checkbox', handler: __webpack_require__(180) }, { route: 'checkbox-group', text: 'Checkbox Group', handler: __webpack_require__(181) }, { route: 'datetime', text: 'Datetime', handler: __webpack_require__(183) }, { route: 'input', text: 'Input', handler: __webpack_require__(184) }, { route: 'radio-group', text: 'Radio Group', handler: __webpack_require__(185) }, { route: 'rating', text: 'Rating', handler: __webpack_require__(107) }, { route: 'select', text: 'Select', handler: __webpack_require__(186) }, { route: 'tree', text: 'Tree', handler: __webpack_require__(187) }], [{ route: 'button', text: 'Button', handler: __webpack_require__(188) }, { route: 'icon', text: 'Icon', handler: __webpack_require__(189) }, { route: 'lang', text: 'Lang', handler: __webpack_require__(190) }, { route: 'pagination', text: 'Pagination', handler: __webpack_require__(191) }, { route: 'message', text: 'Message', handler: __webpack_require__(192) }]];

/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _srcJs = __webpack_require__(108);

	var React = __webpack_require__(100);
	var Prettify = __webpack_require__(176);

	_srcJs.Rating.register('star', [React.createElement(_srcJs.Icon, { size: 2, style: { color: 'gold' }, icon: 'star-border' }), React.createElement(_srcJs.Icon, { size: 2, style: { color: 'gold' }, icon: 'star' })]);

	module.exports = React.createClass({
	  displayName: 'Pages/Rating',

	  mixins: [Prettify],

	  getInitialState: function getInitialState() {
	    return {
	      readOnly: false,
	      maxValue: 5,
	      value: 3,
	      theme: 'star'
	    };
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
	          'Rating'
	        ),
	        React.createElement(
	          'h2',
	          null,
	          '评分，FormControl组件'
	        )
	      ),
	      React.createElement(
	        'div',
	        { className: 'content' },
	        React.createElement(
	          'pre',
	          { className: 'prettyprint' },
	          '<Rating\n  className={string}  // class\n  icons={array}       // 数组，长度为2，值为element，两个元素宽度高度必须相同，0为未选中，1为选中\n  maxValue={int}      // 最大值，正整数，默认为 5\n  onChange={function} // 当选项改变时回调方法，参数为 value\n  readOnly={bool}     // 为 true 时，只读。默认为 false\n  theme={string}      // 主题，Rating.register 的主题名称\n  value={number}      // 值，整数。只读状态下，支持小数\n/>\n\nRating.register( // 注册一个主题，供重复调用\n  string,        // 主题名称\n  array          // 等同与 icons\n)\n'
	        ),
	        React.createElement(
	          'h2',
	          { className: 'subhead' },
	          'Example'
	        ),
	        React.createElement(
	          'p',
	          null,
	          React.createElement(_srcJs.Rating, { maxValue: this.state.maxValue,
	            theme: this.state.theme,
	            icons: this.state.icons,
	            readOnly: this.state.readOnly,
	            value: this.state.value,
	            onChange: function (value) {
	              return _this.setState({ value: value });
	            }
	          })
	        ),
	        React.createElement(
	          'div',
	          { style: { marginBottom: 10 } },
	          React.createElement(
	            'span',
	            null,
	            'maxValue: '
	          ),
	          React.createElement(_srcJs.RadioGroup, { className: 'pure-u-1 pure-u-sm-7-8', inline: true, onChange: function (maxValue) {
	              return _this.setState({ maxValue: maxValue });
	            }, value: this.state.maxValue, data: [5, 10, 12, 20] })
	        ),
	        React.createElement(
	          'p',
	          null,
	          React.createElement(_srcJs.Checkbox, { onChange: function (checked) {
	              return _this.setState({
	                icons: checked ? [React.createElement(_srcJs.Icon, { icon: 'favorite-outline', style: { color: 'red' } }), React.createElement(_srcJs.Icon, { icon: 'favorite', style: { color: 'red' } })] : null
	              });
	            },
	            text: '设置icons为heart' })
	        ),
	        React.createElement(
	          'p',
	          null,
	          React.createElement(_srcJs.Checkbox, { value: 'readOnly', onChange: function (readOnly) {
	              return _this.setState({ readOnly: readOnly });
	            }, text: 'readOnly' })
	        ),
	        React.createElement(
	          'div',
	          { style: { marginBottom: 10 } },
	          React.createElement(
	            'span',
	            null,
	            'value: '
	          ),
	          React.createElement('input', { onChange: function (event) {
	              return _this.setState({ value: event.target.value });
	            }, type: 'text', value: this.state.value })
	        ),
	        React.createElement('br', null),
	        React.createElement(
	          'pre',
	          { className: 'prettyprint' },
	          '// 注册主题\nRating.register(\'star\', [\n  <Icon size={2} style={{color: \'gold\'}} icon="star-outline" />,\n  <Icon size={2} style={{color: \'gold\'}} icon="star" />\n])\n\n// state\ngetInitialState: function () {\n  return {\n    readOnly: false,\n    maxValue: 5,\n    value: 3,\n    theme: \'star\'\n  }\n}\n\n<Rating maxValue={this.state.maxValue}\n  theme={this.state.theme}\n  icons={this.state.icons}\n  readOnly={this.state.readOnly}\n  value={this.state.value}\n  onChange={value=>this.setState({ value })}\n/>\n\nmaxValue: <RadioGroup className="pure-u-1 pure-u-sm-7-8" inline={true}\n  onChange={maxValue=>this.setState({ maxValue })}\n  value={this.state.maxValue} data={[5, 10, 12, 20]} />\n\n<Checkbox onChange={\n  checked=>this.setState({\n    icons: checked ?\n      [<Icon icon="favorite-outline" style={{color: \'red\'}} />,\n       <Icon icon="favorite" style={{color: \'red\'}} />] :\n      null\n  })}\n  text={\'设置icons为heart\'} />\n\n<Checkbox value="readOnly" onChange={readOnly=>this.setState({ readOnly })}\n  text={\'readOnly\'} />\n\nvalue: <input onChange={event=>this.setState({ value: event.target.value })}\n  type="text" value={this.state.value} />\n'
	        )
	      )
	    );
	  }
	});

/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.Checkbox = __webpack_require__(109);
	exports.CheckboxGroup = __webpack_require__(121);
	exports.Datetime = __webpack_require__(130);
	exports.Icon = __webpack_require__(142);
	exports.Input = __webpack_require__(143);
	exports.RadioGroup = __webpack_require__(146);
	exports.Rating = __webpack_require__(148);
	exports.Select = __webpack_require__(151);
	exports.Tree = __webpack_require__(155);
	exports.Button = __webpack_require__(159);

	exports.FormControl = __webpack_require__(114);
	exports.FormSubmit = __webpack_require__(163);
	exports.Form = __webpack_require__(164);

	exports.Pagination = __webpack_require__(172);

	exports.Message = __webpack_require__(165);
	exports.Lang = __webpack_require__(120);

	exports.Utils = {
	  Datetime: __webpack_require__(138),
	  Dom: __webpack_require__(137),
	  Objects: __webpack_require__(117),
	  Strings: __webpack_require__(115)
	};

	// ajax
	exports.Qwest = __webpack_require__(128);
	exports.Request = __webpack_require__(128); // alias

	// set language
	__webpack_require__(175);

/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(110);
	var React = __webpack_require__(100);

	var Checkbox = React.createClass({
	  displayName: 'Checkbox',

	  propTypes: {
	    checked: React.PropTypes.bool,
	    index: React.PropTypes.number,
	    onChange: React.PropTypes.func,
	    readOnly: React.PropTypes.bool,
	    text: React.PropTypes.any,
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
	      React.createElement('input', { ref: 'input',
	        type: 'checkbox',
	        disabled: this.props.readOnly,
	        onChange: this.handleChange,
	        checked: this.state.checked,
	        value: this.props.value
	      }),
	      ' ' + this.props.text
	    );
	  }
	});

	module.exports = Checkbox;
	__webpack_require__(114).register('checkbox', function (props) {
	  return React.createElement(Checkbox, props);
	}, Checkbox);

/***/ },
/* 110 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 111 */,
/* 112 */,
/* 113 */,
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(100);
	var classnames = __webpack_require__(104);
	var deepmerge = __webpack_require__(116);
	var Strings = __webpack_require__(115);
	var Objects = __webpack_require__(117);
	var Validatable = __webpack_require__(118);

	var controls = {};

	var FormControl = React.createClass({
	  displayName: 'FormControl',

	  propTypes: {
	    children: React.PropTypes.any,
	    className: React.PropTypes.string,
	    data: React.PropTypes.any,
	    hintType: React.PropTypes.oneOf(['block', 'none', 'pop', 'inline']),
	    id: React.PropTypes.string,
	    label: React.PropTypes.string,
	    layout: React.PropTypes.oneOf(['aligned', 'stacked', 'inline']),
	    name: React.PropTypes.string,
	    onChange: React.PropTypes.func,
	    responsive: React.PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
	    type: React.PropTypes.string,
	    value: React.PropTypes.any,
	    width: React.PropTypes.number
	  },

	  mixins: [Validatable],

	  getDefaultProps: function getDefaultProps() {
	    return {
	      id: Strings.nextUid(),
	      layout: 'inline',
	      responsive: 'md',
	      type: 'text'
	    };
	  },

	  getInitialState: function getInitialState() {
	    return {
	      focused: false,
	      hasError: false,
	      hasValue: this.props.value,
	      value: this.props.value,
	      valueType: controls[this.props.type].valueType,
	      data: this.props.data,
	      hintText: ''
	    };
	  },

	  getReference: function getReference() {
	    return this.refs.control;
	  },

	  handleChange: function handleChange(value) {
	    this.validate(this.refs.control.getValue(null));
	    if (this.props.onChange) {
	      this.props.onChange(value);
	    }
	  },

	  getValue: function getValue(sep) {
	    return this.refs.control.getValue(sep);
	  },

	  setValue: function setValue(value) {
	    if (this.refs.control.setValue) {
	      this.refs.control.setValue(value);
	    }
	    this.validate(value);
	  },

	  handleFocus: function handleFocus(focused) {
	    this.setState({ focused: focused });
	  },

	  copyProps: function copyProps() {
	    var props = {};
	    Objects.forEach(this.props, function (v, k) {
	      props[k] = v;
	    });
	    props.ref = 'control';
	    props.value = this.state.value;
	    props.onChange = this.handleChange;
	    props.onFocus = this.handleFocus.bind(this, true);
	    props.onBlur = this.handleFocus.bind(this, false);

	    if (props.layout === 'inline') {
	      props.placeholder = props.placeholder || props.label;
	    }

	    // It's important use state.data instead of props.data
	    // Otherwise control.data will be refresh after setState
	    props.data = this.state.data;

	    return props;
	  },

	  getChildren: function getChildren(children, component) {
	    var _this = this;

	    if (!Array.isArray(children)) {
	      children = [children];
	    }
	    var newChildren = [];
	    children.map(function (child, i) {
	      var props = { key: i };
	      if (child.type === component) {
	        props.ref = 'control';
	      }
	      if (child.props && typeof child.props.children === 'object') {
	        props.children = _this.getChildren(child.props.children, component);
	      }
	      child = React.addons.cloneWithProps(child, props);
	      newChildren.push(child);
	    });
	    return newChildren;
	  },

	  getControl: function getControl(props) {
	    var control = controls[this.props.type];
	    if (!control) {
	      console.warn(this.props.type + ' was not registed.');
	      return null;
	    }

	    var children = this.props.children;
	    if (children) {
	      return this.getChildren(children, control.component);
	    } else {
	      props = deepmerge(this.copyProps(), props || {});
	      return control.render(props);
	    }
	  },

	  renderInline: function renderInline(className) {
	    if (this.props.width) {
	      className = className + ' pure-u-1 pure-u-' + this.props.responsive + '-' + this.props.width + '-24';
	    }
	    return React.createElement(
	      'div',
	      { className: className },
	      this.getControl({ width: this.props.width ? 24 : undefined }),
	      this.state.errorText ? React.createElement(
	        'span',
	        { className: 'error' },
	        this.state.errorText
	      ) : this.state.hintText && React.createElement(
	        'span',
	        { className: 'hint' },
	        this.state.hintText
	      )
	    );
	  },

	  renderStacked: function renderStacked(className) {
	    return React.createElement(
	      'div',
	      { className: className },
	      React.createElement(
	        'label',
	        { className: 'label', htmlFor: this.props.id },
	        this.props.label
	      ),
	      React.createElement(
	        'div',
	        { className: 'pure-control-inner' },
	        this.getControl(),
	        this.state.errorText ? React.createElement(
	          'span',
	          { className: 'error' },
	          this.state.errorText
	        ) : this.state.hintText && React.createElement(
	          'span',
	          { className: 'hint' },
	          this.state.hintText
	        )
	      )
	    );
	  },

	  render: function render() {
	    // do not use Classable, cause width will set control width
	    // if want to set group's width, use className
	    var hintType = this.props.hintType ? this.props.hintType : this.props.layout === 'inline' ? 'pop' : 'block';
	    var className = classnames(this.props.className, 'pure-control-group', 'hint-' + hintType, {
	      'has-error': this.state.hasError,
	      'focused': this.state.focused
	    });

	    if (this.props.layout === 'inline') {
	      return this.renderInline(className);
	    } else {
	      return this.renderStacked(className);
	    }
	  }
	});

	// register component
	FormControl.register = function (types, render, component) {
	  var valueType = arguments[3] === undefined ? 'string' : arguments[3];

	  if (typeof types === 'string') {
	    types = [types];
	  }
	  types.forEach(function (type) {
	    controls[type] = { render: render, component: component, valueType: valueType };
	  });
	};

	module.exports = FormControl;

/***/ },
/* 115 */
/***/ function(module, exports) {

	'use strict';

	var uid = ['A', '0', '0', '0'];

	function nextUid() {
	  var index = uid.length;
	  var digit;

	  while (index) {
	    index--;
	    digit = uid[index].charCodeAt(0);
	    if (digit === 57) {
	      uid[index] = 'A';
	      return uid.join('');
	    }
	    if (digit === 90) {
	      uid[index] = '0';
	    } else {
	      uid[index] = String.fromCharCode(digit + 1);
	      return uid.join('');
	    }
	  }
	  uid.unshift('0');
	  return uid.join('');
	}

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

	module.exports = { format: format, nextUid: nextUid, substitute: substitute, toArray: toArray };

/***/ },
/* 116 */
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
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var substitute = __webpack_require__(115).substitute;

	function isEmpty(obj) {

	  // null and undefined are "empty"
	  if (obj === null || obj === undefined) {
	    return true;
	  }

	  if (isNaN(obj)) {
	    return true;
	  }

	  if (obj.length !== undefined) {
	    return obj.length === 0;
	  }

	  if (typeof obj === 'object') {
	    return Object.keys(obj).length === 0;
	  }

	  return false

	  /*
	  switch (type(obj)) {
	    case 'nan':
	      return true
	    case 'array':
	    case 'string':
	    case 'arguments':
	      return obj.length === 0
	    case 'object':
	      return
	    default:
	      return false
	  }
	  */
	  ;
	}

	function forEach(obj, fn, context) {
	  Object.keys(obj).forEach(function (key) {
	    return fn.call(context, obj[key], key);
	  });
	}

	function toTextValue(arr) {
	  var textTpl = arguments[1] === undefined ? '{text}' : arguments[1];
	  var valueTpl = arguments[2] === undefined ? '{id}' : arguments[2];

	  arr = arr.map(function (s) {
	    if (typeof s !== 'object') {
	      return { $text: s, $value: s };
	    } else {
	      s.$text = substitute(textTpl, s);
	      s.$value = substitute(valueTpl, s);
	      return s;
	    }
	  });
	  return arr;
	}

	module.exports = { forEach: forEach, isEmpty: isEmpty, toTextValue: toTextValue };

/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Objects = __webpack_require__(117);
	var Strings = __webpack_require__(115);
	var Regs = __webpack_require__(119);

	var Lang = __webpack_require__(120);

	function getTip(key, value) {
	  var text = Lang.get('validation.tips.' + key, null);
	  if (text) {
	    text = Strings.format(text, value);
	  }
	  return text;
	}

	function getHint(hints, key, value) {
	  var text = Lang.get('validation.hints.' + key, null);
	  if (text) {
	    hints.push(Strings.format(text, value));
	  }
	}

	module.exports = {
	  componentWillMount: function componentWillMount() {
	    this.$setHint(this.props);
	  },

	  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	    this.$setHint(nextProps);
	  },

	  $setHint: function $setHint(props) {
	    if (props.tip) {
	      this.setState({ hintText: props.tip });
	      return;
	    }

	    var hints = [];

	    if (props.required) {
	      getHint(hints, 'required');
	    }
	    getHint(hints, this.props.type);
	    if (props.min) {
	      getHint(hints, 'min.' + this.state.valueType, props.min);
	    }
	    if (props.max) {
	      getHint(hints, 'max.' + this.state.valueType, props.max);
	    }

	    this.setState({ hintText: hints.join(', ') });
	  },

	  validate: function validate(value) {
	    value = value || this.getValue(null);

	    this.setState({ hasValue: !Objects.isEmpty(value) });

	    var _props = this.props;
	    var required = _props.required;
	    var min = _props.min;
	    var max = _props.max;
	    var readOnly = _props.readOnly;
	    var type = _props.type;

	    if (readOnly) {
	      return true;
	    }

	    // validate require
	    if (required && (value === undefined || value === null || value.length === 0)) {
	      this.$validateFail('required', value);
	      return false;
	    }

	    if (this.props.onValidate && !this.props.onValidate()) {
	      this.$validateFail('', value);
	      return false;
	    }

	    if (value === undefined || value === null || value === '') {
	      this.$validatePass();
	      return true;
	    }

	    // validate type
	    var reg = Regs[type];
	    if (reg && !reg.test(value)) {
	      this.$validateFail(type, value);
	      return false;
	    }

	    var len = 0;
	    var valueType = this.state.valueType;

	    switch (valueType) {
	      case 'array':
	        len = Strings.toArray(value, this.props.sep).length;
	        break;
	      case 'number':
	        len = parseFloat(value);
	        break;
	      default:
	        len = value.length;
	        break;
	    }

	    if (max && len > max) {
	      this.$validateFail('max.' + valueType, max);
	      return false;
	    }

	    if (min && len < min) {
	      this.$validateFail('min.' + valueType, min);
	      return false;
	    }

	    this.$validatePass();
	    return true;
	  },

	  $validatePass: function $validatePass() {
	    this.setState({ hasError: false, errorText: '' });
	  },

	  $validateFail: function $validateFail(type, value) {
	    var text = getTip(type, value) || this.props.tip;
	    this.setState({ hasError: true, errorText: text });
	  }
	};

/***/ },
/* 119 */
/***/ function(module, exports) {

	'use strict';

	module.exports = {
	  'email': /^[a-z0-9!#$%&'*+/=?^_`{|}~.-]+@[a-z0-9-]+(\.[a-z0-9-]+)*$/i,
	  'url': /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/,
	  'number': /^\s*(\-|\+)?(\d+|(\d*(\.\d*)))\s*$/,
	  //'date': /^(\d{4})-(\d{2})-(\d{2})$/,
	  'alpha': /^[a-z ._-]+$/i,
	  'alphanum': /^[a-z0-9_]+$/i,
	  'password': /^[\x00-\xff]+$/,
	  'integer': /^[-+]?[0-9]+$/,
	  'tel': /^[\d\s ().-]+$/,
	  'hex': /^#[0-9a-f]{6}?$/i,
	  'rgb': new RegExp('^rgb\\(\\s*(0|[1-9]\\d?|1\\d\\d?|2[0-4]\\d|25[0-5])\\s*,\\s*(0|[1-9]\\d?|1\\d\\d?|2[0-4]\\d|25[0-5])\\s*,\\s*(0|[1-9]\\d?|1\\d\\d?|2[0-4]\\d|25[0-5])\\s*\\)$'),
	  'rgba': new RegExp('^rgba\\(\\s*(0|[1-9]\\d?|1\\d\\d?|2[0-4]\\d|25[0-5])\\s*,\\s*(0|[1-9]\\d?|1\\d\\d?|2[0-4]\\d|25[0-5])\\s*,\\s*(0|[1-9]\\d?|1\\d\\d?|2[0-4]\\d|25[0-5])\\s*,\\s*((0.[1-9]*)|[01])\\s*\\)$'),
	  'hsv': new RegExp('^hsv\\(\\s*(0|[1-9]\\d?|[12]\\d\\d|3[0-5]\\d)\\s*,\\s*((0|[1-9]\\d?|100)%)\\s*,\\s*((0|[1-9]\\d?|100)%)\\s*\\)$')
	};

/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var merge = __webpack_require__(116);
	//let clone = require('../utils/clone')
	var lang = {};

	module.exports = {
	  set: function set() {
	    var args = [].slice.call(arguments);
	    args.forEach(function (arg) {
	      if (typeof arg === 'object') {
	        lang = merge(lang, arg);
	      }
	    });
	  },

	  get: function get(path, def) {
	    var result = lang;

	    if (path === undefined) {
	      return result;
	    }

	    if (!path || typeof path !== 'string') {
	      return undefined;
	    }

	    var paths = path.split('.');

	    for (var i = 0, count = paths.length; i < count; i++) {
	      result = result[paths[i]];
	      if (result === undefined) {
	        if (def !== undefined) {
	          return def;
	        } else {
	          console.warn(path + ' not found...');
	          return undefined;
	        }
	      }
	    }

	    return result;
	  }
	};

/***/ },
/* 121 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(110);

	var React = __webpack_require__(100);
	var Checkbox = __webpack_require__(109);
	var Strings = __webpack_require__(115);
	var Classable = __webpack_require__(122);
	var Objects = __webpack_require__(117);
	var Resource = __webpack_require__(127);
	var ReceiveValue = __webpack_require__(129);

	var CheckboxGroup = React.createClass({
	  displayName: 'CheckboxGroup',

	  propTypes: {
	    cache: React.PropTypes.bool,
	    data: React.PropTypes.array,
	    inline: React.PropTypes.bool,
	    onChange: React.PropTypes.func,
	    readOnly: React.PropTypes.bool,
	    sep: React.PropTypes.string,
	    src: React.PropTypes.string,
	    textTpl: React.PropTypes.string,
	    value: React.PropTypes.any,
	    valueTpl: React.PropTypes.string
	  },

	  mixins: [Classable, ReceiveValue, Resource],

	  getDefaultProps: function getDefaultProps() {
	    return {
	      sep: ',',
	      textTpl: '{text}',
	      valueTpl: '{id}'
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
	    data = Objects.toTextValue(data, this.props.textTpl, this.props.valueTpl);
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
	      this.props.onChange(this.props.sep ? values.join(this.props.sep) : values);
	    }

	    this.setState({ value: values });
	  },

	  getValue: function getValue(sep) {
	    var value = this.state.value;
	    if (sep === undefined) {
	      sep = this.props.sep;
	    }
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
	      var value = _this.props.sep ? item.$value.toString() : item.$value;
	      var checked = values.indexOf(value) >= 0;
	      return React.createElement(Checkbox, { key: i,
	        index: i,
	        readOnly: _this.props.readOnly,
	        checked: checked,
	        onChange: _this.handleChange,
	        text: item.$text,
	        value: item.$value
	      });
	    });

	    return React.createElement(
	      'div',
	      { className: className },
	      this.state.msg || items
	    );
	  }
	});

	module.exports = CheckboxGroup;

	__webpack_require__(114).register('checkbox-group', function (props) {
	  return React.createElement(CheckboxGroup, props);
	}, CheckboxGroup, 'array');

/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

	__webpack_require__(123);

	var React = __webpack_require__(100);
	var classnames = __webpack_require__(104);

	module.exports = {

	  propTypes: {
	    className: React.PropTypes.string,
	    responsive: React.PropTypes.string,
	    width: React.PropTypes.number
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      responsive: 'md'
	    };
	  },

	  getClasses: function getClasses() {
	    var args = Array.prototype.slice.call(arguments);
	    if (this.props.className) {
	      args.push(this.props.className);
	    }

	    var width = parseInt(this.props.width);
	    if (width && width <= 24) {
	      var resp = this.props.responsive;
	      if (resp) {
	        args.push('pure-u-1 pure-u-' + resp + '-' + width + '-24');
	      } else {
	        args.push('pure-u-' + width + '-24');
	      }
	    }

	    return classnames.apply(undefined, _toConsumableArray(args));
	  }
	};

/***/ },
/* 123 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 124 */,
/* 125 */,
/* 126 */,
/* 127 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Qwest = __webpack_require__(128);
	var Lang = __webpack_require__(120);

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
	    var _this = this;

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
	      Qwest.get(props.src, null, { cache: cache }).then(function (res) {
	        var data = res.status === 1 ? res.data : res instanceof Array ? res : undefined;

	        if (!data) {
	          var msg = res.msg ? res.msg : Lang.get('request.failure');
	          _this.setState({ msg: msg });
	          return;
	        } else {
	          _this.setState({ msg: null });
	        }

	        // initialize data
	        if (_this.initData) {
	          _this.initData(data);
	        } else {
	          _this.setState({ data: data });
	        }
	      })['catch'](function () {
	        _this.setState({ msg: Lang.get('request.failure') });
	      });
	    }
	  }
	};

/***/ },
/* 128 */
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
/* 129 */
/***/ function(module, exports) {

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
/* 130 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	// year,month,day 没有单独写成component，因为我认为那样性能可能存在问题，只是猜测，没有证实，有空的时候测试一下
	// 所以用了很多匿名函数

	__webpack_require__(131);
	__webpack_require__(134);

	var React = __webpack_require__(100);
	var classnames = __webpack_require__(104);
	var DOM = __webpack_require__(137);
	var datetime = __webpack_require__(138);
	var circle = __webpack_require__(139);
	var lang = __webpack_require__(120);

	var Classable = __webpack_require__(122);
	var ClickAwayable = __webpack_require__(140);

	var poslist = circle.getPostions(12, 50, -90);

	var Datetime = React.createClass({
	  displayName: 'Datetime',

	  propTypes: {
	    dateOnly: React.PropTypes.bool,
	    format: React.PropTypes.string,
	    onChange: React.PropTypes.func,
	    placeholder: React.PropTypes.string,
	    readOnly: React.PropTypes.bool,
	    timeOnly: React.PropTypes.bool,
	    unixtime: React.PropTypes.bool,
	    value: React.PropTypes.any
	  },

	  mixins: [Classable, ClickAwayable],

	  getInitialState: function getInitialState() {
	    return {
	      active: false,
	      popup: false,
	      //format: this.props.format,
	      stage: this.props.timeOnly ? 'clock' : 'day',
	      current: datetime.convert(this.props.value, new Date()),
	      value: datetime.convert(this.props.value, null)
	    };
	  },

	  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	    if (nextProps.value !== this.props.value) {
	      this.setState({ value: datetime.convert(nextProps.value) });
	    }
	  },

	  componentWillUpdate: function componentWillUpdate(nextProps, nextState) {
	    if (nextState.active) {
	      this.bindClickAway();
	    } else {
	      this.unbindClickAway();
	    }
	  },

	  componentClickAway: function componentClickAway() {
	    this.close();
	  },

	  getValue: function getValue() {
	    var value = this.value || this.state.value;
	    if (!value) {
	      return null;
	    }

	    // if dateOnly, remove time
	    if (this.props.dateOnly) {
	      value = new Date(value.getFullYear(), value.getMonth(), value.getDate());
	    }

	    if (this.props.unixtime) {
	      // cut milliseconds
	      return Math.ceil(value.getTime() / 1000);
	    } else {
	      return this.formatValue(value);
	    }
	  },

	  setValue: function setValue(value) {
	    value = datetime.convert(value);
	    this.setState({ value: value });
	  },

	  formatValue: function formatValue(value) {
	    if (this.props.format) {
	      return datetime.format(value, this.props.format);
	    }

	    var format = datetime.getDatetime;
	    if (this.props.dateOnly) {
	      format = datetime.getDate;
	    } else if (this.props.timeOnly) {
	      format = datetime.getTime;
	    }
	    return format(value);
	  },

	  open: function open() {
	    var _this = this;

	    if (this.props.readOnly) {
	      return;
	    }

	    var today = new Date();
	    // remove time
	    today = new Date(today.getFullYear(), today.getMonth(), today.getDate());

	    if (!this.state.active) {
	      (function () {
	        var picker = React.findDOMNode(_this.refs.datepicker);
	        picker.style.display = 'block';
	        var height = DOM.getOuterHeight(picker);

	        setTimeout(function () {
	          _this.setState({
	            active: true,
	            popup: DOM.overView(React.findDOMNode(_this), height),
	            current: _this.state.value || today,
	            stage: _this.props.timeOnly ? 'clock' : 'day'
	          });

	          if (_this.props.timeOnly) {
	            _this.refs.clock.changeTimeStage('hour');
	          }
	        }, 0);
	      })();
	    }
	  },

	  close: function close() {
	    var _this2 = this;

	    this.setState({ active: false });
	    if (this.refs.clock) {
	      this.refs.clock.close();
	    }
	    setTimeout(function () {
	      if (_this2.state.active === false) {
	        React.findDOMNode(_this2.refs.datepicker).style.display = 'none';
	      }
	    }, 500);
	  },

	  changeDate: function changeDate(obj) {
	    var c = this.state.current,
	        year = obj.year === undefined ? c.getFullYear() : obj.year,
	        month = obj.month === undefined ? c.getMonth() : obj.month,
	        day = obj.day === undefined ? c.getDate() : obj.day,
	        hour = obj.hour === undefined ? c.getHours() : obj.hour,
	        minute = obj.minute === undefined ? c.getMinutes() : obj.minute,
	        second = obj.second === undefined ? c.getSeconds() : obj.second;

	    var d = new Date(year, month, day, hour, minute, second);
	    return d;
	  },

	  stateChange: function stateChange(state) {
	    var _this3 = this;

	    // setTimeout wait checkClickAway completed
	    setTimeout(function () {
	      _this3.setState(state);
	      if (_this3.props.onChange) {
	        _this3.props.onChange(_this3.getValue());
	      }
	    }, 0);
	  },

	  stageChange: function stageChange(stage) {
	    this.stateChange({ stage: stage });
	  },

	  yearChange: function yearChange(year) {
	    //let d = this.state.current
	    var d = this.changeDate({ year: year, day: 1 });
	    this.stateChange({ stage: 'month', current: d });
	  },

	  monthChange: function monthChange(month) {
	    //let d = this.state.current
	    var d = this.changeDate({ month: month, day: 1 });
	    this.stateChange({ stage: 'day', current: d });
	  },

	  dayChange: function dayChange(day) {
	    var d = this.changeDate({
	      year: day.getFullYear(),
	      month: day.getMonth(),
	      day: day.getDate()
	    });
	    this.stateChange({ value: d, current: d });
	  },

	  timeChange: function timeChange(time) {
	    var d = this.changeDate(time);
	    this.stateChange({ value: d, current: d });
	  },

	  getYears: function getYears() {
	    var year = this.state.current.getFullYear(),
	        years = [];
	    for (var i = year - 12, j = year + 12; i <= j; i++) {
	      years.push(i);
	    }

	    return years.map(function (y, i) {
	      return React.createElement(
	        'button',
	        { type: 'button', onClick: (function () {
	            this.yearChange(y);
	          }).bind(this), key: i, className: 'year' },
	        y
	      );
	    }, this);
	  },

	  getMonths: function getMonths() {
	    return lang.get('date.fullMonth').map(function (m, i) {
	      return React.createElement(
	        'button',
	        { type: 'button', onClick: (function () {
	            this.monthChange(i);
	          }).bind(this), key: i, className: 'month' },
	        m
	      );
	    }, this);
	  },

	  getDays: function getDays() {
	    var value = this.state.value,
	        current = this.state.current,
	        year = current.getFullYear(),
	        month = current.getMonth(),
	        first = new Date(year, month, 1),
	        end = new Date(year, month + 1, 0),
	        min = 1 - first.getDay(),
	        max = Math.ceil((end.getDate() - min + 1) / 7) * 7,
	        days = [];

	    for (var date = undefined, i = 0; i < max; i++) {
	      date = new Date(year, month, i + min);
	      days.push(date);
	    }

	    var isToday = value ? year === value.getFullYear() && month === value.getMonth() : false;

	    return days.map(function (d, i) {
	      var _this4 = this;

	      var className = classnames('day', {
	        gray: d.getMonth() !== month,
	        today: isToday && value.getDate() === d.getDate() && value.getMonth() === d.getMonth()
	      });
	      return React.createElement(
	        'button',
	        { type: 'button', onClick: function () {
	            _this4.dayChange(d);
	          }, key: i, className: className },
	        d.getDate()
	      );
	    }, this);
	  },

	  timeStageChange: function timeStageChange(type) {
	    this.refs.clock.changeTimeStage(type);
	  },

	  getTime: function getTime() {
	    var current = this.state.current;

	    return React.createElement(
	      'div',
	      { className: 'time-container' },
	      React.createElement(Clock, { current: current, timeOnly: this.props.timeOnly, onTimeChange: this.timeChange, ref: 'clock' }),
	      React.createElement(TimeSet, { onTimeChange: this.timeChange, onStageChange: this.timeStageChange, type: 'hour', value: current.getHours() }),
	      React.createElement(TimeSet, { onTimeChange: this.timeChange, onStageChange: this.timeStageChange, type: 'minute', value: current.getMinutes() }),
	      React.createElement(TimeSet, { onTimeChange: this.timeChange, onStageChange: this.timeStageChange, type: 'second', value: current.getSeconds() })
	    );
	  },

	  next: function next() {
	    var d = this.state.current;
	    switch (this.state.stage) {
	      case 'year':
	        d = this.changeDate({ year: d.getFullYear() + 25, day: 1 });
	        break;
	      case 'month':
	        d = this.changeDate({ year: d.getFullYear() + 1, day: 1 });
	        break;
	      case 'day':
	        d = this.changeDate({ month: d.getMonth() + 1, day: 1 });
	        break;
	    }
	    this.stateChange({ current: d });
	  },

	  pre: function pre() {
	    var d = this.state.current;
	    switch (this.state.stage) {
	      case 'year':
	        d = this.changeDate({ year: d.getFullYear() - 25, day: 1 });
	        break;
	      case 'month':
	        d = this.changeDate({ year: d.getFullYear() - 1, day: 1 });
	        break;
	      case 'day':
	        d = this.changeDate({ month: d.getMonth() - 1, day: 1 });
	        break;
	    }
	    this.stateChange({ current: d });
	  },

	  render: function render() {
	    var _this5 = this;

	    var className = this.getClasses('datetime form-control', {
	      'active': this.state.active && !this.props.readOnly,
	      'popup': this.state.popup,
	      'readonly': this.props.readOnly,
	      'short': this.props.dateOnly || this.props.timeOnly
	    });

	    var current = this.state.current,
	        stage = this.state.stage,
	        header = undefined,
	        inner = undefined,
	        text = this.state.value ? this.formatValue(this.state.value) : '';

	    var weeks = lang.get('date.weekday').map(function (w, i) {
	      return React.createElement(
	        'div',
	        { key: i, className: 'week' },
	        w
	      );
	    });

	    text = text ? React.createElement(
	      'span',
	      { className: 'date-text' },
	      text
	    ) : React.createElement(
	      'span',
	      { className: 'placeholder' },
	      this.props.placeholder,
	      ' '
	    );

	    switch (stage) {
	      case 'day':
	        inner = React.createElement(
	          'div',
	          { className: 'inner' },
	          weeks,
	          this.getDays()
	        );
	        break;
	      case 'month':
	        inner = React.createElement(
	          'div',
	          { className: 'inner' },
	          this.getMonths()
	        );
	        break;
	      case 'year':
	        inner = React.createElement(
	          'div',
	          { className: 'inner' },
	          this.getYears()
	        );
	        break;
	      case 'clock':
	        inner = React.createElement('div', { className: 'inner empty' });
	        break;
	    }

	    if (!this.props.timeOnly) {
	      header = React.createElement(
	        'div',
	        { className: 'date-picker-header' },
	        React.createElement(
	          'a',
	          { onClick: this.pre, className: 'pre' },
	          React.createElement('i', { className: 'icon arrow-left' })
	        ),
	        React.createElement(
	          'a',
	          { onClick: function () {
	              _this5.stageChange('year');
	            }, className: 'year' },
	          datetime.getFullYear(current)
	        ),
	        React.createElement(
	          'a',
	          { onClick: function () {
	              _this5.stageChange('month');
	            }, className: 'month' },
	          datetime.getFullMonth(current)
	        ),
	        React.createElement(
	          'a',
	          { onClick: this.next, className: 'next' },
	          React.createElement('i', { className: 'icon arrow-right' })
	        )
	      );
	    }

	    return React.createElement(
	      'div',
	      { onClick: this.open, className: className },
	      text,
	      React.createElement('i', { className: 'icon calendar' }),
	      React.createElement(
	        'div',
	        { ref: 'datepicker', className: 'date-picker' },
	        header,
	        inner,
	        (stage === 'day' || stage === 'clock') && !this.props.dateOnly && this.getTime()
	      ),
	      React.createElement('div', { className: 'overlay', onClick: this.close })
	    );
	  }
	});

	var Clock = React.createClass({
	  displayName: 'Datetime.Clock',

	  propTypes: {
	    active: React.PropTypes.bool,
	    current: React.PropTypes.instanceOf(Date),
	    onTimeChange: React.PropTypes.func,
	    stage: React.PropTypes.string,
	    timeOnly: React.PropTypes.bool
	  },

	  getInitialState: function getInitialState() {
	    return {
	      current: this.props.current,
	      stage: this.props.stage || 'clock',
	      active: this.props.active,
	      am: this.props.current.getHours() < 12
	    };
	  },

	  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	    if (nextProps.current !== this.props.current) {
	      this.setState({ current: nextProps.current, am: nextProps.current.getHours() < 12 });
	    }
	  },

	  changeTimeStage: function changeTimeStage(stage) {
	    this.setState({ stage: stage, active: true });
	  },

	  setValue: function setValue(value) {
	    var d = {};
	    d[this.state.stage] = value;
	    this.props.onTimeChange(d);
	  },

	  close: function close() {
	    if (!this.props.timeOnly) {
	      this.setState({ active: false });
	    }
	  },

	  getRotate: function getRotate(type) {
	    var current = this.state.current,
	        value = undefined,
	        max = type === 'hour' ? 12 : 60;

	    switch (type) {
	      case 'hour':
	        value = current.getHours() + current.getMinutes() / 60;
	        break;
	      case 'minute':
	        value = current.getMinutes() + current.getSeconds() / 60;
	        break;
	      case 'second':
	        value = current.getSeconds();
	        break;
	    }

	    value = value * 360 / max - 90;
	    return 'rotate(' + value + 'deg)';
	  },

	  getPointer: function getPointer() {
	    var stage = this.state.stage;

	    var pointer = function pointer(type, context) {
	      var rotate = context.getRotate(type);
	      return React.createElement('div', { style: { transform: rotate, WebkitTransform: rotate }, className: classnames(type, { active: stage === type }) });
	    };

	    return React.createElement(
	      'div',
	      { className: 'pointer' },
	      pointer('hour', this),
	      pointer('minute', this),
	      pointer('second', this)
	    );
	  },

	  render: function render() {
	    var _this7 = this;

	    var steps = [],

	    //current = this.state.current,
	    stage = this.state.stage,
	        step = stage === 'hour' || stage === 'clock' ? 1 : 5;

	    /*
	    switch (stage) {
	      case 'hour':
	        value = current.getHours()
	        break
	      case 'minute':
	        value = current.getMinutes()
	        break
	      case 'second':
	        value = current.getSeconds()
	        break
	    }
	    */

	    for (var i = 0, s = undefined; i < 12; i++) {
	      s = i * step;
	      if (!this.state.am && stage === 'hour') {
	        s += 12;
	      }
	      steps.push(s);
	    }

	    var sets = steps.map(function (s, i) {
	      var _this6 = this;

	      var pos = poslist[i],
	          left = pos[0] + '%',
	          top = pos[1] + '%';
	      return React.createElement(
	        'div',
	        { onClick: function () {
	            _this6.setValue(s);
	          }, className: classnames('clock-set'), key: i, style: { left: left, top: top } },
	        s
	      );
	    }, this);

	    var className = classnames('clock-wrapper', { active: this.state.active });

	    return React.createElement(
	      'div',
	      { className: className },
	      React.createElement('div', { onClick: this.close, className: 'clock-overlay' }),
	      !this.props.timeOnly && React.createElement(
	        'div',
	        { onClick: this.close, className: 'clock-close' },
	        React.createElement('i', { className: 'icon close' })
	      ),
	      React.createElement(
	        'div',
	        { className: 'clock' },
	        React.createElement(
	          'div',
	          { className: 'clock-inner' },
	          sets
	        ),
	        this.getPointer(),
	        stage === 'hour' && React.createElement(
	          'div',
	          null,
	          React.createElement(
	            'div',
	            { onClick: function () {
	                _this7.setState({ am: true });
	              }, className: classnames('time-am', { active: this.state.am }) },
	            'AM'
	          ),
	          React.createElement(
	            'div',
	            { onClick: function () {
	                _this7.setState({ am: false });
	              }, className: classnames('time-pm', { active: !this.state.am }) },
	            'PM'
	          )
	        )
	      )
	    );
	  }
	});

	var TimeSet = React.createClass({
	  displayName: 'Datetime/TimeSet',

	  propTypes: {
	    onStageChange: React.PropTypes.func,
	    onTimeChange: React.PropTypes.func,
	    type: React.PropTypes.string,
	    value: React.PropTypes.number
	  },

	  getInitialState: function getInitialState() {
	    return {
	      value: this.props.value || 0,
	      type: this.props.type
	    };
	  },

	  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	    if (nextProps.value !== this.props.value) {
	      this.setState({ value: nextProps.value });
	    }
	  },

	  add: function add() {
	    var value = this.state.value,
	        max = this.props.type === 'hour' ? 24 : 60;
	    value += 1;
	    if (value >= max) {
	      value = 0;
	    }
	    this.changeTime(value);
	  },

	  sub: function sub() {
	    var value = this.state.value,
	        max = this.props.type === 'hour' ? 23 : 59;
	    value -= 1;
	    if (value < 0) {
	      value = max;
	    }
	    this.changeTime(value);
	  },

	  changeTime: function changeTime(value) {
	    this.setState({ value: value });
	    var d = {};
	    d[this.props.type] = value;
	    this.props.onTimeChange(d);
	  },

	  setValue: function setValue(value) {
	    this.setState({ value: value });
	  },

	  changeStage: function changeStage() {
	    this.props.onStageChange(this.props.type);
	  },

	  render: function render() {
	    return React.createElement(
	      'div',
	      { onClick: this.changeStage, className: 'time-set' },
	      React.createElement(
	        'div',
	        { className: 'text' },
	        React.createElement(
	          'span',
	          null,
	          this.state.value
	        ),
	        React.createElement(
	          'a',
	          { onClick: this.add, className: 'add' },
	          React.createElement('i', { className: 'icon angle-up' })
	        ),
	        React.createElement(
	          'a',
	          { onClick: this.sub, className: 'sub' },
	          React.createElement('i', { className: 'icon angle-down' })
	        )
	      )
	    );
	  }
	});

	module.exports = Datetime;

	__webpack_require__(114).register('datetime', function (props) {
	  return React.createElement(Datetime, props);
	});

	__webpack_require__(114).register('date', function (props) {
	  return React.createElement(Datetime, _extends({}, props, { dateOnly: true }));
	});

	__webpack_require__(114).register('time', function (props) {
	  return React.createElement(Datetime, _extends({}, props, { timeOnly: true }));
	}, Datetime);

/***/ },
/* 131 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 132 */,
/* 133 */,
/* 134 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 135 */,
/* 136 */,
/* 137 */
/***/ function(module, exports) {

	'use strict';

	function tryParseInt(p) {
	  if (!p) {
	    return 0;
	  }
	  var pi = parseInt(p);
	  return pi || 0;
	}

	module.exports = {

	  isDescendant: function isDescendant(parent, child) {
	    var node = child.parentNode;

	    while (node !== null) {
	      if (node === parent) {
	        return true;
	      }
	      node = node.parentNode;
	    }

	    return false;
	  },

	  offset: function offset(el) {
	    var rect = el.getBoundingClientRect();
	    return {
	      top: rect.top + document.body.scrollTop,
	      left: rect.left + document.body.scrollLeft
	    };
	  },

	  addClass: function addClass(el, className) {
	    if (el.classList) {
	      el.classList.add(className);
	    } else {
	      el.className += ' ' + className;
	    }
	  },

	  removeClass: function removeClass(el, className) {
	    if (el.classList) {
	      el.classList.remove(className);
	    } else {
	      el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
	    }
	  },

	  hasClass: function hasClass(el, className) {
	    if (el.classList) {
	      return el.classList.contains(className);
	    } else {
	      return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
	    }
	  },

	  toggleClass: function toggleClass(el, className) {
	    if (this.hasClass(el, className)) {
	      this.removeClass(el, className);
	    } else {
	      this.addClass(el, className);
	    }
	  },

	  forceRedraw: function forceRedraw(el) {
	    var originalDisplay = el.style.display;

	    el.style.display = 'none';
	    var oh = el.offsetHeight;
	    el.style.display = originalDisplay;
	    return oh;
	  },

	  withoutTransition: function withoutTransition(el, callback) {
	    //turn off transition
	    el.style.transition = 'none';

	    callback();

	    //force a redraw
	    this.forceRedraw(el);

	    //put the transition back
	    el.style.transition = '';
	  },

	  getOuterHeight: function getOuterHeight(el) {
	    var height = el.clientHeight + tryParseInt(el.style.borderTopWidth) + tryParseInt(el.style.borderBottomWidth) + tryParseInt(el.style.marginTop) + tryParseInt(el.style.marginBottom);
	    return height;
	  },

	  getScrollTop: function getScrollTop() {
	    var scrollTop = 0;
	    if (document.documentElement && document.documentElement.scrollTop) {
	      scrollTop = document.documentElement.scrollTop;
	    } else if (document.body) {
	      scrollTop = document.body.scrollTop;
	    }
	    return scrollTop;
	  },

	  overView: function overView(el) {
	    var offset = arguments[1] === undefined ? 0 : arguments[1];

	    var height = window.innerHeight || document.documentElement.clientHeight;
	    var bottom = el.getBoundingClientRect().bottom + offset;
	    return bottom > height;
	  }

	};

/***/ },
/* 138 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// can't remeber where get this code...

	var lang = __webpack_require__(120);

	var datetime = {

	  addDays: function addDays(d, days) {
	    var newDate = this.clone(d);
	    newDate.setDate(d.getDate() + days);
	    return newDate;
	  },

	  addMonths: function addMonths(d, months) {
	    var newDate = this.clone(d);
	    newDate.setMonth(d.getMonth() + months);
	    return newDate;
	  },

	  clone: function clone(d) {
	    return new Date(d.getTime());
	  },

	  getDaysInMonth: function getDaysInMonth(d) {
	    var resultDate = this.getFirstDayOfMonth(d);

	    resultDate.setMonth(resultDate.getMonth() + 1);
	    resultDate.setDate(resultDate.getDate() - 1);

	    return resultDate.getDate();
	  },

	  getFirstDayOfMonth: function getFirstDayOfMonth(d) {
	    return new Date(d.getFullYear(), d.getMonth(), 1);
	  },

	  getFullMonth: function getFullMonth(d) {
	    var month = d.getMonth();
	    return lang.get('date.fullMonth')[month];
	  },

	  getShortMonth: function getShortMonth(d) {
	    var month = d.getMonth();
	    return lang.get('date.shortMonth')[month];
	  },

	  getDayOfWeek: function getDayOfWeek(d) {
	    var weekday = d.getDay();
	    return lang.get('date.weekday')[weekday];
	  },

	  getWeekArray: function getWeekArray(d) {
	    var dayArray = [];
	    var daysInMonth = this.getDaysInMonth(d);
	    var daysInWeek = undefined;
	    var emptyDays = undefined;
	    var firstDayOfWeek = undefined;
	    var week = undefined;
	    var weekArray = [];

	    for (var i = 1; i <= daysInMonth; i++) {
	      dayArray.push(new Date(d.getFullYear(), d.getMonth(), i));
	    }

	    while (dayArray.length) {
	      firstDayOfWeek = dayArray[0].getDay();
	      daysInWeek = 7 - firstDayOfWeek;
	      emptyDays = 7 - daysInWeek;
	      week = dayArray.splice(0, daysInWeek);

	      for (var j = 0; j < emptyDays; j++) {
	        week.unshift(null);
	      }

	      weekArray.push(week);
	    }

	    return weekArray;
	  },

	  isEqualDate: function isEqualDate(d1, d2) {
	    return d1 && d2 && d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();
	  },

	  isEqual: function isEqual(d1, d2) {
	    if (!d1 || !d2 || !(d1 instanceof Date) || !(d2 instanceof Date)) {
	      return false;
	    }

	    return d1.getTime() === d2.getTime();
	  },

	  monthDiff: function monthDiff(d1, d2) {
	    var m = undefined;
	    m = (d1.getFullYear() - d2.getFullYear()) * 12;
	    m += d1.getMonth();
	    m -= d2.getMonth();
	    return m;
	  },

	  format: function format(date, fmt) {
	    if (!date) {
	      return '';
	    }
	    if (!(date instanceof Date)) {
	      date = new Date(date);
	    }
	    var o = {
	      'M+': date.getMonth() + 1,
	      'd+': date.getDate(),
	      'h+': date.getHours(),
	      'm+': date.getMinutes(),
	      's+': date.getSeconds(),
	      'q+': Math.floor((date.getMonth() + 3) / 3),
	      'S': date.getMilliseconds()
	    };
	    if (/(y+)/.test(fmt)) {
	      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
	    }
	    for (var k in o) {
	      if (new RegExp('(' + k + ')').test(fmt)) {
	        fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
	      }
	    }
	    return fmt;
	  },

	  getDatetime: function getDatetime(d) {
	    return datetime.format(d, lang.get('date.format.datetime'));
	  },

	  getDate: function getDate(d) {
	    return datetime.format(d, lang.get('date.format.date'));
	  },

	  getFullYear: function getFullYear(d) {
	    return datetime.format(d, lang.get('date.format.year'));
	  },

	  getTime: function getTime(d) {
	    return datetime.format(d, lang.get('date.format.time'));
	  },

	  // string, unixtimestamp convert to Date
	  convert: function convert(obj, def) {
	    if (def === undefined) {
	      def = new Date();
	    }

	    if (!obj) {
	      return def;
	    }

	    if (obj instanceof Date) {
	      return obj;
	    }

	    if (/^[-+]?[0-9]+$/.test(obj)) {
	      obj = parseInt(obj) * 1000;
	    } else {
	      obj = obj.replace(/-/g, '/');
	    }

	    try {
	      obj = new Date(obj);
	    } catch (e) {
	      obj = def;
	    }
	    return obj;
	  }

	};

	module.exports = datetime;

/***/ },
/* 139 */
/***/ function(module, exports) {

	"use strict";

	function getAngle(r, angle) {
	  var x0 = arguments[2] === undefined ? 0 : arguments[2];
	  var y0 = arguments[3] === undefined ? 0 : arguments[3];

	  var x1 = x0 + r * Math.cos(angle * Math.PI / 180);
	  var y1 = y0 + r * Math.sin(angle * Math.PI / 180);
	  return [x1.toFixed(2), y1.toFixed(2)];
	}

	function getPostions(count) {
	  var r = arguments[1] === undefined ? 50 : arguments[1];
	  var angle = arguments[2] === undefined ? 0 : arguments[2];
	  var x0 = arguments[3] === undefined ? r : arguments[3];
	  var y0 = arguments[4] === undefined ? r : arguments[4];
	  return (function () {
	    var pos = [];
	    var step = 360 / count;
	    for (var i = 0; i < count; i++) {
	      pos.push(getAngle(r, step * i + angle, x0, y0));
	    }
	    return pos;
	  })();
	}

	module.exports = {
	  getPostions: getPostions
	};

/***/ },
/* 140 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(100);
	var Events = __webpack_require__(141);
	var Dom = __webpack_require__(137);

	module.exports = {

	  //When the component mounts, listen to click events and check if we need to
	  //Call the componentClickAway function.
	  componentDidMount: function componentDidMount() {
	    if (this.autoBind) {
	      this.bindClickAway();
	    }
	  },

	  componentWillUnmount: function componentWillUnmount() {
	    if (this.autoBind) {
	      this.unbindClickAway();
	    }
	  },

	  checkClickAway: function checkClickAway(e) {
	    var el = React.findDOMNode(this);

	    // Check if the target is inside the current component
	    if (this.isMounted() && e.target !== el && !Dom.isDescendant(el, e.target)) {
	      if (this.componentClickAway) {
	        this.componentClickAway();
	      }
	    }
	  },

	  bindClickAway: function bindClickAway() {
	    Events.on(document, 'click', this.checkClickAway);
	  },

	  unbindClickAway: function unbindClickAway() {
	    Events.off(document, 'click', this.checkClickAway);
	  }

	};

/***/ },
/* 141 */
/***/ function(module, exports) {

	'use strict';

	module.exports = {

	  once: function once(el, type, callback) {
	    var typeArray = type.split(' ');
	    var recursiveFunction = function recursiveFunction(e) {
	      e.target.removeEventListener(e.type, recursiveFunction);
	      return callback(e);
	    };

	    for (var i = typeArray.length - 1; i >= 0; i--) {
	      this.on(el, typeArray[i], recursiveFunction);
	    }
	  },

	  // IE8+ Support
	  on: function on(el, type, callback) {
	    if (el.addEventListener) {
	      el.addEventListener(type, callback);
	    } else {
	      el.attachEvent('on' + type, function () {
	        callback.call(el);
	      });
	    }
	  },

	  // IE8+ Support
	  off: function off(el, type, callback) {
	    if (el.removeEventListener) {
	      el.removeEventListener(type, callback);
	    } else {
	      el.detachEvent('on' + type, callback);
	    }
	  }
	};

/***/ },
/* 142 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(100);
	var Classable = __webpack_require__(122);
	var prefix = 'icon';

	var Icon = React.createClass({
	  displayName: 'Icon',

	  propTypes: {
	    icon: React.PropTypes.string,
	    size: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
	    spin: React.PropTypes.bool,
	    style: React.PropTypes.object
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
	    var classes = ['' + prefix];

	    if (this.state.spin) {
	      classes.push(prefix + '-spin');
	    }

	    if (this.props.icon) {
	      classes.push(prefix + '-' + this.props.icon);
	    }

	    var size = this.props.size;
	    if (size) {
	      if (typeof size === 'number' || size.length === 1) {
	        size = size + 'x';
	      }
	      classes.push(prefix + '-' + size);
	    }

	    return React.createElement('i', { style: this.props.style, className: this.getClasses.apply(this, classes) });
	  }
	});

	Icon.setPrefix = function (pre) {
	  prefix = pre;
	};

	module.exports = Icon;

/***/ },
/* 143 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	__webpack_require__(144);

	var React = __webpack_require__(100);
	var Classable = __webpack_require__(122);
	var ReceiveValue = __webpack_require__(129);

	var Input = React.createClass({
	  displayName: 'Input',

	  propTypes: {
	    id: React.PropTypes.string,
	    onBlur: React.PropTypes.func,
	    onChange: React.PropTypes.func,
	    onFocus: React.PropTypes.func,
	    placeholder: React.PropTypes.string,
	    readOnly: React.PropTypes.bool,
	    rows: React.PropTypes.number,
	    style: React.PropTypes.object,
	    type: React.PropTypes.string,
	    value: React.PropTypes.any
	  },

	  mixins: [Classable, ReceiveValue],

	  handleChange: function handleChange(event) {
	    if (this.props.readOnly) {
	      return;
	    }

	    var value = event.target.value;
	    this.setState({ value: value });
	    if (this.props.onChange) {
	      this.props.onChange(value);
	    }
	  },

	  getValue: function getValue() {
	    return React.findDOMNode(this).value;
	  },

	  render: function render() {
	    var type = this.props.type === 'password' ? 'password' : 'text';
	    var props = {
	      className: this.getClasses('form-control'),
	      onChange: this.handleChange,
	      type: type,
	      value: this.state.value
	    };

	    if (this.props.type === 'textarea') {
	      return React.createElement('textarea', _extends({}, this.props, props, { rows: this.props.rows }));
	    } else {
	      return React.createElement('input', _extends({}, this.props, props));
	    }
	  }
	});

	module.exports = Input;

	__webpack_require__(114).register(['text', 'email', 'alpha', 'alphanum', 'password', 'url', 'textarea'], function (props) {
	  return React.createElement(Input, props);
	}, Input);

	__webpack_require__(114).register(['integer', 'number'], function (props) {
	  return React.createElement(Input, props);
	}, Input, 'number');

/***/ },
/* 144 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 145 */,
/* 146 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(110);
	var React = __webpack_require__(100);
	var Classable = __webpack_require__(122);
	var Objects = __webpack_require__(117);
	var Resource = __webpack_require__(127);
	var ReceiveValue = __webpack_require__(129);
	var Radio = __webpack_require__(147);

	var RadioGroup = React.createClass({
	  displayName: 'RadioGroup',

	  propTypes: {
	    cache: React.PropTypes.bool,
	    data: React.PropTypes.array,
	    inline: React.PropTypes.bool,
	    onChange: React.PropTypes.func,
	    readOnly: React.PropTypes.bool,
	    src: React.PropTypes.string,
	    style: React.PropTypes.object,
	    textTpl: React.PropTypes.string,
	    value: React.PropTypes.any,
	    valueTpl: React.PropTypes.string
	  },

	  mixins: [Classable, Resource, ReceiveValue],

	  getDefaultProps: function getDefaultProps() {
	    return {
	      textTpl: '{text}',
	      valueTpl: '{id}'
	    };
	  },

	  getInitialState: function getInitialState() {
	    return {
	      data: []
	    };
	  },

	  initData: function initData(data) {
	    data = Objects.toTextValue(data, this.props.textTpl, this.props.valueTpl);
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
	      return React.createElement(Radio, { key: i,
	        onClick: this.handleChange,
	        readOnly: this.props.readOnly,
	        checked: this.state.value === item.$value,
	        text: item.$text,
	        value: item.$value
	      });
	    }, this);

	    return React.createElement(
	      'div',
	      { style: this.props.style, className: className },
	      items
	    );
	  }
	});

	module.exports = RadioGroup;

	__webpack_require__(114).register('radio-group', function (props) {
	  return React.createElement(RadioGroup, props);
	}, RadioGroup);

/***/ },
/* 147 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(110);
	var React = __webpack_require__(100);

	module.exports = React.createClass({
	  displayName: 'Radio',

	  propTypes: {
	    checked: React.PropTypes.bool,
	    index: React.PropTypes.number,
	    onClick: React.PropTypes.func,
	    readOnly: React.PropTypes.bool,
	    text: React.PropTypes.any,
	    value: React.PropTypes.any
	  },

	  handleClick: function handleClick() {
	    if (this.props.onClick) {
	      this.props.onClick(this.props.value, this.props.index);
	    }
	  },

	  render: function render() {
	    return React.createElement(
	      'label',
	      { className: 'pure-radio rui-radio' },
	      React.createElement('input', { ref: 'input',
	        type: 'radio',
	        disabled: this.props.readOnly,
	        onChange: function () {},
	        onClick: this.handleClick,
	        checked: this.props.checked,
	        value: this.props.value
	      }),
	      this.props.text
	    );
	  }
	});

/***/ },
/* 148 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(149);

	var React = __webpack_require__(100);
	var classnames = __webpack_require__(104);
	var Classable = __webpack_require__(122);
	var ReceiveValue = __webpack_require__(129);

	var themes = {};

	var Rating = React.createClass({
	  displayName: 'Rating',

	  propTypes: {
	    icons: React.PropTypes.array,
	    maxValue: React.PropTypes.number,
	    onChange: React.PropTypes.func,
	    readOnly: React.PropTypes.bool,
	    size: React.PropTypes.number,
	    style: React.PropTypes.object,
	    theme: React.PropTypes.string,
	    value: React.PropTypes.number
	  },

	  mixins: [Classable, ReceiveValue],

	  getDefaultProps: function getDefaultProps() {
	    return {
	      maxValue: 5
	    };
	  },

	  getInitialState: function getInitialState() {
	    return {
	      hover: 0,
	      wink: false
	    };
	  },

	  handleHover: function handleHover(value) {
	    return (function () {
	      this.setState({ hover: value });
	    }).bind(this);
	  },

	  handleLeave: function handleLeave() {
	    this.setState({ hover: 0 });
	  },

	  getValue: function getValue() {
	    return this.state.value;
	  },

	  getIcon: function getIcon() {
	    var pos = arguments[0] === undefined ? 0 : arguments[0];

	    var icons = this.props.icons;
	    if (!icons) {
	      var theme = this.props.theme || Object.keys(themes)[0];
	      icons = themes[theme];
	    }
	    if (!icons) {
	      console.warn('icons or theme not exist');
	      return null;
	    }

	    return icons[pos];
	  },

	  getBackground: function getBackground() {
	    var items = [],
	        icon = this.getIcon(0);
	    for (var i = 0; i < this.props.maxValue; i++) {
	      items.push(React.addons.cloneWithProps(icon, { key: i }));
	    }

	    return React.createElement(
	      'div',
	      { className: 'rating-bg' },
	      items
	    );
	  },

	  handleChange: function handleChange(val) {
	    var _this = this;

	    this.setValue(val);
	    this.setState({ wink: true });
	    setTimeout(function () {
	      _this.setState({ wink: false });
	    }, 1000);
	    setTimeout(function () {
	      if (_this.props.onChange) {
	        _this.props.onChange(val);
	      }
	    });
	  },

	  getHandle: function getHandle() {
	    var items = [],
	        icon = this.getIcon(1),
	        hover = this.state.hover,
	        wink = this.state.wink,
	        value = hover > 0 ? hover : this.state.value;

	    for (var i = 0, active = undefined; i < this.props.maxValue; i++) {
	      active = value > i;
	      items.push(React.createElement(
	        'span',
	        { key: i,
	          onMouseOver: this.handleHover(i + 1),
	          onClick: this.handleChange.bind(this, i + 1),
	          className: classnames('handle', { 'active': active, 'wink': active && wink }) },
	        React.addons.cloneWithProps(icon)
	      ));
	    }

	    return React.createElement(
	      'div',
	      { onMouseOut: this.handleLeave, className: 'rating-front' },
	      items
	    );
	  },

	  getMute: function getMute() {
	    var items = [],
	        icon = this.getIcon(1),
	        width = this.state.value / this.props.maxValue * 100 + '%';

	    for (var i = 0; i < this.props.maxValue; i++) {
	      items.push(React.addons.cloneWithProps(icon, { key: i }));
	    }

	    return React.createElement(
	      'div',
	      { style: { width: width }, className: 'rating-front' },
	      React.createElement(
	        'div',
	        { className: 'rating-inner' },
	        items
	      )
	    );
	  },

	  render: function render() {
	    var className = this.getClasses('rating');
	    return React.createElement(
	      'div',
	      { style: this.props.style, className: className },
	      this.getBackground(),
	      this.props.readOnly ? this.getMute() : this.getHandle()
	    );
	  }
	});

	Rating.register = function (key, icons) {
	  themes[key] = icons;
	};

	module.exports = Rating;

	__webpack_require__(114).register('rating', function (props) {
	  return React.createElement(Rating, props);
	}, Rating);

	// "star": [Icon, Icon],
	// "heart": [img, img]

/***/ },
/* 149 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 150 */,
/* 151 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(131);
	__webpack_require__(152);

	var React = __webpack_require__(100);
	var classnames = __webpack_require__(104);
	var Strings = __webpack_require__(115);
	var DOM = __webpack_require__(137);
	var Classable = __webpack_require__(122);
	var Resource = __webpack_require__(127);
	var ReceiveValue = __webpack_require__(129);
	var ClickAwayable = __webpack_require__(140);

	var Select = React.createClass({
	  displayName: 'Select',

	  propTypes: {
	    cache: React.PropTypes.bool,
	    data: React.PropTypes.array,
	    filterAble: React.PropTypes.bool,
	    groupBy: React.PropTypes.string,
	    mult: React.PropTypes.bool,
	    onChange: React.PropTypes.func,
	    optionTpl: React.PropTypes.string,
	    placeholder: React.PropTypes.string,
	    readOnly: React.PropTypes.bool,
	    resultTpl: React.PropTypes.string,
	    sep: React.PropTypes.string,
	    src: React.PropTypes.string,
	    value: React.PropTypes.any,
	    valueTpl: React.PropTypes.string
	  },

	  mixins: [Classable, ReceiveValue, Resource, ClickAwayable],

	  getDefaultProps: function getDefaultProps() {
	    return {
	      dropup: false,
	      sep: ',',
	      optionTpl: '{text}',
	      valueTpl: '{id}'
	    };
	  },

	  getInitialState: function getInitialState() {
	    return {
	      active: false,
	      data: [],
	      filter: ''
	    };
	  },

	  componentWillUpdate: function componentWillUpdate(nextProps, nextState) {
	    if (nextState.active) {
	      this.bindClickAway();
	    } else {
	      this.unbindClickAway();
	    }
	  },

	  componentClickAway: function componentClickAway() {
	    this.close();
	  },

	  open: function open() {
	    var _this = this;

	    if (!this.state.active && !this.props.readOnly) {
	      (function () {
	        var options = React.findDOMNode(_this.refs.options);
	        options.style.display = 'block';
	        var offset = DOM.getOuterHeight(options) + 5;

	        var el = React.findDOMNode(_this);
	        var dropup = DOM.overView(el, offset);

	        DOM.withoutTransition(el, function () {
	          _this.setState({ dropup: dropup });
	        });

	        setTimeout(function () {
	          _this.setState({ filter: '', active: true });
	        }, 0);
	      })();
	    }
	  },

	  close: function close() {
	    var _this2 = this;

	    this.setState({ active: false });
	    // use setTimeout instead of transitionEnd
	    setTimeout(function () {
	      if (_this2.state.active === false) {
	        React.findDOMNode(_this2.refs.options).style.display = 'none';
	      }
	    }, 500);
	  },

	  formatValue: function formatValue(value) {
	    value = Strings.toArray(value, this.props.sep);
	    if (this.state) {
	      //let data = clone(this.state.data).map(d => {
	      var data = this.state.data.map(function (d) {
	        d.$checked = value.indexOf(d.$value) >= 0;
	        return d;
	      });
	      this.setState({ data: data });
	    }
	    return value;
	  },

	  initData: function initData(data) {
	    var _this3 = this;

	    var value = this.state.value;
	    data = data.map(function (d) {
	      if (typeof d !== 'object') {
	        return {
	          $option: d,
	          $result: d,
	          $value: d,
	          $filter: d,
	          $checked: value.indexOf(d) >= 0
	        };
	      }

	      // speed filter
	      if (_this3.props.filterAble) {
	        d.$filter = Object.keys(d).map(function (k) {
	          return d[k];
	        }).join(',').toLowerCase();
	      }

	      var val = Strings.substitute(_this3.props.valueTpl, d);
	      d.$option = Strings.substitute(_this3.props.optionTpl, d);
	      d.$result = Strings.substitute(_this3.props.resultTpl || _this3.props.optionTpl, d);
	      d.$value = val;
	      d.$checked = value.indexOf(val) >= 0;
	      return d;
	    });

	    if (this.props.groupBy) {
	      (function () {
	        var groups = {},
	            groupBy = _this3.props.groupBy;
	        data.forEach(function (d) {
	          var key = d[groupBy];
	          if (!groups[key]) {
	            groups[key] = [];
	          }
	          groups[key].push(d);
	        });
	        data = [];
	        Object.keys(groups).forEach(function (k) {
	          data.push(k);
	          data = data.concat(groups[k]);
	        });
	      })();
	    }

	    this.setState({ data: data });
	  },

	  getValue: function getValue() {
	    var sep = arguments[0] === undefined ? this.props.sep : arguments[0];
	    var data = arguments[1] === undefined ? this.state.data : arguments[1];

	    var value = [];
	    data.forEach(function (d) {
	      if (d.$checked) {
	        value.push(d.$value);
	      }
	    });

	    if (sep) {
	      value = value.join(sep);
	    }

	    return value;
	  },

	  handleChange: function handleChange(i) {
	    var _this4 = this;

	    if (this.props.readOnly) {
	      return;
	    }

	    var data = this.state.data;
	    if (this.props.mult) {
	      data[i].$checked = !data[i].$checked;
	      this.setState({ data: data });
	    } else {
	      data.map(function (d) {
	        if (typeof d !== 'string') {
	          d.$checked = false;
	        }
	      });
	      data[i].$checked = true;
	      this.setState({ data: data });
	      this.close();
	    }
	    if (this.props.onChange) {
	      (function () {
	        var value = _this4.getValue(_this4.props.sep, data);
	        setTimeout(function () {
	          _this4.props.onChange(value);
	        }, 0);
	      })();
	    }
	  },

	  handleRemove: function handleRemove(i) {
	    var _this5 = this;

	    // wait checkClickAway completed
	    setTimeout(function () {
	      _this5.handleChange(i);
	    }, 0);
	  },

	  render: function render() {
	    var _this6 = this;

	    var active = this.state.active;
	    var result = [];

	    var className = this.getClasses('select form-control', {
	      active: active,
	      readonly: this.props.readOnly,
	      dropup: this.state.dropup,
	      single: !this.props.mult
	    });

	    var placeholder = this.state.msg || this.props.placeholder;

	    var filter = this.props.filterAble ? React.createElement(
	      'div',
	      { className: 'filter' },
	      React.createElement('i', { className: 'search' }),
	      React.createElement('input', { value: this.state.filter,
	        onChange: function (e) {
	          return _this6.setState({ filter: e.target.value });
	        },
	        type: 'text' })
	    ) : null;

	    var filterText = this.state.filter ? this.state.filter.toLowerCase() : null;

	    var options = this.state.data.map(function (d, i) {
	      if (typeof d === 'string') {
	        return React.createElement(
	          'span',
	          { key: i, className: 'show group' },
	          d
	        );
	      }

	      if (d.$checked) {
	        if (this.props.mult) {
	          result.push(React.createElement('div', { key: i, className: 'result',
	            onClick: this.handleRemove.bind(this, i),
	            dangerouslySetInnerHTML: { __html: d.$result }
	          }));
	        } else {
	          result.push(React.createElement('span', { key: i, dangerouslySetInnerHTML: { __html: d.$result } }));
	        }
	      }
	      var optionClassName = classnames({
	        active: d.$checked,
	        show: filterText ? d.$filter.indexOf(filterText) >= 0 : true
	      });
	      return React.createElement('li', { key: i,
	        onClick: this.handleChange.bind(this, i),
	        className: optionClassName,
	        dangerouslySetInnerHTML: { __html: d.$option }
	      });
	    }, this);

	    return React.createElement(
	      'div',
	      { onClick: this.open, className: className },
	      result.length > 0 ? result : React.createElement(
	        'span',
	        { className: 'placeholder' },
	        placeholder,
	        ' '
	      ),
	      React.createElement(
	        'div',
	        { className: 'options-wrap' },
	        React.createElement('hr', null),
	        React.createElement(
	          'div',
	          { ref: 'options', className: 'options' },
	          filter,
	          React.createElement(
	            'ul',
	            null,
	            options
	          )
	        )
	      )
	    );
	  }
	});

	module.exports = Select;

	__webpack_require__(114).register('select', function (props) {
	  return React.createElement(Select, props);
	}, Select, 'array');

/***/ },
/* 152 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 153 */,
/* 154 */,
/* 155 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 为了提高效率，直接操作了tree.state.data，
	// 由于tree.state.data是一个array，当data值改变时，不经过setState，
	// 所有的Item的data也因此改变，可能破坏了react的一个原则

	__webpack_require__(156);

	var React = __webpack_require__(100);
	var classnames = __webpack_require__(104);

	var Strings = __webpack_require__(115);
	var Objects = __webpack_require__(117);
	var Classable = __webpack_require__(122);
	var Resource = __webpack_require__(127);
	var ReceiveValue = __webpack_require__(129);

	var Tree = React.createClass({
	  displayName: 'Tree',

	  propTypes: {
	    checkAble: React.PropTypes.bool,
	    data: React.PropTypes.object,
	    greedy: React.PropTypes.bool,
	    onChange: React.PropTypes.func,
	    onClick: React.PropTypes.func,
	    open: React.PropTypes.bool,
	    readOnly: React.PropTypes.bool,
	    sep: React.PropTypes.string,
	    src: React.PropTypes.string,
	    textTpl: React.PropTypes.string,
	    value: React.PropTypes.any,
	    valueTpl: React.PropTypes.string
	  },

	  mixins: [Classable, Resource, ReceiveValue],

	  getDefaultProps: function getDefaultProps() {
	    return {
	      sep: ',',
	      textTpl: '{text}',
	      valueTpl: '{id}'
	    };
	  },

	  getInitialState: function getInitialState() {
	    return {
	      data: [],
	      inited: false
	    };
	  },

	  componentWillUpdate: function componentWillUpdate(nextProps, nextState) {
	    // initValue 和 initData 分开处理
	    if (nextState.value !== this.state.value) {
	      this.initValue(nextState.value);
	    }
	  },

	  formatValue: function formatValue(value) {
	    return Strings.toArray(value, this.props.sep);
	  },

	  initValue: function initValue(value) {
	    this.init(this.state.data, value);
	  },

	  initData: function initData(data) {
	    var tt = this.props.textTpl;
	    var vt = this.props.valueTpl;
	    var setTpl = function setTpl(arr) {
	      arr.forEach(function (d) {
	        d.$text = Strings.substitute(tt, d);
	        d.$value = Strings.substitute(vt, d);
	        if (d.children) {
	          setTpl(d.children);
	        }
	      });
	    };
	    setTpl(data);
	    this.init(data, this.state.value);
	  },

	  // 初始化数据，不在item里面判断，在元数据里加入deep和status，减少判断和item.setState次数
	  init: function init(data, values) {
	    var getStatus = function getStatus(d, last, deep) {
	      var val = d.$value,
	          status = undefined,
	          newDeep = undefined,
	          nextDeep = undefined;
	      if (deep === undefined) {
	        newDeep = [];
	        nextDeep = [last ? 0 : 1];
	      } else {
	        newDeep = deep.slice();
	        if (!d.children || d.children.length === 0) {
	          newDeep.push(last ? 2 : 1);
	        }
	        nextDeep = deep.slice();
	        nextDeep.push(last ? 0 : 1);
	      }
	      if (d.children && d.children.length > 0) {
	        (function () {
	          var count = d.children.length;
	          d.children.forEach(function (sub, i) {
	            var subStatus = getStatus(sub, i === count - 1, nextDeep);
	            if (status === undefined) {
	              status = subStatus;
	            } else if (status !== subStatus) {
	              status = 1;
	            }
	          });
	        })();
	      } else {
	        status = values.indexOf(val) >= 0 ? 2 : 0;
	      }
	      d.$status = status;
	      d.$deep = newDeep;
	      return status;
	    };
	    for (var i = 0, count = data.length; i < count; i++) {
	      getStatus(data[i], i === count - 1);
	    }
	    this.setState({ data: data });
	  },

	  isInitialed: function isInitialed() {
	    var data = this.state.data;
	    if (data.length === 0) {
	      return true;
	    }
	    return !!data[0].$deep;
	  },

	  toggleAll: function toggleAll(open) {
	    Objects.forEach(this.refs, function (ref) {
	      ref.toggleAll(open);
	    });
	  },

	  getValue: function getValue(sep) {
	    var list = [],
	        values = [],
	        greedy = this.props.greedy;
	    Objects.forEach(this.refs, function (ref) {
	      ref.getChecked(list, greedy);
	    });

	    list.forEach(function (d) {
	      values.push(d.$value);
	    });

	    if (sep === undefined) {
	      sep = this.props.sep;
	    }
	    if (sep) {
	      values = values.join(this.props.sep);
	    }
	    return values;
	  },

	  handleChange: function handleChange() {
	    if (this.props.onChange) {
	      //setTimeout(() => {
	      this.props.onChange(this.getValue());
	    }
	  },

	  onClick: function onClick(item) {
	    if (this.props.onClick) {
	      this.props.onClick(item);
	    }
	  },

	  render: function render() {
	    var value = this.state.value;
	    var _props = this.props;
	    var checkAble = _props.checkAble;
	    var readOnly = _props.readOnly;
	    var open = _props.open;

	    var items = this.state.data.map(function (item, i) {
	      return React.createElement(Item, { ref: i,
	        open: open,
	        readOnly: readOnly,
	        onClick: this.onClick,
	        onStatusChange: this.handleChange,
	        value: value,
	        checkAble: checkAble,
	        key: i,
	        data: item
	      });
	    }, this);

	    var className = this.getClasses('tree', {
	      readonly: this.props.readOnly
	    });

	    return React.createElement(
	      'ul',
	      { className: className },
	      items
	    );
	  }
	});

	var Item = React.createClass({
	  displayName: 'Tree/Item',

	  propTypes: {
	    checkAble: React.PropTypes.bool,
	    data: React.PropTypes.object,
	    onClick: React.PropTypes.func,
	    onStatusChange: React.PropTypes.func,
	    open: React.PropTypes.bool,
	    readOnly: React.PropTypes.bool,
	    value: React.PropTypes.any
	  },

	  getInitialState: function getInitialState() {
	    return {
	      open: this.props.open,
	      status: this.props.data.$status || 0
	    };
	  },

	  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	    if (nextProps.value !== this.props.value) {
	      this.setState({ status: this.props.data.$status });
	    }
	  },

	  toggle: function toggle() {
	    var open = !this.state.open;
	    this.setState({ open: open });
	  },

	  toggleAll: function toggleAll(open) {
	    this.setState({ open: open });
	    Objects.forEach(this.refs, function (ref) {
	      ref.toggleAll(open);
	    });
	  },

	  check: function check() {
	    if (this.props.readOnly) {
	      return;
	    }

	    var status = this.state.status;
	    status = status < 2 ? 2 : 0;
	    this.setStatus(status);

	    // setTimeout wait state changed
	    setTimeout((function () {
	      this.props.onStatusChange();
	    }).bind(this), 0);
	  },

	  setStatus: function setStatus(status) {
	    this.setState({ status: status });

	    Objects.forEach(this.refs, function (ref) {
	      ref.setStatus(status);
	    });
	  },

	  getStatus: function getStatus() {
	    return this.state.status;
	  },

	  onClick: function onClick(data) {
	    // check if event
	    data = data.hasOwnProperty('_dispatchListeners') ? this.props.data : data;
	    if (this.props.onClick) {
	      this.props.onClick(data);
	    }
	  },

	  updateStatus: function updateStatus() {
	    var status = undefined;
	    for (var k in this.refs) {
	      if (this.refs.hasOwnProperty(k)) {
	        var s = this.refs[k].getStatus();
	        if (status === undefined) {
	          status = s;
	          if (status === 1) {
	            break;
	          }
	        } else if (s === 1 || s !== status) {
	          status = 1;
	          break;
	        }
	      }
	    }
	    this.setState({ status: status });
	    this.props.onStatusChange();
	  },

	  getChecked: function getChecked(list, greedy) {
	    var checked = greedy ? 1 : 2;
	    if (this.state.status >= checked) {
	      list.push(this.props.data);
	    }
	    Objects.forEach(this.refs, function (ref) {
	      ref.getChecked(list, greedy);
	    });
	  },

	  render: function render() {
	    var children = undefined,
	        handle = undefined,
	        check = undefined,
	        checkClass = undefined,
	        type = undefined,
	        marks = [];

	    var _props2 = this.props;
	    var data = _props2.data;
	    var checkAble = _props2.checkAble;
	    var readOnly = _props2.readOnly;
	    var open = _props2.open;
	    var value = _props2.value;

	    if (data.children) {
	      var items = data.children.map(function (item, i) {
	        return React.createElement(Item, { ref: i,
	          key: i,
	          open: open,
	          readOnly: readOnly,
	          value: value,
	          checkAble: checkAble,
	          data: item,
	          onClick: this.onClick,
	          onStatusChange: this.updateStatus
	        });
	      }, this);

	      children = React.createElement(
	        'ul',
	        { className: classnames({ open: this.state.open }) },
	        items
	      );
	      type = this.state.open ? 'folder-open' : 'folder';
	      handle = React.createElement(
	        'a',
	        { onClick: this.toggle, className: 'handle' },
	        React.createElement('i', { className: 'tree-icon ' + (this.state.open ? 'minus' : 'plus') })
	      );
	    } else {
	      type = 'file';
	    }

	    if (checkAble) {
	      check = ['square', 'half-check', 'check'][this.state.status];
	      checkClass = classnames('check-handle', ['', 'half-checked', 'checked'][this.state.status]);
	    }

	    for (var i = 0, count = data.$deep.length; i < count; i++) {
	      var d = data.$deep[i];
	      var mc = classnames('marks', {
	        'marks-h': d > 1 || Objects.isEmpty(data.children) && count - 1 === i,
	        'marks-v': d === 1,
	        'marks-l': d === 2
	      });
	      marks.push(React.createElement(
	        'span',
	        { key: i, className: mc },
	        ' '
	      ));
	    }
	    return React.createElement(
	      'li',
	      null,
	      React.createElement(
	        'label',
	        null,
	        marks,
	        handle,
	        React.createElement('i', { className: 'tree-icon ' + type }),
	        checkAble && React.createElement(
	          'a',
	          { className: checkClass, onClick: this.check },
	          React.createElement('i', { className: 'tree-icon ' + check })
	        ),
	        React.createElement(
	          'span',
	          { onClick: this.onClick, className: 'text' },
	          data.$text
	        )
	      ),
	      children
	    );
	  }
	});

	module.exports = Tree;

	__webpack_require__(114).register('tree', function (props) {
	  return React.createElement(Tree, props);
	}, Tree, 'array');
	//})

/***/ },
/* 156 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 157 */,
/* 158 */,
/* 159 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(160);
	var React = __webpack_require__(100);
	var Classable = __webpack_require__(122);

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

	  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	    if (nextProps.disabled !== this.props.disabled) {
	      this.setState({ disabled: nextProps.disabled });
	    }
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

	    return React.createElement(
	      'button',
	      { onClick: this.handleClick,
	        disabled: this.state.disabled,
	        className: className,
	        type: this.props.type || 'button' },
	      this.state.show || this.props.children
	    );
	  }
	});

/***/ },
/* 160 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 161 */,
/* 162 */,
/* 163 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(100);
	var Classable = __webpack_require__(122);
	var Button = __webpack_require__(159);

	var Submit = React.createClass({
	  displayName: 'FormSubmit',

	  propTypes: {
	    children: React.PropTypes.any,
	    locked: React.PropTypes.bool,
	    onClick: React.PropTypes.func
	  },

	  mixins: [Classable],

	  render: function render() {
	    var children = this.props.children;
	    var content = undefined;
	    if (Array.isArray(children)) {
	      content = this.props.locked ? children[1] : children[0];
	    } else {
	      content = children;
	    }

	    return React.createElement(
	      'div',
	      { className: 'pure-control-group' },
	      React.createElement(
	        Button,
	        { type: 'submit',
	          status: 'primary',
	          onClick: this.props.onClick,
	          disabled: this.props.locked },
	        content
	      )
	    );
	  }
	});

	module.exports = Submit;

/***/ },
/* 164 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(100);
	var Qwest = __webpack_require__(128);
	var Objects = __webpack_require__(117);
	var Classable = __webpack_require__(122);
	var Lang = __webpack_require__(120);
	var Message = __webpack_require__(165);
	var FormControl = __webpack_require__(114);
	var FormSubmit = __webpack_require__(163);

	var Form = React.createClass({
	  displayName: 'Form',

	  propTypes: {
	    action: React.PropTypes.string,
	    autoload: React.PropTypes.bool,
	    children: React.PropTypes.any,
	    hintType: React.PropTypes.oneOf(['block', 'none', 'pop', 'inline']),
	    layout: React.PropTypes.oneOf(['aligned', 'stacked', 'inline']),
	    onSubmit: React.PropTypes.func
	  },

	  mixins: [Classable],

	  getDefaultProps: function getDefaultProps() {
	    return {
	      layout: 'inline'
	    };
	  },

	  getInitialState: function getInitialState() {
	    return {
	      locked: false,
	      data: {}
	    };
	  },

	  componentWillMount: function componentWillMount() {
	    if (this.props.action && this.props.autoload) {
	      this.fetchData(this.props.action);
	    }
	  },

	  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	    if (this.props.action !== this.props.action) {
	      this.fetchData(nextProps.action);
	    }
	  },

	  fetchData: function fetchData(src) {
	    var _this = this;

	    src = src || this.props.action;
	    //loading.start()
	    Qwest.get(src, null, {}).then(function (res) {
	      //loading.end()
	      if (res.status === 1) {
	        _this.setData(res.data);
	      } else if (res.msg) {
	        Message.show(res.msg, 'warning');
	      }
	    })['catch'](function (e) {
	      Message.show(e.message, 'error');
	    });
	  },

	  getValue: function getValue() {
	    var data = this.state.data;
	    Objects.forEach(this.refs, function (ref, k) {
	      if (!ref.props.ignore) {
	        data[k] = ref.getValue();
	      }
	    });
	    return data;
	  },

	  setData: function setData(data) {
	    Objects.forEach(this.refs, function (ref, k) {
	      ref.setValue(data[k]);
	    });
	  },

	  equalValidate: function equalValidate(targetRef, equalRef) {
	    var self = this;
	    return function () {
	      var target = self.refs[targetRef];
	      if (!target) {
	        console.warn('equal target \'' + targetRef + '\' not existed');
	        return false;
	      }
	      var equal = self.refs[equalRef];
	      return target.getValue() === equal.getValue();
	    };
	  },

	  renderChildren: function renderChildren() {
	    return React.Children.map(this.props.children, function (child) {
	      var props = {
	        hintType: child.props.hintType || this.props.hintType,
	        readOnly: child.props.readOnly || this.state.locked,
	        layout: this.props.layout
	      };
	      if (child.type === FormControl) {
	        if (!child.props.name) {
	          console.warn('FormControl must have a name!');
	          return null;
	        }
	        props.ref = child.props.name;
	        props.value = this.state.data[child.props.name];
	        if (child.props.equal) {
	          props.onValidate = this.equalValidate(child.props.equal, child.props.name);
	        }
	      } else if (child.type === FormSubmit) {
	        props.locked = this.state.locked;
	      }

	      child = React.addons.cloneWithProps(child, props);
	      return child;
	    }, this);
	  },

	  getReference: function getReference(name) {
	    return this.refs[name];
	  },

	  handleSubmit: function handleSubmit(event) {
	    var _this2 = this;

	    if (this.state.locked) {
	      return;
	    }

	    event.preventDefault();

	    this.setState({ locked: true });

	    var success = true;
	    Objects.forEach(this.refs, function (child) {
	      var suc = child.validate();
	      success = success && suc;
	    });

	    if (!success) {
	      this.setState({ locked: false });
	      return;
	    }

	    var data = this.getValue();
	    Qwest.post(this.props.action, data).then(function (res) {
	      if (res.status === 1) {
	        if (_this2.props.onSubmit) {
	          _this2.props.onSubmit(res);
	        }
	        if (res.msg) {
	          Message.show(res.msg, 'success');
	        }
	      } else {
	        Message.show(res.msg || Lang.get('request.empty'), 'warning');
	      }
	    })['catch'](function (e) {
	      Message.show(Lang.get('request.failure') + ' ' + e, 'error');
	    }).complete(function () {
	      _this2.setState({ locked: false });
	    });
	  },

	  render: function render() {
	    var className = this.getClasses('pure-form', {
	      'pure-form-aligned': this.props.layout === 'aligned',
	      'pure-form-inline': this.props.layout === 'inline',
	      'pure-form-stacked': this.props.layout === 'stacked'
	    });

	    return React.createElement(
	      'form',
	      { onSubmit: this.handleSubmit, className: className },
	      this.renderChildren()
	    );
	  }
	});

	module.exports = Form;

/***/ },
/* 165 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	__webpack_require__(166);

	var React = __webpack_require__(100);
	var Overlay = __webpack_require__(168);
	var Objects = __webpack_require__(117);
	var Classable = __webpack_require__(122);
	var PubSub = __webpack_require__(171);

	var messages = [];
	var ADD_MESSAGE = 'EB3A79637B40';
	var REMOVE_MESSAGE = '73D4EF15DF50';

	var Item = React.createClass({
	  displayName: 'Message.Item',

	  propTypes: {
	    content: React.PropTypes.string,
	    dismissed: React.PropTypes.bool,
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
/* 166 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 167 */,
/* 168 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _react = __webpack_require__(100);

	var _react2 = _interopRequireDefault(_react);

	var _mixinsClassable = __webpack_require__(122);

	var _mixinsClassable2 = _interopRequireDefault(_mixinsClassable);

	__webpack_require__(169);

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
/* 169 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 170 */,
/* 171 */
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
/* 172 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

	__webpack_require__(173);

	var React = __webpack_require__(100);
	var classnames = __webpack_require__(104);
	var Objects = __webpack_require__(117);
	var Classable = __webpack_require__(122);

	var Pagination = React.createClass({
	  displayName: 'Pagination',

	  propTypes: {
	    index: React.PropTypes.number,
	    onChange: React.PropTypes.func,
	    pages: React.PropTypes.number,
	    showGo: React.PropTypes.bool,
	    size: React.PropTypes.number,
	    total: React.PropTypes.number
	  },

	  mixins: [Classable],

	  getDefaultProps: function getDefaultProps() {
	    return {
	      total: 0,
	      size: 20,
	      index: 1,
	      pages: 10
	    };
	  },

	  getInitialState: function getInitialState() {
	    return {
	      index: this.props.index
	    };
	  },

	  setIndex: function setIndex(index) {
	    index = parseInt(index);
	    this.setState({ 'index': index });
	  },

	  setInput: function setInput(event) {
	    event.preventDefault();

	    var value = React.findDOMNode(this.refs.input).value;
	    value = parseInt(value);
	    if (!value) {
	      return;
	    }

	    this.setIndex(value);
	    if (this.props.onChange) {
	      this.props.onChange(value);
	    }
	  },

	  handleChange: function handleChange(index) {
	    this.setIndex(index);
	    if (this.props.onChange) {
	      this.props.onChange(index);
	    }
	  },

	  getPages: function getPages() {
	    var total = this.props.total,
	        size = this.props.size,
	        index = this.state.index,
	        span = this.props.pages,
	        max = Math.ceil(total / size),
	        pages = [],
	        left = undefined,
	        right = undefined;

	    if (index > max) {
	      index = max;
	    }

	    left = index - Math.floor(span / 2) + 1;
	    if (left < 1) {
	      left = 1;
	    }
	    right = left + span - 2;
	    if (right >= max) {
	      right = max;
	      left = right - span + 2;
	      if (left < 1) {
	        left = 1;
	      }
	    } else {
	      right -= left > 1 ? 1 : 0;
	    }

	    // add first
	    if (left > 1) {
	      pages.push(1);
	    }
	    for (var i = left; i < right + 1; i++) {
	      pages.push(i);
	    }
	    // add last
	    if (right < max) {
	      pages.push(max);
	    }

	    return [pages, max];
	  },

	  render: function render() {
	    var index = this.state.index;

	    var _getPages = this.getPages();

	    var _getPages2 = _slicedToArray(_getPages, 2);

	    var pages = _getPages2[0];
	    var max = _getPages2[1];
	    var items = [];

	    // Previous
	    items.push(React.createElement(
	      'li',
	      { key: 'previous', onClick: this.handleChange.bind(this, index - 1), className: classnames({ disabled: index <= 1 }) },
	      React.createElement(
	        'a',
	        null,
	        '«'
	      )
	    ));

	    Objects.forEach(pages, function (i) {
	      items.push(React.createElement(
	        'li',
	        { onClick: this.handleChange.bind(this, i), className: classnames({ active: i === index }), key: i },
	        React.createElement(
	          'a',
	          null,
	          i
	        )
	      ));
	    }, this);

	    // Next
	    items.push(React.createElement(
	      'li',
	      { key: 'next', onClick: this.handleChange.bind(this, index + 1), className: classnames({ disabled: index >= max }) },
	      React.createElement(
	        'a',
	        null,
	        '»'
	      )
	    ));

	    var className = this.getClasses('pagination');
	    return React.createElement(
	      'div',
	      { className: 'pagination-wrap' },
	      React.createElement(
	        'ul',
	        { className: className },
	        items
	      ),
	      this.props.showGo && React.createElement(
	        'form',
	        { onSubmit: this.setInput },
	        React.createElement(
	          'div',
	          { className: 'input-group' },
	          React.createElement('input', { ref: 'input', type: 'text', className: 'form-control' }),
	          React.createElement(
	            'span',
	            { onClick: this.setInput, className: 'addon' },
	            'go'
	          )
	        )
	      )
	    );
	  }
	});

	module.exports = Pagination;

/***/ },
/* 173 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 174 */,
/* 175 */
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
	    failure: '操作失败.'
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
	    shortMonth: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'],
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
	      max: {
	        array: '最多选择 {0}个选项',
	        number: '最大值 {0}',
	        string: '最大长度 {0} 个字符'
	      },
	      min: {
	        array: '最少选择 {0}个选项',
	        number: '最小值 {0}',
	        string: '最小长度 {0} 个字符'
	      },
	      number: '数字',
	      password: '大写英文字符,小写英文字符,数字,特殊字符'
	    },
	    tips: {
	      alpha: '只能包含英文字符，"-"，"_"',
	      alphanum: '只能包含数字、英文字符和"_"',
	      email: '格式不正确',
	      integer: '必须为整数',
	      required: '不能为空',
	      max: {
	        array: '最多选择 {0} 个选项',
	        number: '不能大于 {0}',
	        string: '最大长度不能超过 {0} 个字符'
	      },
	      min: {
	        array: '最少选择 {0} 个选项',
	        number: '不能小于 {0}',
	        string: '最小长度不能少于 {0} 个字符'
	      },
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

	__webpack_require__(120).set(data);

/***/ },
/* 176 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(100);

	module.exports = {
	  componentDidMount: function componentDidMount() {
	    var node = React.findDOMNode(this);
	    window.prettyPrint(null, node);
	  }
	};

/***/ },
/* 177 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _srcJs = __webpack_require__(108);

	var React = __webpack_require__(100);
	var Prettify = __webpack_require__(176);

	module.exports = React.createClass({
	  displayName: 'Pages/Form',

	  mixins: [Prettify],

	  getInitialState: function getInitialState() {
	    return {
	      layout: 'inline'
	    };
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
	          'Form'
	        ),
	        React.createElement(
	          'h2',
	          null,
	          '表单'
	        )
	      ),
	      React.createElement(
	        'div',
	        { className: 'content' },
	        React.createElement(
	          'pre',
	          { className: 'prettyprint' },
	          '<Form\n  action={string}       // 服务端地址\n  hintType={string}     // 信息提示方式，可选值为 "block", "pop", "inline"，"none"\n                           layout 为 stacked, aligned 时，默认为 "block"\n                           layout 为 inline 时，默认为 "pop"\n                           会被 FormControl 的 hintType 覆盖\n  autoload={bool}       // 为true时，自动根据 action 从服务端已 get 方法获取数据\n  layout={string}       // 布局，可选值为 "aligned", "stacked", "inline"，默认为 "inline"\n  onSubmit={function}>  // 数据提交后回调事件\n  {children}\n</Form>'
	        ),
	        React.createElement(
	          'h2',
	          { className: 'subhead' },
	          'layout'
	        ),
	        React.createElement(
	          'div',
	          null,
	          React.createElement(
	            'span',
	            null,
	            'layout: '
	          ),
	          React.createElement(_srcJs.RadioGroup, {
	            width: 16,
	            inline: true,
	            data: ['inline', 'aligned', 'stacked'],
	            value: this.state.layout,
	            onChange: function (layout) {
	              return _this.setState({ layout: layout });
	            } })
	        ),
	        React.createElement('br', null),
	        React.createElement(
	          _srcJs.Form,
	          { layout: this.state.layout },
	          React.createElement(_srcJs.FormControl, { name: 'text', label: 'text', type: 'text', width: 6, responsive: 'sm', min: 2, max: 6 }),
	          React.createElement(_srcJs.FormControl, { name: 'email', label: 'email', type: 'email' }),
	          React.createElement(_srcJs.FormControl, { name: 'select', label: 'select', data: ['中国', '美国', '俄罗斯', '德国', '日本', '法国', '英格兰'], type: 'select' }),
	          React.createElement(
	            _srcJs.FormSubmit,
	            null,
	            React.createElement(
	              'span',
	              null,
	              '提交'
	            )
	          )
	        ),
	        React.createElement(
	          'h2',
	          { className: 'subhead' },
	          '获取 / 提交数据'
	        ),
	        React.createElement(
	          'p',
	          null,
	          '注：本文档使用了一个 ',
	          React.createElement(
	            'em',
	            null,
	            'json'
	          ),
	          ' 文件模拟服务端返回数据，提交会提示 ',
	          React.createElement(
	            'em',
	            null,
	            '500'
	          ),
	          ' 错误'
	        ),
	        React.createElement(
	          _srcJs.Form,
	          { layout: 'aligned', autoload: true, action: 'json/form.json' },
	          React.createElement(_srcJs.FormControl, { name: 'text', label: 'text', type: 'text', width: 12, min: 2, max: 6 }),
	          React.createElement(
	            _srcJs.FormControl,
	            { name: 'email', label: 'email', type: 'email' },
	            React.createElement(
	              'span',
	              { className: 'input-group pure-u-1' },
	              React.createElement(
	                'span',
	                { className: 'addon' },
	                React.createElement(_srcJs.Icon, { icon: 'email' })
	              ),
	              React.createElement(_srcJs.Input, { type: 'email' })
	            )
	          ),
	          React.createElement(_srcJs.FormControl, { width: 13, name: 'alpha', label: 'alpha', type: 'alpha' }),
	          React.createElement(_srcJs.FormControl, { width: 14, name: 'alphanum', label: 'alphanum', type: 'alphanum' }),
	          React.createElement(_srcJs.FormControl, { width: 15, name: 'integer', label: 'integer', type: 'integer' }),
	          React.createElement(_srcJs.FormControl, { width: 16, name: 'number', label: 'number', type: 'number' }),
	          React.createElement(_srcJs.FormControl, { width: 17, name: 'url', label: 'url', type: 'url' }),
	          React.createElement(_srcJs.FormControl, { width: 17, name: 'readonly', readOnly: true, label: 'readonly', type: 'text' }),
	          React.createElement(_srcJs.FormControl, { name: 'checkbox', type: 'checkbox', text: 'It\'s a checkbox' }),
	          React.createElement(_srcJs.FormControl, { name: 'datetime', type: 'datetime', label: 'datetime' }),
	          React.createElement(_srcJs.FormControl, { name: 'checkboxgroup', data: ['中国', '美国', '俄罗斯', '德国', '日本', '法国', '英格兰'], label: 'checkbox group', type: 'checkbox-group' }),
	          React.createElement(_srcJs.FormControl, { name: 'radiogroup', data: ['中国', '美国', '俄罗斯', '德国', '日本', '法国', '英格兰'], label: 'radio group', inline: true, type: 'radio-group' }),
	          React.createElement(_srcJs.FormControl, { name: 'rating', label: 'rating', required: true, maxValue: 10, tip: '亲，给个好评吧', type: 'rating' }),
	          React.createElement(_srcJs.FormControl, { width: 12, name: 'select', label: 'select', type: 'select', src: 'json/countries.json', mult: true, filterAble: true, optionTpl: '<img src="images/flags/{code}.png" /> {country}-{en}', valueTpl: '{en}' }),
	          React.createElement(_srcJs.FormControl, { name: 'tree', checkAble: true, label: 'tree', type: 'tree', src: 'json/tree.json', textTpl: '{text}({id})', valueTpl: '{id}' }),
	          React.createElement(_srcJs.FormControl, { width: 18, name: 'textarea', label: 'textarea', rows: 5, type: 'textarea' }),
	          React.createElement(
	            _srcJs.FormSubmit,
	            null,
	            React.createElement(
	              'span',
	              null,
	              '提交'
	            ),
	            React.createElement(
	              'span',
	              null,
	              '处理中'
	            )
	          )
	        ),
	        React.createElement(
	          'pre',
	          { className: 'prettyprint' },
	          '<Form layout="aligned" autoload={true} action="json/form.json">\n  <FormControl name="text" label="text" type="text" width={12} min={2} max={6} />\n  <FormControl name="email" label="email" type="email">\n    <span className="input-group">\n      <span className="addon"><Icon icon="email" /></span>\n      <Input type="email" />\n    </span>\n  </FormControl>\n  <FormControl width={13} name="alpha" label="alpha" type="alpha" />\n  <FormControl width={14} name="alphanum" label="alphanum" type="alphanum" />\n  <FormControl width={15} name="integer" label="integer" type="integer" />\n  <FormControl width={16} name="number" label="number" type="number" />\n  <FormControl width={17} name="url" label="url" type="url" />\n  <FormControl width={17} name="readonly" readOnly={true} label="readonly" type="text" />\n  <FormControl name="checkbox" type="checkbox" text="It\'s a checkbox" />\n  <FormControl name="datetime" type="datetime" label="datetime" />\n  <FormControl name="checkboxgroup" data={["中国", "美国", "俄罗斯", "德国", "日本", "法国", "英格兰"]} label="checkbox group" type="checkbox-group" />\n  <FormControl name="radiogroup" data={["中国", "美国", "俄罗斯", "德国", "日本", "法国", "英格兰"]} label="radio group" inline={true} type="radio-group" />\n  <FormControl name="rating" label="rating" required={true} maxValue={10} tip="亲，给个好评吧" type="rating" />\n  <FormControl width={12} name="select" label="select" type="select" src="json/countries.json" mult={true} filterAble={true} optionTpl=\'<img src="images/flags/{code}.png" /> {country}-{en}\' valueTpl="{en}" />\n  <FormControl name="tree" checkAble={true} label="tree" type="tree" src="json/tree.json" textTpl=\'{text}({id})\' valueTpl="{id}" />\n  <FormControl width={18} name="textarea" label="textarea" rows={5} type="textarea" />\n\n  <FormSubmit>\n    <span>提交</span>\n    <span>处理中</span>\n  </FormSubmit>\n</Form>\n'
	        ),
	        React.createElement(
	          'h2',
	          { className: 'subhead' },
	          'Methods'
	        ),
	        React.createElement(
	          'h2',
	          { className: 'subhead' },
	          'getReference(name)'
	        ),
	        React.createElement(
	          'p',
	          null,
	          React.createElement(
	            'em',
	            null,
	            'Form'
	          ),
	          ' 下不能使用 ',
	          React.createElement(
	            'em',
	            null,
	            'ref'
	          ),
	          ' 获取引用，需要引用时使用 ',
	          React.createElement(
	            'em',
	            null,
	            'getReference'
	          ),
	          ' 方法。',
	          React.createElement(
	            'em',
	            null,
	            'name'
	          ),
	          ' 为 FormControl 的 ',
	          React.createElement(
	            'em',
	            null,
	            'name'
	          )
	        )
	      )
	    );
	  }
	});

/***/ },
/* 178 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _srcJs = __webpack_require__(108);

	var React = __webpack_require__(100);
	var Prettify = __webpack_require__(176);

	module.exports = React.createClass({
	  displayName: 'Pages/FormControl',

	  mixins: [Prettify],

	  renderExample: function renderExample(type, component) {
	    component = component || 'Input';
	    return React.createElement(
	      'div',
	      null,
	      React.createElement(
	        'p',
	        null,
	        React.createElement(
	          'em',
	          null,
	          React.createElement(
	            'b',
	            null,
	            type
	          )
	        ),
	        ' => ',
	        React.createElement(
	          'a',
	          { href: '#/' + component.toLowerCase() },
	          component
	        )
	      ),
	      React.createElement(
	        'div',
	        { className: 'split' },
	        React.createElement(
	          'div',
	          { className: 'pure-u-1 pure-u-lg-1-2' },
	          React.createElement(_srcJs.FormControl, { width: 24, type: type })
	        ),
	        React.createElement(
	          'div',
	          { className: 'pure-u-1 pure-u-lg-1-2' },
	          React.createElement(
	            'pre',
	            { className: 'prettyprint' },
	            '<FormControl type="' + type + '" />'
	          )
	        )
	      )
	    );
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
	          'FormControl'
	        ),
	        React.createElement(
	          'h2',
	          null,
	          '表单元素'
	        )
	      ),
	      React.createElement(
	        'div',
	        { className: 'content pure-form' },
	        React.createElement(
	          'p',
	          null,
	          '一系列表单控件的马甲，统一封装用来实现表单数据验证，输入提示，动态创建表单等功能。',
	          React.createElement(
	            'b',
	            null,
	            '可以通过 ',
	            React.createElement(
	              'em',
	              null,
	              'getReference()'
	            ),
	            ' 这个方法获取被封装的控件。'
	          )
	        ),
	        React.createElement(
	          'pre',
	          { className: 'prettyprint' },
	          '<FormControl\n  className="string",     // 需要额外添加的 className\n  label={string|element}  // 提示文字\n  name={string}           // 数据key名称，唯一\n  ignore={bool}           // 为true时，不提交该项数据，默认为 false\n  type={string}           // 控件注册名称\n  width={int}             // grid 宽度，1-24\n  {...validate}           // 数据验证\n  {...props}              // 控件属性\n/>'
	        ),
	        React.createElement(
	          'h2',
	          { className: 'subhead' },
	          '数据验证属性'
	        ),
	        React.createElement(
	          'p',
	          null,
	          React.createElement(
	            'em',
	            null,
	            'FormControl'
	          ),
	          ' 会根据这些属性自动验证输入，自动生成提示文字和错误信息，文字在 ',
	          React.createElement(
	            'a',
	            { href: '#/lang' },
	            'Lang'
	          ),
	          ' 中设置。'
	        ),
	        React.createElement(
	          'pre',
	          { className: 'prettyprint' },
	          '<FormControl\n  equal={string}  // 判断值是否与另一个 FormControl 相等，string 为另一个 FormControl name\n  min={int}       // 值类型为 string 时，最小长度；为 number 时，最小值；为 array 时，最少选项数\n  max={int}       // 值类型为 string 时，最大长度；为 number 时，最大值；为 array 时，最多选项数\n  required={bool} // 是否必填，默认为 false\n  tip={string}    // 额外提示信息\n  type={string}   // 会自动判断某些类型 type，如 email, integer, url 等\n/>'
	        ),
	        React.createElement(
	          'h2',
	          { className: 'subhead' },
	          '已注册控件'
	        ),
	        React.createElement(
	          'div',
	          null,
	          React.createElement(
	            'p',
	            null,
	            React.createElement(
	              'em',
	              null,
	              React.createElement(
	                'b',
	                null,
	                'text'
	              )
	            ),
	            ' => ',
	            React.createElement(
	              'a',
	              { href: '#/input' },
	              'Input'
	            )
	          ),
	          React.createElement(
	            'div',
	            { className: 'split' },
	            React.createElement(
	              'div',
	              { className: 'pure-u-1 pure-u-lg-1-2' },
	              React.createElement(_srcJs.FormControl, { width: 24, required: true, type: 'text', min: 2, max: 10 })
	            ),
	            React.createElement(
	              'div',
	              { className: 'pure-u-1 pure-u-lg-1-2' },
	              React.createElement(
	                'pre',
	                { className: 'prettyprint' },
	                '<FormControl\n    required={true}\n    type="text"\n    min={2}\n    max={10} />'
	              )
	            )
	          )
	        ),
	        this.renderExample('email'),
	        this.renderExample('alpha'),
	        this.renderExample('alphanum'),
	        this.renderExample('url'),
	        this.renderExample('integer'),
	        this.renderExample('number'),
	        this.renderExample('password'),
	        this.renderExample('date', 'Datetime'),
	        this.renderExample('time', 'Datetime'),
	        this.renderExample('datetime', 'Datetime'),
	        React.createElement(
	          'div',
	          null,
	          React.createElement(
	            'p',
	            null,
	            React.createElement(
	              'em',
	              null,
	              React.createElement(
	                'b',
	                null,
	                'textarea'
	              )
	            ),
	            ' => ',
	            React.createElement(
	              'a',
	              { href: '#/input' },
	              'Input'
	            )
	          ),
	          React.createElement(
	            'div',
	            { className: 'split' },
	            React.createElement(
	              'div',
	              { className: 'pure-u-1 pure-u-lg-1-2' },
	              React.createElement(_srcJs.FormControl, { width: 24, type: 'textarea', rows: 5 })
	            ),
	            React.createElement(
	              'div',
	              { className: 'pure-u-1 pure-u-lg-1-2' },
	              React.createElement(
	                'pre',
	                { className: 'prettyprint' },
	                '<FormControl width={24} type="textarea" rows={5} />'
	              )
	            )
	          )
	        ),
	        React.createElement(
	          'div',
	          null,
	          React.createElement(
	            'p',
	            null,
	            React.createElement(
	              'em',
	              null,
	              React.createElement(
	                'b',
	                null,
	                'select'
	              )
	            ),
	            ' => ',
	            React.createElement(
	              'a',
	              { href: '#/select' },
	              'Select'
	            )
	          ),
	          React.createElement(
	            'div',
	            { className: 'split' },
	            React.createElement(
	              'div',
	              { className: 'pure-u-1 pure-u-lg-1-2' },
	              React.createElement(_srcJs.FormControl, { width: 24,
	                type: 'select',
	                required: true,
	                src: 'json/countries.json',
	                filterAble: true,
	                optionTpl: '<img src="images/flags/{code}.png" /> {country}-{en}',
	                valueTpl: '{country}-{en}',
	                mult: true,
	                min: 2,
	                max: 6
	              })
	            ),
	            React.createElement(
	              'div',
	              { className: 'pure-u-1 pure-u-lg-1-2' },
	              React.createElement(
	                'pre',
	                { className: 'prettyprint' },
	                '<FormControl width={24}\n  type="select"\n  required={true}\n  src="json/countries.json"\n  filterAble={true}\n  optionTpl=\'<img src="images/flags/{code}.png" /> {country}-{en}\'\n  valueTpl="{country}-{en}"\n  mult={true}\n  min={2}\n  max={6}\n />'
	              )
	            )
	          )
	        ),
	        React.createElement(
	          'div',
	          null,
	          React.createElement(
	            'p',
	            null,
	            React.createElement(
	              'em',
	              null,
	              React.createElement(
	                'b',
	                null,
	                'tree'
	              )
	            ),
	            ' => ',
	            React.createElement(
	              'a',
	              { href: '#/tree' },
	              'Tree'
	            )
	          ),
	          React.createElement(
	            'div',
	            { className: 'split' },
	            React.createElement(
	              'div',
	              { className: 'pure-u-1 pure-u-lg-1-2' },
	              React.createElement(_srcJs.FormControl, {
	                type: 'tree',
	                checkAble: true,
	                src: 'json/tree.json',
	                textTpl: '{text}({id})',
	                valueTpl: '{id}'
	              })
	            ),
	            React.createElement(
	              'div',
	              { className: 'pure-u-1 pure-u-lg-1-2' },
	              React.createElement(
	                'pre',
	                { className: 'prettyprint' },
	                '<FormControl\n  type="tree"\n  checkAble={true}\n  src="json/tree.json"\n  textTpl="{text}({id})"\n  valueTpl="{id}"\n />'
	              )
	            )
	          )
	        ),
	        React.createElement(
	          'div',
	          null,
	          React.createElement(
	            'p',
	            null,
	            React.createElement(
	              'em',
	              null,
	              React.createElement(
	                'b',
	                null,
	                'checkbox'
	              )
	            ),
	            ' => ',
	            React.createElement(
	              'a',
	              { href: '#/checkbox' },
	              'Checkbox'
	            )
	          ),
	          React.createElement(
	            'div',
	            { className: 'split' },
	            React.createElement(
	              'div',
	              { className: 'pure-u-1 pure-u-lg-1-2' },
	              React.createElement(_srcJs.FormControl, { type: 'checkbox', text: 'I\'m a checkbox' })
	            ),
	            React.createElement(
	              'div',
	              { className: 'pure-u-1 pure-u-lg-1-2' },
	              React.createElement(
	                'pre',
	                { className: 'prettyprint' },
	                '<FormControl type="checkbox" text="I\'m a checkbox" />'
	              )
	            )
	          )
	        ),
	        React.createElement(
	          'div',
	          null,
	          React.createElement(
	            'p',
	            null,
	            React.createElement(
	              'em',
	              null,
	              React.createElement(
	                'b',
	                null,
	                'checkbox-group'
	              )
	            ),
	            ' => ',
	            React.createElement(
	              'a',
	              { href: '#/checkbox-group' },
	              'CheckboxGroup'
	            )
	          ),
	          React.createElement(
	            'div',
	            { className: 'split' },
	            React.createElement(
	              'div',
	              { className: 'pure-u-1 pure-u-lg-1-2' },
	              React.createElement(_srcJs.FormControl, {
	                type: 'checkbox-group',
	                src: 'json/text-value.json',
	                textTpl: '{text}',
	                valueTpl: '{id}',
	                min: 2,
	                max: 4
	              })
	            ),
	            React.createElement(
	              'div',
	              { className: 'pure-u-1 pure-u-lg-1-2' },
	              React.createElement(
	                'pre',
	                { className: 'prettyprint' },
	                '<FormControl\n  type="checkbox-group"\n  src="json/text-value.json"\n  textTpl="{text}"\n  valueTpl="{id}"\n  min={2}\n  max={4}\n />'
	              )
	            )
	          )
	        ),
	        React.createElement(
	          'div',
	          null,
	          React.createElement(
	            'p',
	            null,
	            React.createElement(
	              'em',
	              null,
	              React.createElement(
	                'b',
	                null,
	                'radio-group'
	              )
	            ),
	            ' => ',
	            React.createElement(
	              'a',
	              { href: '#/radio-group' },
	              'RadioGroup'
	            )
	          ),
	          React.createElement(
	            'div',
	            { className: 'split' },
	            React.createElement(
	              'div',
	              { className: 'pure-u-1 pure-u-lg-1-2' },
	              React.createElement(_srcJs.FormControl, {
	                type: 'radio-group',
	                src: 'json/text-value.json',
	                textTpl: '{text}',
	                valueTpl: '{id}'
	              })
	            ),
	            React.createElement(
	              'div',
	              { className: 'pure-u-1 pure-u-lg-1-2' },
	              React.createElement(
	                'pre',
	                { className: 'prettyprint' },
	                '<FormControl\n  type="radio-group"\n  src="json/text-value.json"\n  textTpl="{text}"\n  valueTpl="{id}"\n />'
	              )
	            )
	          )
	        ),
	        React.createElement(
	          'div',
	          null,
	          React.createElement(
	            'p',
	            null,
	            React.createElement(
	              'em',
	              null,
	              React.createElement(
	                'b',
	                null,
	                'rating'
	              )
	            ),
	            ' => ',
	            React.createElement(
	              'a',
	              { href: '#/rating' },
	              'RadioGroup'
	            )
	          ),
	          React.createElement(
	            'div',
	            { className: 'split' },
	            React.createElement(
	              'div',
	              { className: 'pure-u-1 pure-u-lg-1-2' },
	              React.createElement(_srcJs.FormControl, {
	                type: 'rating',
	                maxValue: 10,
	                tip: '亲，给个好评吧',
	                required: true,
	                icons: [React.createElement(_srcJs.Icon, { icon: 'favorite-outline', style: { color: 'red' } }), React.createElement(_srcJs.Icon, { icon: 'favorite', style: { color: 'red' } })]
	              })
	            ),
	            React.createElement(
	              'div',
	              { className: 'pure-u-1 pure-u-lg-1-2' },
	              React.createElement(
	                'pre',
	                { className: 'prettyprint' },
	                '<FormControl\n  required={true}\n  maxValue={10}\n  tip="亲，给个好评吧"\n  type="rating"\n  icons={[<Icon icon="favorite-outline" style={{color: \'red\'}} />, <Icon icon="favorite" style={{color: \'red\'}} />]}\n />'
	              )
	            )
	          )
	        ),
	        React.createElement(
	          'h2',
	          { className: 'subhead' },
	          'Children'
	        ),
	        React.createElement(
	          'p',
	          null,
	          '可以使用 children 来处理一些复杂结构。',
	          React.createElement(
	            'b',
	            null,
	            '注意每个 FormControl 只能有一个表单组件，类型必须和 FormControl 的 ',
	            React.createElement(
	              'em',
	              null,
	              'type'
	            ),
	            ' 相同。'
	          )
	        ),
	        React.createElement(
	          _srcJs.FormControl,
	          { name: 'email', label: 'email', type: 'email' },
	          React.createElement(
	            'span',
	            { className: 'input-group' },
	            React.createElement(
	              'span',
	              { className: 'addon' },
	              React.createElement(_srcJs.Icon, { icon: 'email' })
	            ),
	            React.createElement(_srcJs.Input, { type: 'email' })
	          )
	        ),
	        React.createElement(
	          'pre',
	          { className: 'prettyprint' },
	          '<FormControl type="email">\n  <span className="input-group">\n    <span className="addon"><Icon icon="email" /></span>\n    <Input type="email" />\n  </span>\n</FormControl>'
	        ),
	        React.createElement(
	          'h2',
	          { className: 'subhead' },
	          '自定义 FormControl'
	        ),
	        React.createElement(
	          'p',
	          null,
	          React.createElement(
	            'em',
	            null,
	            'FormControl'
	          ),
	          ' 提供一个静态方法 ',
	          React.createElement(
	            'em',
	            null,
	            'register'
	          ),
	          '，将一个 ',
	          React.createElement(
	            'em',
	            null,
	            'Component'
	          ),
	          ' 注册为 ',
	          React.createElement(
	            'em',
	            null,
	            'FormControl'
	          ),
	          ' 成员。',
	          React.createElement('br', null),
	          '每个注册为 ',
	          React.createElement(
	            'em',
	            null,
	            'FormControl'
	          ),
	          ' 的控件必须实现 ',
	          React.createElement(
	            'em',
	            null,
	            'getValue()'
	          ),
	          ' , ',
	          React.createElement(
	            'em',
	            null,
	            'setValue(data)'
	          ),
	          ' 这两个接口。'
	        ),
	        React.createElement(
	          'pre',
	          { className: 'prettyprint' },
	          'FormControl.register(\n  type,       // string，控件类型，唯一。如果同名，后注册的将会覆盖先注册的控件\n  render,     // function，匹配到类型时，调用render方法返回相应控件\n  valueType,  // \'string|array|number\'，控件值类型，三选一，数据验证时调用\n)'
	        )
	      )
	    );
	  }
	});

/***/ },
/* 179 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(100);
	var Prettify = __webpack_require__(176);

	module.exports = React.createClass({
	  displayName: 'Pages/FormSubmit',

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
	          'FormSubmit'
	        ),
	        React.createElement(
	          'h2',
	          null,
	          '表单提交按钮'
	        )
	      ),
	      React.createElement(
	        'div',
	        { className: 'content' },
	        React.createElement(
	          'p',
	          null,
	          React.createElement(
	            'a',
	            { href: '#/button' },
	            'Button'
	          ),
	          ' 的一个马甲，封装了一层响应 ',
	          React.createElement(
	            'a',
	            { href: '#/form' },
	            'Form'
	          ),
	          ' 状态'
	        ),
	        React.createElement(
	          'pre',
	          { className: 'prettyprint' },
	          '<FormSubmit>{children}</FormSubmit>'
	        ),
	        React.createElement(
	          'p',
	          null,
	          '如果children为两个元素，只会显示第一个元素内容，当按钮锁定时，显示第二个元素内容。'
	        ),
	        React.createElement(
	          'pre',
	          { className: 'prettyprint' },
	          '<FormSubmit>\n  <span>提交</span>\n  <span>处理中...</span>\n</FormSubmit>\n'
	        ),
	        React.createElement(
	          'p',
	          null,
	          '示例参见 ',
	          React.createElement(
	            'a',
	            { href: '#/form' },
	            'Form'
	          )
	        )
	      )
	    );
	  }
	});

/***/ },
/* 180 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(100);
	var Prettify = __webpack_require__(176);
	var Checkbox = __webpack_require__(109);

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
	          '<Checkbox\n  className={string}  // class\n  text="string"       // 显示的文字信息\n  value={any}         // 值，不填写 getValue 得到的值为 bool\n  checked={bool}      // 是否选中，默认为 false\n  readOnly={bool}     // 是否只读，默认为 false\n  onChange={function} // 状态改变回调事件\n/>'
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
/* 181 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(100);
	var Prettify = __webpack_require__(176);
	var CheckboxGroup = __webpack_require__(121);

	var textValue = __webpack_require__(182);

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
	          '<CheckboxGroup\n  className={string}  // class\n  data={array}        // 数据，与 src 二选一，优先使用 data\n  src="string"        // 服务器端数据地址，与 data 二选一\n  cache={bool}        // 数据缓存，只有当数据为远程获取时有效。默认为 true\n  sep={string|null}   // 返回值分隔字符，默认值为 ","。为 "" 或 null 时，返回值类型为 array\n  inline={bool}       // 为 true 时，各选项横向排列。默认为 false\n  onChange={function} // 当选项改变时回调方法，参数为 value\n  readOnly={bool}     // 为 true 时，只读。默认为 false\n  textTpl="string"    // 显示文字模板，默认为 "{text}"\n  valueTpl="string"   // 返回数据模板，默认为 "{id}"\n  value={string|array}\n/>'
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
	            'id'
	          ),
	          ' key组成的数组'
	        ),
	        React.createElement(
	          'pre',
	          { className: 'prettyprint' },
	          '[{"text":"北京","id":"beijing"},{"text":"上海", "id":"shanghai"}]'
	        ),
	        React.createElement(
	          'p',
	          null,
	          '可以使用自定义数组，指定 ',
	          React.createElement(
	            'em',
	            null,
	            'textTpl'
	          ),
	          ', ',
	          React.createElement(
	            'em',
	            null,
	            'valueTpl'
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
	          'data = [\n  { "id": "nanjing", "text": "南京" },\n  { "id": "beijing", "text": "北京" },\n  { "id": "guangzhou", "text": "广州" },\n  { "id": "shenzhen", "text": "深圳" },\n  { "id": "chengdu", "text": "成都" },\n  { "id": "chongqing", "text": "重庆" },\n  { "id": "shanghai", "text": "上海" }\n]'
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
/* 182 */
/***/ function(module, exports) {

	"use strict";

	module.exports = [{ "id": "nanjing", "text": "南京" }, { "id": "beijing", "text": "北京" }, { "id": "guangzhou", "text": "广州" }, { "id": "shenzhen", "text": "深圳" }, { "id": "chengdu", "text": "成都" }, { "id": "chongqing", "text": "重庆" }, { "id": "shanghai", "text": "上海" }];

/***/ },
/* 183 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _srcJs = __webpack_require__(108);

	var React = __webpack_require__(100);
	var Prettify = __webpack_require__(176);

	module.exports = React.createClass({
	  displayName: 'Pages/Datetime',

	  mixins: [Prettify],

	  handleChange: function handleChange(ref) {
	    var value = 'value：' + this.refs['d-' + ref].getValue();
	    React.findDOMNode(this.refs['p-' + ref]).innerHTML = value;
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
	          'Datetime'
	        ),
	        React.createElement(
	          'h2',
	          null,
	          '日期 / 时间 选择器'
	        )
	      ),
	      React.createElement(
	        'div',
	        { className: 'content' },
	        React.createElement(
	          'pre',
	          { className: 'prettyprint' },
	          '<Datetime\n  dateOnly={bool}       // 只选择日期部分，默认为 false\n  timeOnly={bool}       // 只选择时间部分，默认为 false\n  readOnly={bool}       // 只读，默认为 false\n  format={string}       // 返回值格式，如 \'yyyy-MM-dd\'，默认值 在 Lang.date.format 下设置\n  unixtime={bool}       // 为 true 时，getValue 返回 unixtimestamp\n  placeholder={string}  // 占位提示文字\n  onChange={function}   // 值改变时触发事件，参数为 value\n  value={string|number} // 初始值\n/>'
	        ),
	        React.createElement(
	          'h2',
	          { className: 'subhead' },
	          'Example'
	        ),
	        React.createElement(_srcJs.Datetime, { ref: 'd-def', onChange: this.handleChange.bind(this, 'def'), value: '2015-06-21 17:24:03' }),
	        React.createElement('p', { ref: 'p-def' }),
	        React.createElement(
	          'pre',
	          { className: 'prettyprint' },
	          '<Datetime value="2015-06-21 17:24:03" />'
	        ),
	        React.createElement(
	          'h2',
	          { className: 'subhead' },
	          'dateOnly'
	        ),
	        React.createElement(_srcJs.Datetime, { ref: 'd-dateOnly', onChange: this.handleChange.bind(this, 'dateOnly'), dateOnly: true }),
	        React.createElement('p', { ref: 'p-dateOnly' }),
	        React.createElement(
	          'pre',
	          { className: 'prettyprint' },
	          '<Datetime dateOnly={true} />'
	        ),
	        React.createElement(
	          'h2',
	          { className: 'subhead' },
	          'timeOnly'
	        ),
	        React.createElement(_srcJs.Datetime, { ref: 'd-timeOnly', onChange: this.handleChange.bind(this, 'timeOnly'), timeOnly: true }),
	        React.createElement('p', { ref: 'p-timeOnly' }),
	        React.createElement(
	          'pre',
	          { className: 'prettyprint' },
	          '<Datetime timeOnly={true} />'
	        ),
	        React.createElement(
	          'h2',
	          { className: 'subhead' },
	          'readOnly'
	        ),
	        React.createElement(_srcJs.Datetime, { readOnly: true, value: '2015-06-21 17:24:03' }),
	        React.createElement(
	          'pre',
	          { className: 'prettyprint' },
	          '<Datetime readOnly={true} value="2015-06-21 17:24:03" />'
	        ),
	        React.createElement(
	          'h2',
	          { className: 'subhead' },
	          'unixtime'
	        ),
	        React.createElement(_srcJs.Datetime, { ref: 'd-unixtime', onChange: this.handleChange.bind(this, 'unixtime'), unixtime: true }),
	        React.createElement('p', { ref: 'p-unixtime' }),
	        React.createElement(
	          'pre',
	          { className: 'prettyprint' },
	          '<Datetime unixtime={true} />'
	        )
	      )
	    );
	  }
	});

/***/ },
/* 184 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(100);
	var Prettify = __webpack_require__(176);

	module.exports = React.createClass({
	  displayName: 'Pages/Input',

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
	          'Input'
	        ),
	        React.createElement(
	          'h2',
	          null,
	          '输入框'
	        )
	      ),
	      React.createElement(
	        'div',
	        { className: 'content' },
	        React.createElement(
	          'pre',
	          { className: 'prettyprint' },
	          '<Input\n  id={string}\n  type={string}        // text, email, alpha, alphanum, password, url, textarea, number, integer\n  placeholder={string} // 占位提示文字\n  readOnly={bool}      // 只读，默认为 false\n  rows={int}           // 当 type 为 textarea 时需要设置\n  onChange={func}      // 值改变回调事件，参数为 value\n  value={string}       // 初始值\n/>'
	        ),
	        React.createElement(
	          'p',
	          null,
	          '示例见 ',
	          React.createElement(
	            'a',
	            { href: '#/form-control' },
	            'FormControl'
	          )
	        )
	      )
	    );
	  }
	});

/***/ },
/* 185 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(100);
	var Prettify = __webpack_require__(176);
	var RadioGroup = __webpack_require__(146);

	var textValue = __webpack_require__(182);

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
	          '<RadioGroup\n  className={string}  // class\n  data={array}        // 数据，与 src 二选一，优先使用 data\n  src="string"        // 服务器端数据地址，与 data 二选一\n  cache={bool}        // 数据缓存，只有当数据为远程获取时有效。默认为 true\n  inline={bool}       // 为 true 时，各选项横向排列。默认为 false\n  onChange={function} // 当选项改变时回调方法，参数为 value\n  readOnly={bool}     // 为 true 时，只读。默认为 false\n  textTpl="string"    // 显示文字模板，默认为 "{text}"\n  valueTpl="string"   // 返回数据模板，默认为 "{id}"\n  value={any}\n/>'
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
	          '[{"text":"北京","id":"beijing"},{"text":"上海", "id":"shanghai"}]'
	        ),
	        React.createElement(
	          'p',
	          null,
	          '可以使用自定义数组，指定 ',
	          React.createElement(
	            'em',
	            null,
	            'textTpl'
	          ),
	          ', ',
	          React.createElement(
	            'em',
	            null,
	            'valueTpl'
	          )
	        ),
	        React.createElement(
	          'pre',
	          { className: 'prettyprint' },
	          '[{"cn":"北京","en":"beijing"},{"cn":"上海", "en":"shanghai"}]'
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
	          'data = [\n  { "id": "nanjing", "text": "南京" },\n  { "id": "beijing", "text": "北京" },\n  { "id": "guangzhou", "text": "广州" },\n  { "id": "shenzhen", "text": "深圳" },\n  { "id": "chengdu", "text": "成都" },\n  { "id": "chongqing", "text": "重庆" },\n  { "id": "shanghai", "text": "上海" }\n]'
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
/* 186 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _srcJs = __webpack_require__(108);

	var React = __webpack_require__(100);
	var Prettify = __webpack_require__(176);

	module.exports = React.createClass({
	  displayName: 'Pages/Select',

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
	          'Select'
	        ),
	        React.createElement(
	          'h2',
	          null,
	          '下拉列表'
	        )
	      ),
	      React.createElement(
	        'div',
	        { className: 'content' },
	        React.createElement(
	          'pre',
	          { className: 'prettyprint' },
	          '<Select\n  className={string}    // class\n  data={array}          // 数据，与 src 二选一，优先使用 data\n  src="string"          // 服务器端数据地址，与 data 二选一\n  cache={bool}          // 数据缓存，只有当数据为远程获取时有效。默认为 true\n  sep={string|null}     // 返回值分隔字符，默认值为 ","。为 "" 或 null 时，返回值类型为 array\n  filterAble={bool}     // 是否显示筛选，默认为 false\n  readOnly={bool}       // 是否只读。默认为 false\n  groupBy={string}      // 分组的 key。不填为不分组\n  placeholder={string}  // 占位提示文字\n  mult={bool}           // 是否多选，默认为 false\n  onChange={function}   // 值改变时触发事，参数为 value\n  optionTpl={string}    // 选项模板，默认为 {text}\n  resultTpl={string}    // 选中项显示模板，如果不填使用 optionTpl\n  valueTpl={string}     // 返回值模板，默认为 {value}\n  value={string}        // 初始值\n/>\n模板使用 "{key}" 形式的字符串进行格式化。\ndata 为简单数组（如["中国", "美国", "俄罗斯", "德国"])，时，所有模板无效。\n'
	        ),
	        React.createElement(
	          'h2',
	          { className: 'subhead' },
	          '简单数组'
	        ),
	        React.createElement(
	          'div',
	          null,
	          React.createElement(_srcJs.Select, { width: 6, placeholder: '简单数组', data: ['中国', '美国', '俄罗斯', '德国', '日本', '法国', '英格兰'] }),
	          ' ',
	          React.createElement(_srcJs.Select, { width: 12, mult: true, data: ['中国', '美国', '俄罗斯', '德国', '日本', '法国', '英格兰'] })
	        ),
	        React.createElement(
	          'pre',
	          { className: 'prettyprint' },
	          '<Select placeholder="简单数组" data={["中国", "美国", "俄罗斯", "德国"]} />\n<Select className="pure-u-1-2" mult={true} data={["中国", "美国", "俄罗斯", "德国", "日本", "法国", "英格兰"]} />'
	        ),
	        React.createElement(
	          'h2',
	          { className: 'subhead' },
	          '单选'
	        ),
	        React.createElement(_srcJs.Select, { width: 12,
	          placeholder: '单选',
	          filterAble: true,
	          optionTpl: '<img src="images/flags/{code}.png" /> {country}-{en}',
	          valueTpl: '{country}-{en}',
	          src: 'json/countries.json' }),
	        React.createElement(
	          'pre',
	          { className: 'prettyprint' },
	          '<Select placeholder="单选"\n  filterAble={true}\n  optionTpl=\'<img src="images/flags/{code}.png" /> {country}-{en}\'\n  valueTpl="{country}-{en}"\n  src="json/countries.json" />\n'
	        ),
	        React.createElement(
	          'h2',
	          { className: 'subhead' },
	          '多选'
	        ),
	        React.createElement(_srcJs.Select, { width: 24,
	          cache: true,
	          mult: true,
	          placeholder: '多选',
	          filterAble: true,
	          optionTpl: '<img src="images/flags/{code}.png" /> {country}-{en}',
	          resultTpl: '<img src="images/flags/{code}.png" /> {country}',
	          valueTpl: '{en}',
	          src: 'json/countries.json' }),
	        React.createElement(
	          'pre',
	          { className: 'prettyprint' },
	          '<Select placeholder="多选"\n  cache={true}\n  mult={true}\n  filterAble={true}\n  optionTpl=\'<img src="images/flags/{code}.png" /> {country}-{en}\'\n  resultTpl=\'<img src="images/flags/{code}.png" /> {country}\'\n  valueTpl="{en}"\n  src="json/countries.json" />\n'
	        ),
	        React.createElement(
	          'h2',
	          { className: 'subhead' },
	          'groupBy'
	        ),
	        React.createElement(_srcJs.Select, { width: 12,
	          placeholder: 'Group by continent',
	          groupBy: 'continent',
	          filterAble: true,
	          optionTpl: '<img src="images/flags/{code}.png" /> {country}-{en}',
	          valueTpl: '{country}-{en}',
	          src: 'json/countries.json' }),
	        React.createElement(
	          'pre',
	          { className: 'prettyprint' },
	          '<Select placeholder="Group by continent"\n  groupBy="continent"\n  filterAble={true}\n  optionTpl=\'<img src="images/flags/{code}.png" /> {country}-{en}\'\n  valueTpl="{country}-{en}"\n  src="json/countries.json" />\n'
	        )
	      )
	    );
	  }
	});

/***/ },
/* 187 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _srcJs = __webpack_require__(108);

	var React = __webpack_require__(100);
	var Prettify = __webpack_require__(176);

	module.exports = React.createClass({
	  displayName: 'Pages/Tree',

	  mixins: [Prettify],

	  getInitialState: function getInitialState() {
	    return {
	      readOnly: false,
	      checkAble: true,
	      greedy: false,
	      sep: ',',
	      value: 'role_delete',
	      showValue: 'role_delete',
	      treeData: null
	    };
	  },

	  componentWillMount: function componentWillMount() {
	    var _this = this;

	    _srcJs.Qwest.get('json/tree.json', null, { cache: true }).then(function (res) {
	      _this.setState({ treeData: JSON.stringify(res, null, 2) });
	    });
	  },

	  handleChange: function handleChange() {
	    var value = JSON.stringify(this.refs.tree.getValue());
	    this.setState({ showValue: value });
	  },

	  sepChange: function sepChange(sep) {
	    var _this2 = this;

	    this.setState({ sep: sep });
	    setTimeout(function () {
	      return _this2.handleChange();
	    }, 0);
	  },

	  render: function render() {
	    var _this3 = this;

	    var seps = [',', '|', '#', null].map(function (sep, i) {
	      return React.createElement(
	        'a',
	        { key: i, style: { margin: '0 10px' }, onClick: _this3.sepChange.bind(_this3, sep) },
	        JSON.stringify(sep)
	      );
	    });
	    return React.createElement(
	      'div',
	      null,
	      React.createElement(
	        'div',
	        { className: 'header' },
	        React.createElement(
	          'h1',
	          null,
	          'Tree'
	        )
	      ),
	      React.createElement(
	        'div',
	        { className: 'content' },
	        React.createElement(
	          'pre',
	          { className: 'prettyprint' },
	          '<Tree\n  className={string}  // class\n  checkAble={bool}    // 是否可编辑，默认为 false\n  data={array}        // 数据，与 src 二选一，优先使用 data\n  src="string"        // 服务器端数据地址，与 data 二选一\n  cache={bool}        // 数据缓存，只有当数据为远程获取时有效。默认为 true\n  sep={string|null}   // 返回值分隔字符，默认值为 ","。为 "" 或 null 时，返回值类型为 array\n  greedy={bool}       // 为true时，getValue返回的值包含半选中项\n  onClick={function(data)}  // 点击某元素触发事件，参数为当前节点\n  onChange={function} // 当选项改变时回调方法，参数为 value\n  readOnly={bool}     // 为 true 时，只读。默认为 false\n  textTpl="string"    // 显示文字模板，默认为 "{text}"\n  valueTpl="string"   // 返回数据模板，默认为 "{id}"\n  value={string|array}\n/>'
	        ),
	        React.createElement(
	          'h2',
	          { className: 'subhead' },
	          'Example'
	        ),
	        React.createElement(
	          'p',
	          null,
	          React.createElement(_srcJs.Tree, { ref: 'tree', src: 'json/tree.json',
	            readOnly: this.state.readOnly,
	            checkAble: this.state.checkAble,
	            greedy: this.state.greedy,
	            onClick: function (item) {
	              return _this3.refs.textClick.getDOMNode().innerText = 'clicked ' + item.text;
	            },
	            onChange: this.handleChange,
	            textTpl: '{text}({id})',
	            valueTpl: '{id}',
	            value: this.state.value,
	            open: true,
	            sep: this.state.sep
	          })
	        ),
	        React.createElement(
	          'p',
	          null,
	          React.createElement(_srcJs.Checkbox, { onChange: function (value) {
	              return _this3.setState({ checkAble: value });
	            }, checked: this.state.checkAble, text: 'checkAble' }),
	          ' ',
	          React.createElement(_srcJs.Checkbox, { onChange: function (value) {
	              return _this3.setState({ readOnly: value });
	            }, checked: this.state.readOnly, text: 'readOnly' }),
	          ' ',
	          React.createElement(_srcJs.Checkbox, { onChange: function (value) {
	              return _this3.setState({ greedy: value });
	            }, checked: this.state.gre, text: 'greedy' })
	        ),
	        React.createElement(
	          'p',
	          null,
	          'sep: ',
	          seps
	        ),
	        React.createElement(
	          'p',
	          null,
	          'value: ',
	          this.state.showValue
	        ),
	        React.createElement('p', { ref: 'textClick' }),
	        React.createElement(
	          'pre',
	          { className: 'prettyprint' },
	          '<Tree ref="tree" src="json/tree.json"\n  readOnly={this.state.readOnly}\n  checkAble={this.state.checkAble}\n  greedy={this.state.greedy}\n  onChange={this.handleChange}\n  onClick={item => this.refs.textClick.getDOMNode().innerText = \'clicked \' + item.text}\n  textTpl="{text}({id})"\n  valueTpl="{id}"\n  value={this.state.value}\n  open={true}\n  sep={this.state.sep}\n/>\n\n<Checkbox onChange={(value)=>this.setState({ checkAble: value })}\n  checked={this.state.checkAble} text="checkAble" />\n<Checkbox onChange={(value)=>this.setState({ readOnly: value })}\n  checked={this.state.readOnly} text="readOnly" />\n<Checkbox onChange={(value)=>this.setState({ greedy: value })}\n  checked={this.state.gre} text="greedy" />\n<a onClick={this.changeKey}>Switch Key</a>\n'
	        ),
	        React.createElement(
	          'h2',
	          { className: 'subhead' },
	          '数据格式'
	        ),
	        React.createElement(
	          'pre',
	          { className: 'prettyprint' },
	          this.state.treeData
	        )
	      )
	    );
	  }
	});

/***/ },
/* 188 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _srcJs = __webpack_require__(108);

	var React = __webpack_require__(100);
	var Prettify = __webpack_require__(176);

	module.exports = React.createClass({
	  displayName: 'Pages/Button',

	  mixins: [Prettify],

	  disableExample: function disableExample(event) {
	    var button = this.refs.button;
	    if (event.target.checked) {
	      button.disable(React.createElement(
	        'span',
	        null,
	        React.createElement(_srcJs.Icon, { icon: 'lock' }),
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
	          '<Button\n  className={string}   // class\n  type="submit|button" // 按钮类型，可选值为 submit|button ，不填默认值为 button\n  disabled={bool}      // 与 button 的 disabled 属性相同\n  once={bool}          // 值为 true 时，当button点击过后，状态会变更为 disabled\n                       // 必须调用 enable 方法激活才能再次使用。默认值为 false\n  status="string"      // 按钮类别，会为按钮添加 pure-button-[status] 的 className\n  onClick={function}>  // 点击事件\n  {string|element}     // 文字或元素\n</Button>'
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
	            _srcJs.Button,
	            { status: 'primary' },
	            'Primary Button'
	          ),
	          ' ',
	          React.createElement(
	            _srcJs.Button,
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
	            _srcJs.Button,
	            null,
	            React.createElement(_srcJs.Icon, { icon: 'home' }),
	            ' Home'
	          ),
	          ' ',
	          React.createElement(
	            _srcJs.Button,
	            null,
	            React.createElement(_srcJs.Icon, { icon: 'cog' }),
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
	            _srcJs.Button,
	            { status: 'success' },
	            'Success Button'
	          ),
	          ' ',
	          React.createElement(
	            _srcJs.Button,
	            { status: 'warning' },
	            'Warning Button'
	          ),
	          ' ',
	          React.createElement(
	            _srcJs.Button,
	            { status: 'error' },
	            'Error Button'
	          ),
	          ' ',
	          React.createElement(
	            _srcJs.Button,
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
	            _srcJs.Button,
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
	            _srcJs.Button,
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
	            _srcJs.Button,
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
/* 189 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(100);
	var Prettify = __webpack_require__(176);
	var Icon = __webpack_require__(142);

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
	          '图标，使用'
	        )
	      ),
	      React.createElement(
	        'div',
	        { className: 'content' },
	        React.createElement(
	          'p',
	          null,
	          '支持 ',
	          React.createElement(
	            'a',
	            { href: 'http://fontawesome.io/' },
	            'font-awesome'
	          ),
	          ' 和 ',
	          React.createElement(
	            'a',
	            { href: 'http://zavoloklom.github.io/material-design-iconic-font/' },
	            'material-design-iconic-font'
	          ),
	          React.createElement('br', null),
	          '默认的前缀为 ',
	          React.createElement(
	            'em',
	            null,
	            'icon'
	          ),
	          '，如果使用less，生成这两个字体的css时，指定 ',
	          React.createElement(
	            'em',
	            null,
	            'prefix'
	          ),
	          ' 为 ',
	          React.createElement(
	            'em',
	            null,
	            'icon'
	          ),
	          React.createElement('br', null),
	          '如果使用这两个字体原生的前缀 ',
	          React.createElement(
	            'em',
	            null,
	            'fa'
	          ),
	          ' 或者 ',
	          React.createElement(
	            'em',
	            null,
	            'zmdi'
	          ),
	          '，调用 ',
	          React.createElement(
	            'em',
	            null,
	            'Icon.setPrefix(prefix)'
	          ),
	          ' 这个全局方法设置'
	        ),
	        React.createElement(
	          'pre',
	          { className: 'prettyprint' },
	          '<Icon\n  icon="string"     // 图标名称，不带前缀部分\n  spin={bool}       // 是否旋转。默认值为 false\n  size={int|string} // 图标尺寸，可选值为 [lg|2x|3x|4x|5x]，或者为数字 1-5\n  style={object}    // 样式，fontSize、color等等\n/>'
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
	        React.createElement(Icon, { icon: 'settings', spin: true }),
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
	        React.createElement(Icon, { icon: 'home' }),
	        ' normal',
	        React.createElement('br', null),
	        React.createElement(Icon, { icon: 'home', size: 'lg' }),
	        ' lg',
	        React.createElement('br', null),
	        React.createElement(Icon, { icon: 'home', size: 2 }),
	        ' 2x',
	        React.createElement('br', null),
	        React.createElement(Icon, { icon: 'home', size: 3 }),
	        ' 3x',
	        React.createElement('br', null),
	        React.createElement(Icon, { icon: 'home', size: 4 }),
	        ' 4x',
	        React.createElement('br', null),
	        React.createElement(Icon, { icon: 'home', size: 5 }),
	        ' 5x',
	        React.createElement(
	          'pre',
	          { className: 'prettyprint' },
	          '<Icon icon="camera-retro" />\n<Icon icon="home" size="lg" />\n<Icon icon="home" size="2x" />\n<Icon icon="home" size="3" />\n<Icon icon="home" size={4} />\n<Icon icon="home" size={5} />'
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
/* 190 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(100);
	var Prettify = __webpack_require__(176);
	var Lang = __webpack_require__(120);

	module.exports = React.createClass({
	  displayName: 'Pages/Lang',

	  mixins: [Prettify],

	  getInitialState: function getInitialState() {
	    return {
	      path: 'request.status.405',
	      text: Lang.get('request.status.405')
	    };
	  },

	  handleChange: function handleChange(event) {
	    var path = event.target.value;
	    var text = JSON.stringify(Lang.get(path), null, 4) || 'undefined';
	    this.setState({ path: path, text: text });
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
	          'Language'
	        ),
	        React.createElement(
	          'h2',
	          null,
	          '语言包'
	        )
	      ),
	      React.createElement(
	        'div',
	        { className: 'content' },
	        React.createElement(
	          'p',
	          null,
	          '所有提示文字信息都放在 ',
	          React.createElement(
	            'em',
	            null,
	            'lang'
	          ),
	          ' 下。'
	        ),
	        React.createElement(
	          'h2',
	          { className: 'subhead' },
	          'Lang.set(map[,map2...])'
	        ),
	        React.createElement(
	          'p',
	          null,
	          '更新或者增加信息。'
	        ),
	        React.createElement(
	          'h2',
	          { className: 'subhead' },
	          'Lang.get(path)'
	        ),
	        React.createElement(
	          'p',
	          null,
	          '获取信息，',
	          React.createElement(
	            'em',
	            null,
	            'path'
	          ),
	          ' 为 ',
	          React.createElement(
	            'em',
	            null,
	            '.'
	          ),
	          ' 分隔字符串。'
	        ),
	        React.createElement(
	          'p',
	          null,
	          React.createElement('input', { onChange: this.handleChange, value: this.state.path, type: 'text' }),
	          React.createElement(
	            'p',
	            null,
	            this.state.text
	          )
	        ),
	        React.createElement(
	          'h2',
	          { className: 'subhead' },
	          '当前信息'
	        ),
	        React.createElement(
	          'pre',
	          { className: 'prettyprint' },
	          JSON.stringify(Lang.get(), null, 4)
	        )
	      )
	    );
	  }
	});

/***/ },
/* 191 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _srcJs = __webpack_require__(108);

	var React = __webpack_require__(100);
	var Prettify = __webpack_require__(176);

	module.exports = React.createClass({
	  displayName: 'Pages/Pagination',

	  mixins: [Prettify],

	  getInitialState: function getInitialState() {
	    return {
	      index: 2,
	      size: 20,
	      total: 1000,
	      pages: 10,
	      showGo: false
	    };
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
	          'Pagination'
	        ),
	        React.createElement(
	          'h2',
	          null,
	          '分页'
	        )
	      ),
	      React.createElement(
	        'div',
	        { className: 'content' },
	        React.createElement(
	          'pre',
	          { className: 'prettyprint' },
	          '<Pagination\n  index={int}         // 当前页码，默认为 1\n  size={int}          // 每页显示条数，默认为 20\n  pages={int}         // 显示的页码数， 默认为 10\n  total={int}         // 总条目数，默认为 0\n  showGo={bool}       // 是否可以输入页码，默认为 false\n  onChange={function} // 页码点击时触发事件，参数为页码\n/>'
	        ),
	        React.createElement(
	          'h2',
	          { className: 'subhead' },
	          'Example'
	        ),
	        React.createElement(_srcJs.Pagination, {
	          index: this.state.index,
	          size: this.state.size,
	          total: this.state.total,
	          pages: this.state.pages,
	          showGo: this.state.showGo }),
	        React.createElement(
	          'p',
	          null,
	          'index: ',
	          React.createElement(_srcJs.Input, { value: this.state.index, onChange: function (v) {
	              return _this.setState({ index: parseInt(v) });
	            } })
	        ),
	        React.createElement(
	          'p',
	          null,
	          'size: ',
	          React.createElement(_srcJs.Input, { value: this.state.size, onChange: function (v) {
	              return _this.setState({ size: parseInt(v) });
	            } })
	        ),
	        React.createElement(
	          'p',
	          null,
	          'total: ',
	          React.createElement(_srcJs.Input, { value: this.state.total, onChange: function (v) {
	              return _this.setState({ total: parseInt(v) });
	            } })
	        ),
	        React.createElement(
	          'p',
	          null,
	          'pages: ',
	          React.createElement(_srcJs.Input, { value: this.state.pages, onChange: function (v) {
	              return _this.setState({ pages: parseInt(v) });
	            } })
	        )
	      )
	    );
	  }
	});

/***/ },
/* 192 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _srcJs = __webpack_require__(108);

	var React = __webpack_require__(100);
	var Prettify = __webpack_require__(176);

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
	            { onClick: function () {
	                return _srcJs.Message.show('Info message.');
	              } },
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
	            { onClick: function () {
	                return _srcJs.Message.show('error message.', 'error');
	              } },
	            'error message'
	          )
	        ),
	        React.createElement(
	          'pre',
	          { className: 'prettyprint' },
	          'Message.show("error message.", "error")'
	        ),
	        React.createElement(
	          'p',
	          null,
	          React.createElement(
	            'a',
	            { onClick: function () {
	                return _srcJs.Message.show(React.createElement(
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
	                ), 'warning');
	              } },
	            'element message'
	          )
	        ),
	        React.createElement(
	          'pre',
	          { className: 'prettyprint' },
	          'Message.show(<div><h3>title</h3><span>span message</span></div>, "warning")'
	        ),
	        React.createElement(
	          'p',
	          null,
	          React.createElement(
	            'a',
	            { onClick: function () {
	                return _srcJs.Message.show(React.createElement(
	                  'span',
	                  null,
	                  React.createElement(_srcJs.Icon, { icon: 'music' }),
	                  ' success and icon'
	                ), 'success');
	              } },
	            'success message'
	          )
	        ),
	        React.createElement(
	          'pre',
	          { className: 'prettyprint' },
	          'Message.success(<span><Icon icon="music" /> success and icon</span>, "success")'
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
/* 193 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(100);

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
/* 194 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "index.html"

/***/ },
/* 195 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "./json/countries.json"

/***/ },
/* 196 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "./json/form.json"

/***/ },
/* 197 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "./json/text-value.json"

/***/ },
/* 198 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "./json/tree.json"

/***/ }
/******/ ])
});
;