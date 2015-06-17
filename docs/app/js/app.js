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
	__webpack_require__(158);

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

	var _ = __webpack_require__(108);
	var Router = __webpack_require__(106);
	var Route = Router.Route;
	var DefaultRoute = Router.DefaultRoute;

	var Master = __webpack_require__(109);
	var Home = __webpack_require__(157);

	var menulist = [];
	_.forEach(__webpack_require__(112), function (menu) {
	  if (menu.handler) {
	    menulist.push(React.createElement(Route, { name: menu.route, handler: menu.handler }));
	  }
	});

	var AppRoutes = React.createElement(
	  Route,
	  { name: 'root', path: '/', handler: Master },
	  React.createElement(Route, { name: 'home', handler: Home }),
	  menulist,
	  React.createElement(DefaultRoute, { handler: Home })
	);

	module.exports = AppRoutes;

/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;//     Underscore.js 1.8.3
	//     http://underscorejs.org
	//     (c) 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	//     Underscore may be freely distributed under the MIT license.

	'use strict';

	(function () {

	  // Baseline setup
	  // --------------

	  // Establish the root object, `window` in the browser, or `exports` on the server.
	  var root = this;

	  // Save the previous value of the `_` variable.
	  var previousUnderscore = root._;

	  // Save bytes in the minified (but not gzipped) version:
	  var ArrayProto = Array.prototype,
	      ObjProto = Object.prototype,
	      FuncProto = Function.prototype;

	  // Create quick reference variables for speed access to core prototypes.
	  var push = ArrayProto.push,
	      slice = ArrayProto.slice,
	      toString = ObjProto.toString,
	      hasOwnProperty = ObjProto.hasOwnProperty;

	  // All **ECMAScript 5** native function implementations that we hope to use
	  // are declared here.
	  var nativeIsArray = Array.isArray,
	      nativeKeys = Object.keys,
	      nativeBind = FuncProto.bind,
	      nativeCreate = Object.create;

	  // Naked function reference for surrogate-prototype-swapping.
	  var Ctor = function Ctor() {};

	  // Create a safe reference to the Underscore object for use below.
	  var _ = function _(obj) {
	    if (obj instanceof _) return obj;
	    if (!(this instanceof _)) return new _(obj);
	    this._wrapped = obj;
	  };

	  // Export the Underscore object for **Node.js**, with
	  // backwards-compatibility for the old `require()` API. If we're in
	  // the browser, add `_` as a global object.
	  if (true) {
	    if (typeof module !== 'undefined' && module.exports) {
	      exports = module.exports = _;
	    }
	    exports._ = _;
	  } else {
	    root._ = _;
	  }

	  // Current version.
	  _.VERSION = '1.8.3';

	  // Internal function that returns an efficient (for current engines) version
	  // of the passed-in callback, to be repeatedly applied in other Underscore
	  // functions.
	  var optimizeCb = function optimizeCb(func, context, argCount) {
	    if (context === void 0) return func;
	    switch (argCount == null ? 3 : argCount) {
	      case 1:
	        return function (value) {
	          return func.call(context, value);
	        };
	      case 2:
	        return function (value, other) {
	          return func.call(context, value, other);
	        };
	      case 3:
	        return function (value, index, collection) {
	          return func.call(context, value, index, collection);
	        };
	      case 4:
	        return function (accumulator, value, index, collection) {
	          return func.call(context, accumulator, value, index, collection);
	        };
	    }
	    return function () {
	      return func.apply(context, arguments);
	    };
	  };

	  // A mostly-internal function to generate callbacks that can be applied
	  // to each element in a collection, returning the desired result — either
	  // identity, an arbitrary callback, a property matcher, or a property accessor.
	  var cb = function cb(value, context, argCount) {
	    if (value == null) return _.identity;
	    if (_.isFunction(value)) return optimizeCb(value, context, argCount);
	    if (_.isObject(value)) return _.matcher(value);
	    return _.property(value);
	  };
	  _.iteratee = function (value, context) {
	    return cb(value, context, Infinity);
	  };

	  // An internal function for creating assigner functions.
	  var createAssigner = function createAssigner(keysFunc, undefinedOnly) {
	    return function (obj) {
	      var length = arguments.length;
	      if (length < 2 || obj == null) return obj;
	      for (var index = 1; index < length; index++) {
	        var source = arguments[index],
	            keys = keysFunc(source),
	            l = keys.length;
	        for (var i = 0; i < l; i++) {
	          var key = keys[i];
	          if (!undefinedOnly || obj[key] === void 0) obj[key] = source[key];
	        }
	      }
	      return obj;
	    };
	  };

	  // An internal function for creating a new object that inherits from another.
	  var baseCreate = function baseCreate(prototype) {
	    if (!_.isObject(prototype)) return {};
	    if (nativeCreate) return nativeCreate(prototype);
	    Ctor.prototype = prototype;
	    var result = new Ctor();
	    Ctor.prototype = null;
	    return result;
	  };

	  var property = function property(key) {
	    return function (obj) {
	      return obj == null ? void 0 : obj[key];
	    };
	  };

	  // Helper for collection methods to determine whether a collection
	  // should be iterated as an array or as an object
	  // Related: http://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength
	  // Avoids a very nasty iOS 8 JIT bug on ARM-64. #2094
	  var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
	  var getLength = property('length');
	  var isArrayLike = function isArrayLike(collection) {
	    var length = getLength(collection);
	    return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
	  };

	  // Collection Functions
	  // --------------------

	  // The cornerstone, an `each` implementation, aka `forEach`.
	  // Handles raw objects in addition to array-likes. Treats all
	  // sparse array-likes as if they were dense.
	  _.each = _.forEach = function (obj, iteratee, context) {
	    iteratee = optimizeCb(iteratee, context);
	    var i, length;
	    if (isArrayLike(obj)) {
	      for (i = 0, length = obj.length; i < length; i++) {
	        iteratee(obj[i], i, obj);
	      }
	    } else {
	      var keys = _.keys(obj);
	      for (i = 0, length = keys.length; i < length; i++) {
	        iteratee(obj[keys[i]], keys[i], obj);
	      }
	    }
	    return obj;
	  };

	  // Return the results of applying the iteratee to each element.
	  _.map = _.collect = function (obj, iteratee, context) {
	    iteratee = cb(iteratee, context);
	    var keys = !isArrayLike(obj) && _.keys(obj),
	        length = (keys || obj).length,
	        results = Array(length);
	    for (var index = 0; index < length; index++) {
	      var currentKey = keys ? keys[index] : index;
	      results[index] = iteratee(obj[currentKey], currentKey, obj);
	    }
	    return results;
	  };

	  // Create a reducing function iterating left or right.
	  function createReduce(dir) {
	    // Optimized iterator function as using arguments.length
	    // in the main function will deoptimize the, see #1991.
	    function iterator(obj, iteratee, memo, keys, index, length) {
	      for (; index >= 0 && index < length; index += dir) {
	        var currentKey = keys ? keys[index] : index;
	        memo = iteratee(memo, obj[currentKey], currentKey, obj);
	      }
	      return memo;
	    }

	    return function (obj, iteratee, memo, context) {
	      iteratee = optimizeCb(iteratee, context, 4);
	      var keys = !isArrayLike(obj) && _.keys(obj),
	          length = (keys || obj).length,
	          index = dir > 0 ? 0 : length - 1;
	      // Determine the initial value if none is provided.
	      if (arguments.length < 3) {
	        memo = obj[keys ? keys[index] : index];
	        index += dir;
	      }
	      return iterator(obj, iteratee, memo, keys, index, length);
	    };
	  }

	  // **Reduce** builds up a single result from a list of values, aka `inject`,
	  // or `foldl`.
	  _.reduce = _.foldl = _.inject = createReduce(1);

	  // The right-associative version of reduce, also known as `foldr`.
	  _.reduceRight = _.foldr = createReduce(-1);

	  // Return the first value which passes a truth test. Aliased as `detect`.
	  _.find = _.detect = function (obj, predicate, context) {
	    var key;
	    if (isArrayLike(obj)) {
	      key = _.findIndex(obj, predicate, context);
	    } else {
	      key = _.findKey(obj, predicate, context);
	    }
	    if (key !== void 0 && key !== -1) return obj[key];
	  };

	  // Return all the elements that pass a truth test.
	  // Aliased as `select`.
	  _.filter = _.select = function (obj, predicate, context) {
	    var results = [];
	    predicate = cb(predicate, context);
	    _.each(obj, function (value, index, list) {
	      if (predicate(value, index, list)) results.push(value);
	    });
	    return results;
	  };

	  // Return all the elements for which a truth test fails.
	  _.reject = function (obj, predicate, context) {
	    return _.filter(obj, _.negate(cb(predicate)), context);
	  };

	  // Determine whether all of the elements match a truth test.
	  // Aliased as `all`.
	  _.every = _.all = function (obj, predicate, context) {
	    predicate = cb(predicate, context);
	    var keys = !isArrayLike(obj) && _.keys(obj),
	        length = (keys || obj).length;
	    for (var index = 0; index < length; index++) {
	      var currentKey = keys ? keys[index] : index;
	      if (!predicate(obj[currentKey], currentKey, obj)) return false;
	    }
	    return true;
	  };

	  // Determine if at least one element in the object matches a truth test.
	  // Aliased as `any`.
	  _.some = _.any = function (obj, predicate, context) {
	    predicate = cb(predicate, context);
	    var keys = !isArrayLike(obj) && _.keys(obj),
	        length = (keys || obj).length;
	    for (var index = 0; index < length; index++) {
	      var currentKey = keys ? keys[index] : index;
	      if (predicate(obj[currentKey], currentKey, obj)) return true;
	    }
	    return false;
	  };

	  // Determine if the array or object contains a given item (using `===`).
	  // Aliased as `includes` and `include`.
	  _.contains = _.includes = _.include = function (obj, item, fromIndex, guard) {
	    if (!isArrayLike(obj)) obj = _.values(obj);
	    if (typeof fromIndex != 'number' || guard) fromIndex = 0;
	    return _.indexOf(obj, item, fromIndex) >= 0;
	  };

	  // Invoke a method (with arguments) on every item in a collection.
	  _.invoke = function (obj, method) {
	    var args = slice.call(arguments, 2);
	    var isFunc = _.isFunction(method);
	    return _.map(obj, function (value) {
	      var func = isFunc ? method : value[method];
	      return func == null ? func : func.apply(value, args);
	    });
	  };

	  // Convenience version of a common use case of `map`: fetching a property.
	  _.pluck = function (obj, key) {
	    return _.map(obj, _.property(key));
	  };

	  // Convenience version of a common use case of `filter`: selecting only objects
	  // containing specific `key:value` pairs.
	  _.where = function (obj, attrs) {
	    return _.filter(obj, _.matcher(attrs));
	  };

	  // Convenience version of a common use case of `find`: getting the first object
	  // containing specific `key:value` pairs.
	  _.findWhere = function (obj, attrs) {
	    return _.find(obj, _.matcher(attrs));
	  };

	  // Return the maximum element (or element-based computation).
	  _.max = function (obj, iteratee, context) {
	    var result = -Infinity,
	        lastComputed = -Infinity,
	        value,
	        computed;
	    if (iteratee == null && obj != null) {
	      obj = isArrayLike(obj) ? obj : _.values(obj);
	      for (var i = 0, length = obj.length; i < length; i++) {
	        value = obj[i];
	        if (value > result) {
	          result = value;
	        }
	      }
	    } else {
	      iteratee = cb(iteratee, context);
	      _.each(obj, function (value, index, list) {
	        computed = iteratee(value, index, list);
	        if (computed > lastComputed || computed === -Infinity && result === -Infinity) {
	          result = value;
	          lastComputed = computed;
	        }
	      });
	    }
	    return result;
	  };

	  // Return the minimum element (or element-based computation).
	  _.min = function (obj, iteratee, context) {
	    var result = Infinity,
	        lastComputed = Infinity,
	        value,
	        computed;
	    if (iteratee == null && obj != null) {
	      obj = isArrayLike(obj) ? obj : _.values(obj);
	      for (var i = 0, length = obj.length; i < length; i++) {
	        value = obj[i];
	        if (value < result) {
	          result = value;
	        }
	      }
	    } else {
	      iteratee = cb(iteratee, context);
	      _.each(obj, function (value, index, list) {
	        computed = iteratee(value, index, list);
	        if (computed < lastComputed || computed === Infinity && result === Infinity) {
	          result = value;
	          lastComputed = computed;
	        }
	      });
	    }
	    return result;
	  };

	  // Shuffle a collection, using the modern version of the
	  // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
	  _.shuffle = function (obj) {
	    var set = isArrayLike(obj) ? obj : _.values(obj);
	    var length = set.length;
	    var shuffled = Array(length);
	    for (var index = 0, rand; index < length; index++) {
	      rand = _.random(0, index);
	      if (rand !== index) shuffled[index] = shuffled[rand];
	      shuffled[rand] = set[index];
	    }
	    return shuffled;
	  };

	  // Sample **n** random values from a collection.
	  // If **n** is not specified, returns a single random element.
	  // The internal `guard` argument allows it to work with `map`.
	  _.sample = function (obj, n, guard) {
	    if (n == null || guard) {
	      if (!isArrayLike(obj)) obj = _.values(obj);
	      return obj[_.random(obj.length - 1)];
	    }
	    return _.shuffle(obj).slice(0, Math.max(0, n));
	  };

	  // Sort the object's values by a criterion produced by an iteratee.
	  _.sortBy = function (obj, iteratee, context) {
	    iteratee = cb(iteratee, context);
	    return _.pluck(_.map(obj, function (value, index, list) {
	      return {
	        value: value,
	        index: index,
	        criteria: iteratee(value, index, list)
	      };
	    }).sort(function (left, right) {
	      var a = left.criteria;
	      var b = right.criteria;
	      if (a !== b) {
	        if (a > b || a === void 0) return 1;
	        if (a < b || b === void 0) return -1;
	      }
	      return left.index - right.index;
	    }), 'value');
	  };

	  // An internal function used for aggregate "group by" operations.
	  var group = function group(behavior) {
	    return function (obj, iteratee, context) {
	      var result = {};
	      iteratee = cb(iteratee, context);
	      _.each(obj, function (value, index) {
	        var key = iteratee(value, index, obj);
	        behavior(result, value, key);
	      });
	      return result;
	    };
	  };

	  // Groups the object's values by a criterion. Pass either a string attribute
	  // to group by, or a function that returns the criterion.
	  _.groupBy = group(function (result, value, key) {
	    if (_.has(result, key)) result[key].push(value);else result[key] = [value];
	  });

	  // Indexes the object's values by a criterion, similar to `groupBy`, but for
	  // when you know that your index values will be unique.
	  _.indexBy = group(function (result, value, key) {
	    result[key] = value;
	  });

	  // Counts instances of an object that group by a certain criterion. Pass
	  // either a string attribute to count by, or a function that returns the
	  // criterion.
	  _.countBy = group(function (result, value, key) {
	    if (_.has(result, key)) result[key]++;else result[key] = 1;
	  });

	  // Safely create a real, live array from anything iterable.
	  _.toArray = function (obj) {
	    if (!obj) return [];
	    if (_.isArray(obj)) return slice.call(obj);
	    if (isArrayLike(obj)) return _.map(obj, _.identity);
	    return _.values(obj);
	  };

	  // Return the number of elements in an object.
	  _.size = function (obj) {
	    if (obj == null) return 0;
	    return isArrayLike(obj) ? obj.length : _.keys(obj).length;
	  };

	  // Split a collection into two arrays: one whose elements all satisfy the given
	  // predicate, and one whose elements all do not satisfy the predicate.
	  _.partition = function (obj, predicate, context) {
	    predicate = cb(predicate, context);
	    var pass = [],
	        fail = [];
	    _.each(obj, function (value, key, obj) {
	      (predicate(value, key, obj) ? pass : fail).push(value);
	    });
	    return [pass, fail];
	  };

	  // Array Functions
	  // ---------------

	  // Get the first element of an array. Passing **n** will return the first N
	  // values in the array. Aliased as `head` and `take`. The **guard** check
	  // allows it to work with `_.map`.
	  _.first = _.head = _.take = function (array, n, guard) {
	    if (array == null) return void 0;
	    if (n == null || guard) return array[0];
	    return _.initial(array, array.length - n);
	  };

	  // Returns everything but the last entry of the array. Especially useful on
	  // the arguments object. Passing **n** will return all the values in
	  // the array, excluding the last N.
	  _.initial = function (array, n, guard) {
	    return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
	  };

	  // Get the last element of an array. Passing **n** will return the last N
	  // values in the array.
	  _.last = function (array, n, guard) {
	    if (array == null) return void 0;
	    if (n == null || guard) return array[array.length - 1];
	    return _.rest(array, Math.max(0, array.length - n));
	  };

	  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
	  // Especially useful on the arguments object. Passing an **n** will return
	  // the rest N values in the array.
	  _.rest = _.tail = _.drop = function (array, n, guard) {
	    return slice.call(array, n == null || guard ? 1 : n);
	  };

	  // Trim out all falsy values from an array.
	  _.compact = function (array) {
	    return _.filter(array, _.identity);
	  };

	  // Internal implementation of a recursive `flatten` function.
	  var flatten = function flatten(input, shallow, strict, startIndex) {
	    var output = [],
	        idx = 0;
	    for (var i = startIndex || 0, length = getLength(input); i < length; i++) {
	      var value = input[i];
	      if (isArrayLike(value) && (_.isArray(value) || _.isArguments(value))) {
	        //flatten current level of array or arguments object
	        if (!shallow) value = flatten(value, shallow, strict);
	        var j = 0,
	            len = value.length;
	        output.length += len;
	        while (j < len) {
	          output[idx++] = value[j++];
	        }
	      } else if (!strict) {
	        output[idx++] = value;
	      }
	    }
	    return output;
	  };

	  // Flatten out an array, either recursively (by default), or just one level.
	  _.flatten = function (array, shallow) {
	    return flatten(array, shallow, false);
	  };

	  // Return a version of the array that does not contain the specified value(s).
	  _.without = function (array) {
	    return _.difference(array, slice.call(arguments, 1));
	  };

	  // Produce a duplicate-free version of the array. If the array has already
	  // been sorted, you have the option of using a faster algorithm.
	  // Aliased as `unique`.
	  _.uniq = _.unique = function (array, isSorted, iteratee, context) {
	    if (!_.isBoolean(isSorted)) {
	      context = iteratee;
	      iteratee = isSorted;
	      isSorted = false;
	    }
	    if (iteratee != null) iteratee = cb(iteratee, context);
	    var result = [];
	    var seen = [];
	    for (var i = 0, length = getLength(array); i < length; i++) {
	      var value = array[i],
	          computed = iteratee ? iteratee(value, i, array) : value;
	      if (isSorted) {
	        if (!i || seen !== computed) result.push(value);
	        seen = computed;
	      } else if (iteratee) {
	        if (!_.contains(seen, computed)) {
	          seen.push(computed);
	          result.push(value);
	        }
	      } else if (!_.contains(result, value)) {
	        result.push(value);
	      }
	    }
	    return result;
	  };

	  // Produce an array that contains the union: each distinct element from all of
	  // the passed-in arrays.
	  _.union = function () {
	    return _.uniq(flatten(arguments, true, true));
	  };

	  // Produce an array that contains every item shared between all the
	  // passed-in arrays.
	  _.intersection = function (array) {
	    var result = [];
	    var argsLength = arguments.length;
	    for (var i = 0, length = getLength(array); i < length; i++) {
	      var item = array[i];
	      if (_.contains(result, item)) continue;
	      for (var j = 1; j < argsLength; j++) {
	        if (!_.contains(arguments[j], item)) break;
	      }
	      if (j === argsLength) result.push(item);
	    }
	    return result;
	  };

	  // Take the difference between one array and a number of other arrays.
	  // Only the elements present in just the first array will remain.
	  _.difference = function (array) {
	    var rest = flatten(arguments, true, true, 1);
	    return _.filter(array, function (value) {
	      return !_.contains(rest, value);
	    });
	  };

	  // Zip together multiple lists into a single array -- elements that share
	  // an index go together.
	  _.zip = function () {
	    return _.unzip(arguments);
	  };

	  // Complement of _.zip. Unzip accepts an array of arrays and groups
	  // each array's elements on shared indices
	  _.unzip = function (array) {
	    var length = array && _.max(array, getLength).length || 0;
	    var result = Array(length);

	    for (var index = 0; index < length; index++) {
	      result[index] = _.pluck(array, index);
	    }
	    return result;
	  };

	  // Converts lists into objects. Pass either a single array of `[key, value]`
	  // pairs, or two parallel arrays of the same length -- one of keys, and one of
	  // the corresponding values.
	  _.object = function (list, values) {
	    var result = {};
	    for (var i = 0, length = getLength(list); i < length; i++) {
	      if (values) {
	        result[list[i]] = values[i];
	      } else {
	        result[list[i][0]] = list[i][1];
	      }
	    }
	    return result;
	  };

	  // Generator function to create the findIndex and findLastIndex functions
	  function createPredicateIndexFinder(dir) {
	    return function (array, predicate, context) {
	      predicate = cb(predicate, context);
	      var length = getLength(array);
	      var index = dir > 0 ? 0 : length - 1;
	      for (; index >= 0 && index < length; index += dir) {
	        if (predicate(array[index], index, array)) return index;
	      }
	      return -1;
	    };
	  }

	  // Returns the first index on an array-like that passes a predicate test
	  _.findIndex = createPredicateIndexFinder(1);
	  _.findLastIndex = createPredicateIndexFinder(-1);

	  // Use a comparator function to figure out the smallest index at which
	  // an object should be inserted so as to maintain order. Uses binary search.
	  _.sortedIndex = function (array, obj, iteratee, context) {
	    iteratee = cb(iteratee, context, 1);
	    var value = iteratee(obj);
	    var low = 0,
	        high = getLength(array);
	    while (low < high) {
	      var mid = Math.floor((low + high) / 2);
	      if (iteratee(array[mid]) < value) low = mid + 1;else high = mid;
	    }
	    return low;
	  };

	  // Generator function to create the indexOf and lastIndexOf functions
	  function createIndexFinder(dir, predicateFind, sortedIndex) {
	    return function (array, item, idx) {
	      var i = 0,
	          length = getLength(array);
	      if (typeof idx == 'number') {
	        if (dir > 0) {
	          i = idx >= 0 ? idx : Math.max(idx + length, i);
	        } else {
	          length = idx >= 0 ? Math.min(idx + 1, length) : idx + length + 1;
	        }
	      } else if (sortedIndex && idx && length) {
	        idx = sortedIndex(array, item);
	        return array[idx] === item ? idx : -1;
	      }
	      if (item !== item) {
	        idx = predicateFind(slice.call(array, i, length), _.isNaN);
	        return idx >= 0 ? idx + i : -1;
	      }
	      for (idx = dir > 0 ? i : length - 1; idx >= 0 && idx < length; idx += dir) {
	        if (array[idx] === item) return idx;
	      }
	      return -1;
	    };
	  }

	  // Return the position of the first occurrence of an item in an array,
	  // or -1 if the item is not included in the array.
	  // If the array is large and already in sort order, pass `true`
	  // for **isSorted** to use binary search.
	  _.indexOf = createIndexFinder(1, _.findIndex, _.sortedIndex);
	  _.lastIndexOf = createIndexFinder(-1, _.findLastIndex);

	  // Generate an integer Array containing an arithmetic progression. A port of
	  // the native Python `range()` function. See
	  // [the Python documentation](http://docs.python.org/library/functions.html#range).
	  _.range = function (start, stop, step) {
	    if (stop == null) {
	      stop = start || 0;
	      start = 0;
	    }
	    step = step || 1;

	    var length = Math.max(Math.ceil((stop - start) / step), 0);
	    var range = Array(length);

	    for (var idx = 0; idx < length; idx++, start += step) {
	      range[idx] = start;
	    }

	    return range;
	  };

	  // Function (ahem) Functions
	  // ------------------

	  // Determines whether to execute a function as a constructor
	  // or a normal function with the provided arguments
	  var executeBound = function executeBound(sourceFunc, boundFunc, context, callingContext, args) {
	    if (!(callingContext instanceof boundFunc)) return sourceFunc.apply(context, args);
	    var self = baseCreate(sourceFunc.prototype);
	    var result = sourceFunc.apply(self, args);
	    if (_.isObject(result)) return result;
	    return self;
	  };

	  // Create a function bound to a given object (assigning `this`, and arguments,
	  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
	  // available.
	  _.bind = function (func, context) {
	    if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
	    if (!_.isFunction(func)) throw new TypeError('Bind must be called on a function');
	    var args = slice.call(arguments, 2);
	    var bound = function bound() {
	      return executeBound(func, bound, context, this, args.concat(slice.call(arguments)));
	    };
	    return bound;
	  };

	  // Partially apply a function by creating a version that has had some of its
	  // arguments pre-filled, without changing its dynamic `this` context. _ acts
	  // as a placeholder, allowing any combination of arguments to be pre-filled.
	  _.partial = function (func) {
	    var boundArgs = slice.call(arguments, 1);
	    var bound = function bound() {
	      var position = 0,
	          length = boundArgs.length;
	      var args = Array(length);
	      for (var i = 0; i < length; i++) {
	        args[i] = boundArgs[i] === _ ? arguments[position++] : boundArgs[i];
	      }
	      while (position < arguments.length) args.push(arguments[position++]);
	      return executeBound(func, bound, this, this, args);
	    };
	    return bound;
	  };

	  // Bind a number of an object's methods to that object. Remaining arguments
	  // are the method names to be bound. Useful for ensuring that all callbacks
	  // defined on an object belong to it.
	  _.bindAll = function (obj) {
	    var i,
	        length = arguments.length,
	        key;
	    if (length <= 1) throw new Error('bindAll must be passed function names');
	    for (i = 1; i < length; i++) {
	      key = arguments[i];
	      obj[key] = _.bind(obj[key], obj);
	    }
	    return obj;
	  };

	  // Memoize an expensive function by storing its results.
	  _.memoize = function (func, hasher) {
	    var memoize = function memoize(key) {
	      var cache = memoize.cache;
	      var address = '' + (hasher ? hasher.apply(this, arguments) : key);
	      if (!_.has(cache, address)) cache[address] = func.apply(this, arguments);
	      return cache[address];
	    };
	    memoize.cache = {};
	    return memoize;
	  };

	  // Delays a function for the given number of milliseconds, and then calls
	  // it with the arguments supplied.
	  _.delay = function (func, wait) {
	    var args = slice.call(arguments, 2);
	    return setTimeout(function () {
	      return func.apply(null, args);
	    }, wait);
	  };

	  // Defers a function, scheduling it to run after the current call stack has
	  // cleared.
	  _.defer = _.partial(_.delay, _, 1);

	  // Returns a function, that, when invoked, will only be triggered at most once
	  // during a given window of time. Normally, the throttled function will run
	  // as much as it can, without ever going more than once per `wait` duration;
	  // but if you'd like to disable the execution on the leading edge, pass
	  // `{leading: false}`. To disable execution on the trailing edge, ditto.
	  _.throttle = function (func, wait, options) {
	    var context, args, result;
	    var timeout = null;
	    var previous = 0;
	    if (!options) options = {};
	    var later = function later() {
	      previous = options.leading === false ? 0 : _.now();
	      timeout = null;
	      result = func.apply(context, args);
	      if (!timeout) context = args = null;
	    };
	    return function () {
	      var now = _.now();
	      if (!previous && options.leading === false) previous = now;
	      var remaining = wait - (now - previous);
	      context = this;
	      args = arguments;
	      if (remaining <= 0 || remaining > wait) {
	        if (timeout) {
	          clearTimeout(timeout);
	          timeout = null;
	        }
	        previous = now;
	        result = func.apply(context, args);
	        if (!timeout) context = args = null;
	      } else if (!timeout && options.trailing !== false) {
	        timeout = setTimeout(later, remaining);
	      }
	      return result;
	    };
	  };

	  // Returns a function, that, as long as it continues to be invoked, will not
	  // be triggered. The function will be called after it stops being called for
	  // N milliseconds. If `immediate` is passed, trigger the function on the
	  // leading edge, instead of the trailing.
	  _.debounce = function (func, wait, immediate) {
	    var timeout, args, context, timestamp, result;

	    var later = function later() {
	      var last = _.now() - timestamp;

	      if (last < wait && last >= 0) {
	        timeout = setTimeout(later, wait - last);
	      } else {
	        timeout = null;
	        if (!immediate) {
	          result = func.apply(context, args);
	          if (!timeout) context = args = null;
	        }
	      }
	    };

	    return function () {
	      context = this;
	      args = arguments;
	      timestamp = _.now();
	      var callNow = immediate && !timeout;
	      if (!timeout) timeout = setTimeout(later, wait);
	      if (callNow) {
	        result = func.apply(context, args);
	        context = args = null;
	      }

	      return result;
	    };
	  };

	  // Returns the first function passed as an argument to the second,
	  // allowing you to adjust arguments, run code before and after, and
	  // conditionally execute the original function.
	  _.wrap = function (func, wrapper) {
	    return _.partial(wrapper, func);
	  };

	  // Returns a negated version of the passed-in predicate.
	  _.negate = function (predicate) {
	    return function () {
	      return !predicate.apply(this, arguments);
	    };
	  };

	  // Returns a function that is the composition of a list of functions, each
	  // consuming the return value of the function that follows.
	  _.compose = function () {
	    var args = arguments;
	    var start = args.length - 1;
	    return function () {
	      var i = start;
	      var result = args[start].apply(this, arguments);
	      while (i--) result = args[i].call(this, result);
	      return result;
	    };
	  };

	  // Returns a function that will only be executed on and after the Nth call.
	  _.after = function (times, func) {
	    return function () {
	      if (--times < 1) {
	        return func.apply(this, arguments);
	      }
	    };
	  };

	  // Returns a function that will only be executed up to (but not including) the Nth call.
	  _.before = function (times, func) {
	    var memo;
	    return function () {
	      if (--times > 0) {
	        memo = func.apply(this, arguments);
	      }
	      if (times <= 1) func = null;
	      return memo;
	    };
	  };

	  // Returns a function that will be executed at most one time, no matter how
	  // often you call it. Useful for lazy initialization.
	  _.once = _.partial(_.before, 2);

	  // Object Functions
	  // ----------------

	  // Keys in IE < 9 that won't be iterated by `for key in ...` and thus missed.
	  var hasEnumBug = !({ toString: null }).propertyIsEnumerable('toString');
	  var nonEnumerableProps = ['valueOf', 'isPrototypeOf', 'toString', 'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'];

	  function collectNonEnumProps(obj, keys) {
	    var nonEnumIdx = nonEnumerableProps.length;
	    var constructor = obj.constructor;
	    var proto = _.isFunction(constructor) && constructor.prototype || ObjProto;

	    // Constructor is a special case.
	    var prop = 'constructor';
	    if (_.has(obj, prop) && !_.contains(keys, prop)) keys.push(prop);

	    while (nonEnumIdx--) {
	      prop = nonEnumerableProps[nonEnumIdx];
	      if (prop in obj && obj[prop] !== proto[prop] && !_.contains(keys, prop)) {
	        keys.push(prop);
	      }
	    }
	  }

	  // Retrieve the names of an object's own properties.
	  // Delegates to **ECMAScript 5**'s native `Object.keys`
	  _.keys = function (obj) {
	    if (!_.isObject(obj)) return [];
	    if (nativeKeys) return nativeKeys(obj);
	    var keys = [];
	    for (var key in obj) if (_.has(obj, key)) keys.push(key);
	    // Ahem, IE < 9.
	    if (hasEnumBug) collectNonEnumProps(obj, keys);
	    return keys;
	  };

	  // Retrieve all the property names of an object.
	  _.allKeys = function (obj) {
	    if (!_.isObject(obj)) return [];
	    var keys = [];
	    for (var key in obj) keys.push(key);
	    // Ahem, IE < 9.
	    if (hasEnumBug) collectNonEnumProps(obj, keys);
	    return keys;
	  };

	  // Retrieve the values of an object's properties.
	  _.values = function (obj) {
	    var keys = _.keys(obj);
	    var length = keys.length;
	    var values = Array(length);
	    for (var i = 0; i < length; i++) {
	      values[i] = obj[keys[i]];
	    }
	    return values;
	  };

	  // Returns the results of applying the iteratee to each element of the object
	  // In contrast to _.map it returns an object
	  _.mapObject = function (obj, iteratee, context) {
	    iteratee = cb(iteratee, context);
	    var keys = _.keys(obj),
	        length = keys.length,
	        results = {},
	        currentKey;
	    for (var index = 0; index < length; index++) {
	      currentKey = keys[index];
	      results[currentKey] = iteratee(obj[currentKey], currentKey, obj);
	    }
	    return results;
	  };

	  // Convert an object into a list of `[key, value]` pairs.
	  _.pairs = function (obj) {
	    var keys = _.keys(obj);
	    var length = keys.length;
	    var pairs = Array(length);
	    for (var i = 0; i < length; i++) {
	      pairs[i] = [keys[i], obj[keys[i]]];
	    }
	    return pairs;
	  };

	  // Invert the keys and values of an object. The values must be serializable.
	  _.invert = function (obj) {
	    var result = {};
	    var keys = _.keys(obj);
	    for (var i = 0, length = keys.length; i < length; i++) {
	      result[obj[keys[i]]] = keys[i];
	    }
	    return result;
	  };

	  // Return a sorted list of the function names available on the object.
	  // Aliased as `methods`
	  _.functions = _.methods = function (obj) {
	    var names = [];
	    for (var key in obj) {
	      if (_.isFunction(obj[key])) names.push(key);
	    }
	    return names.sort();
	  };

	  // Extend a given object with all the properties in passed-in object(s).
	  _.extend = createAssigner(_.allKeys);

	  // Assigns a given object with all the own properties in the passed-in object(s)
	  // (https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
	  _.extendOwn = _.assign = createAssigner(_.keys);

	  // Returns the first key on an object that passes a predicate test
	  _.findKey = function (obj, predicate, context) {
	    predicate = cb(predicate, context);
	    var keys = _.keys(obj),
	        key;
	    for (var i = 0, length = keys.length; i < length; i++) {
	      key = keys[i];
	      if (predicate(obj[key], key, obj)) return key;
	    }
	  };

	  // Return a copy of the object only containing the whitelisted properties.
	  _.pick = function (object, oiteratee, context) {
	    var result = {},
	        obj = object,
	        iteratee,
	        keys;
	    if (obj == null) return result;
	    if (_.isFunction(oiteratee)) {
	      keys = _.allKeys(obj);
	      iteratee = optimizeCb(oiteratee, context);
	    } else {
	      keys = flatten(arguments, false, false, 1);
	      iteratee = function (value, key, obj) {
	        return key in obj;
	      };
	      obj = Object(obj);
	    }
	    for (var i = 0, length = keys.length; i < length; i++) {
	      var key = keys[i];
	      var value = obj[key];
	      if (iteratee(value, key, obj)) result[key] = value;
	    }
	    return result;
	  };

	  // Return a copy of the object without the blacklisted properties.
	  _.omit = function (obj, iteratee, context) {
	    if (_.isFunction(iteratee)) {
	      iteratee = _.negate(iteratee);
	    } else {
	      var keys = _.map(flatten(arguments, false, false, 1), String);
	      iteratee = function (value, key) {
	        return !_.contains(keys, key);
	      };
	    }
	    return _.pick(obj, iteratee, context);
	  };

	  // Fill in a given object with default properties.
	  _.defaults = createAssigner(_.allKeys, true);

	  // Creates an object that inherits from the given prototype object.
	  // If additional properties are provided then they will be added to the
	  // created object.
	  _.create = function (prototype, props) {
	    var result = baseCreate(prototype);
	    if (props) _.extendOwn(result, props);
	    return result;
	  };

	  // Create a (shallow-cloned) duplicate of an object.
	  _.clone = function (obj) {
	    if (!_.isObject(obj)) return obj;
	    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
	  };

	  // Invokes interceptor with the obj, and then returns obj.
	  // The primary purpose of this method is to "tap into" a method chain, in
	  // order to perform operations on intermediate results within the chain.
	  _.tap = function (obj, interceptor) {
	    interceptor(obj);
	    return obj;
	  };

	  // Returns whether an object has a given set of `key:value` pairs.
	  _.isMatch = function (object, attrs) {
	    var keys = _.keys(attrs),
	        length = keys.length;
	    if (object == null) return !length;
	    var obj = Object(object);
	    for (var i = 0; i < length; i++) {
	      var key = keys[i];
	      if (attrs[key] !== obj[key] || !(key in obj)) return false;
	    }
	    return true;
	  };

	  // Internal recursive comparison function for `isEqual`.
	  var eq = function eq(a, b, aStack, bStack) {
	    // Identical objects are equal. `0 === -0`, but they aren't identical.
	    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
	    if (a === b) return a !== 0 || 1 / a === 1 / b;
	    // A strict comparison is necessary because `null == undefined`.
	    if (a == null || b == null) return a === b;
	    // Unwrap any wrapped objects.
	    if (a instanceof _) a = a._wrapped;
	    if (b instanceof _) b = b._wrapped;
	    // Compare `[[Class]]` names.
	    var className = toString.call(a);
	    if (className !== toString.call(b)) return false;
	    switch (className) {
	      // Strings, numbers, regular expressions, dates, and booleans are compared by value.
	      case '[object RegExp]':
	      // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
	      case '[object String]':
	        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
	        // equivalent to `new String("5")`.
	        return '' + a === '' + b;
	      case '[object Number]':
	        // `NaN`s are equivalent, but non-reflexive.
	        // Object(NaN) is equivalent to NaN
	        if (+a !== +a) return +b !== +b;
	        // An `egal` comparison is performed for other numeric values.
	        return +a === 0 ? 1 / +a === 1 / b : +a === +b;
	      case '[object Date]':
	      case '[object Boolean]':
	        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
	        // millisecond representations. Note that invalid dates with millisecond representations
	        // of `NaN` are not equivalent.
	        return +a === +b;
	    }

	    var areArrays = className === '[object Array]';
	    if (!areArrays) {
	      if (typeof a != 'object' || typeof b != 'object') return false;

	      // Objects with different constructors are not equivalent, but `Object`s or `Array`s
	      // from different frames are.
	      var aCtor = a.constructor,
	          bCtor = b.constructor;
	      if (aCtor !== bCtor && !(_.isFunction(aCtor) && aCtor instanceof aCtor && _.isFunction(bCtor) && bCtor instanceof bCtor) && ('constructor' in a && 'constructor' in b)) {
	        return false;
	      }
	    }
	    // Assume equality for cyclic structures. The algorithm for detecting cyclic
	    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.

	    // Initializing stack of traversed objects.
	    // It's done here since we only need them for objects and arrays comparison.
	    aStack = aStack || [];
	    bStack = bStack || [];
	    var length = aStack.length;
	    while (length--) {
	      // Linear search. Performance is inversely proportional to the number of
	      // unique nested structures.
	      if (aStack[length] === a) return bStack[length] === b;
	    }

	    // Add the first object to the stack of traversed objects.
	    aStack.push(a);
	    bStack.push(b);

	    // Recursively compare objects and arrays.
	    if (areArrays) {
	      // Compare array lengths to determine if a deep comparison is necessary.
	      length = a.length;
	      if (length !== b.length) return false;
	      // Deep compare the contents, ignoring non-numeric properties.
	      while (length--) {
	        if (!eq(a[length], b[length], aStack, bStack)) return false;
	      }
	    } else {
	      // Deep compare objects.
	      var keys = _.keys(a),
	          key;
	      length = keys.length;
	      // Ensure that both objects contain the same number of properties before comparing deep equality.
	      if (_.keys(b).length !== length) return false;
	      while (length--) {
	        // Deep compare each member
	        key = keys[length];
	        if (!(_.has(b, key) && eq(a[key], b[key], aStack, bStack))) return false;
	      }
	    }
	    // Remove the first object from the stack of traversed objects.
	    aStack.pop();
	    bStack.pop();
	    return true;
	  };

	  // Perform a deep comparison to check if two objects are equal.
	  _.isEqual = function (a, b) {
	    return eq(a, b);
	  };

	  // Is a given array, string, or object empty?
	  // An "empty" object has no enumerable own-properties.
	  _.isEmpty = function (obj) {
	    if (obj == null) return true;
	    if (isArrayLike(obj) && (_.isArray(obj) || _.isString(obj) || _.isArguments(obj))) return obj.length === 0;
	    return _.keys(obj).length === 0;
	  };

	  // Is a given value a DOM element?
	  _.isElement = function (obj) {
	    return !!(obj && obj.nodeType === 1);
	  };

	  // Is a given value an array?
	  // Delegates to ECMA5's native Array.isArray
	  _.isArray = nativeIsArray || function (obj) {
	    return toString.call(obj) === '[object Array]';
	  };

	  // Is a given variable an object?
	  _.isObject = function (obj) {
	    var type = typeof obj;
	    return type === 'function' || type === 'object' && !!obj;
	  };

	  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp, isError.
	  _.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error'], function (name) {
	    _['is' + name] = function (obj) {
	      return toString.call(obj) === '[object ' + name + ']';
	    };
	  });

	  // Define a fallback version of the method in browsers (ahem, IE < 9), where
	  // there isn't any inspectable "Arguments" type.
	  if (!_.isArguments(arguments)) {
	    _.isArguments = function (obj) {
	      return _.has(obj, 'callee');
	    };
	  }

	  // Optimize `isFunction` if appropriate. Work around some typeof bugs in old v8,
	  // IE 11 (#1621), and in Safari 8 (#1929).
	  if (typeof /./ != 'function' && typeof Int8Array != 'object') {
	    _.isFunction = function (obj) {
	      return typeof obj == 'function' || false;
	    };
	  }

	  // Is a given object a finite number?
	  _.isFinite = function (obj) {
	    return isFinite(obj) && !isNaN(parseFloat(obj));
	  };

	  // Is the given value `NaN`? (NaN is the only number which does not equal itself).
	  _.isNaN = function (obj) {
	    return _.isNumber(obj) && obj !== +obj;
	  };

	  // Is a given value a boolean?
	  _.isBoolean = function (obj) {
	    return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
	  };

	  // Is a given value equal to null?
	  _.isNull = function (obj) {
	    return obj === null;
	  };

	  // Is a given variable undefined?
	  _.isUndefined = function (obj) {
	    return obj === void 0;
	  };

	  // Shortcut function for checking if an object has a given property directly
	  // on itself (in other words, not on a prototype).
	  _.has = function (obj, key) {
	    return obj != null && hasOwnProperty.call(obj, key);
	  };

	  // Utility Functions
	  // -----------------

	  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
	  // previous owner. Returns a reference to the Underscore object.
	  _.noConflict = function () {
	    root._ = previousUnderscore;
	    return this;
	  };

	  // Keep the identity function around for default iteratees.
	  _.identity = function (value) {
	    return value;
	  };

	  // Predicate-generating functions. Often useful outside of Underscore.
	  _.constant = function (value) {
	    return function () {
	      return value;
	    };
	  };

	  _.noop = function () {};

	  _.property = property;

	  // Generates a function for a given object that returns a given property.
	  _.propertyOf = function (obj) {
	    return obj == null ? function () {} : function (key) {
	      return obj[key];
	    };
	  };

	  // Returns a predicate for checking whether an object has a given set of
	  // `key:value` pairs.
	  _.matcher = _.matches = function (attrs) {
	    attrs = _.extendOwn({}, attrs);
	    return function (obj) {
	      return _.isMatch(obj, attrs);
	    };
	  };

	  // Run a function **n** times.
	  _.times = function (n, iteratee, context) {
	    var accum = Array(Math.max(0, n));
	    iteratee = optimizeCb(iteratee, context, 1);
	    for (var i = 0; i < n; i++) accum[i] = iteratee(i);
	    return accum;
	  };

	  // Return a random integer between min and max (inclusive).
	  _.random = function (min, max) {
	    if (max == null) {
	      max = min;
	      min = 0;
	    }
	    return min + Math.floor(Math.random() * (max - min + 1));
	  };

	  // A (possibly faster) way to get the current timestamp as an integer.
	  _.now = Date.now || function () {
	    return new Date().getTime();
	  };

	  // List of HTML entities for escaping.
	  var escapeMap = {
	    '&': '&amp;',
	    '<': '&lt;',
	    '>': '&gt;',
	    '"': '&quot;',
	    '\'': '&#x27;',
	    '`': '&#x60;'
	  };
	  var unescapeMap = _.invert(escapeMap);

	  // Functions for escaping and unescaping strings to/from HTML interpolation.
	  var createEscaper = function createEscaper(map) {
	    var escaper = function escaper(match) {
	      return map[match];
	    };
	    // Regexes for identifying a key that needs to be escaped
	    var source = '(?:' + _.keys(map).join('|') + ')';
	    var testRegexp = RegExp(source);
	    var replaceRegexp = RegExp(source, 'g');
	    return function (string) {
	      string = string == null ? '' : '' + string;
	      return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
	    };
	  };
	  _.escape = createEscaper(escapeMap);
	  _.unescape = createEscaper(unescapeMap);

	  // If the value of the named `property` is a function then invoke it with the
	  // `object` as context; otherwise, return it.
	  _.result = function (object, property, fallback) {
	    var value = object == null ? void 0 : object[property];
	    if (value === void 0) {
	      value = fallback;
	    }
	    return _.isFunction(value) ? value.call(object) : value;
	  };

	  // Generate a unique integer id (unique within the entire client session).
	  // Useful for temporary DOM ids.
	  var idCounter = 0;
	  _.uniqueId = function (prefix) {
	    var id = ++idCounter + '';
	    return prefix ? prefix + id : id;
	  };

	  // By default, Underscore uses ERB-style template delimiters, change the
	  // following template settings to use alternative delimiters.
	  _.templateSettings = {
	    evaluate: /<%([\s\S]+?)%>/g,
	    interpolate: /<%=([\s\S]+?)%>/g,
	    escape: /<%-([\s\S]+?)%>/g
	  };

	  // When customizing `templateSettings`, if you don't want to define an
	  // interpolation, evaluation or escaping regex, we need one that is
	  // guaranteed not to match.
	  var noMatch = /(.)^/;

	  // Certain characters need to be escaped so that they can be put into a
	  // string literal.
	  var escapes = {
	    '\'': '\'',
	    '\\': '\\',
	    '\r': 'r',
	    '\n': 'n',
	    '\u2028': 'u2028',
	    '\u2029': 'u2029'
	  };

	  var escaper = /\\|'|\r|\n|\u2028|\u2029/g;

	  var escapeChar = function escapeChar(match) {
	    return '\\' + escapes[match];
	  };

	  // JavaScript micro-templating, similar to John Resig's implementation.
	  // Underscore templating handles arbitrary delimiters, preserves whitespace,
	  // and correctly escapes quotes within interpolated code.
	  // NB: `oldSettings` only exists for backwards compatibility.
	  _.template = function (text, settings, oldSettings) {
	    if (!settings && oldSettings) settings = oldSettings;
	    settings = _.defaults({}, settings, _.templateSettings);

	    // Combine delimiters into one regular expression via alternation.
	    var matcher = RegExp([(settings.escape || noMatch).source, (settings.interpolate || noMatch).source, (settings.evaluate || noMatch).source].join('|') + '|$', 'g');

	    // Compile the template source, escaping string literals appropriately.
	    var index = 0;
	    var source = '__p+=\'';
	    text.replace(matcher, function (match, escape, interpolate, evaluate, offset) {
	      source += text.slice(index, offset).replace(escaper, escapeChar);
	      index = offset + match.length;

	      if (escape) {
	        source += '\'+\n((__t=(' + escape + '))==null?\'\':_.escape(__t))+\n\'';
	      } else if (interpolate) {
	        source += '\'+\n((__t=(' + interpolate + '))==null?\'\':__t)+\n\'';
	      } else if (evaluate) {
	        source += '\';\n' + evaluate + '\n__p+=\'';
	      }

	      // Adobe VMs need the match returned to produce the correct offest.
	      return match;
	    });
	    source += '\';\n';

	    // If a variable is not specified, place data values in local scope.
	    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

	    source = 'var __t,__p=\'\',__j=Array.prototype.join,' + 'print=function(){__p+=__j.call(arguments,\'\');};\n' + source + 'return __p;\n';

	    try {
	      var render = new Function(settings.variable || 'obj', '_', source);
	    } catch (e) {
	      e.source = source;
	      throw e;
	    }

	    var template = function template(data) {
	      return render.call(this, data, _);
	    };

	    // Provide the compiled source as a convenience for precompilation.
	    var argument = settings.variable || 'obj';
	    template.source = 'function(' + argument + '){\n' + source + '}';

	    return template;
	  };

	  // Add a "chain" function. Start chaining a wrapped Underscore object.
	  _.chain = function (obj) {
	    var instance = _(obj);
	    instance._chain = true;
	    return instance;
	  };

	  // OOP
	  // ---------------
	  // If Underscore is called as a function, it returns a wrapped object that
	  // can be used OO-style. This wrapper holds altered versions of all the
	  // underscore functions. Wrapped objects may be chained.

	  // Helper function to continue chaining intermediate results.
	  var result = function result(instance, obj) {
	    return instance._chain ? _(obj).chain() : obj;
	  };

	  // Add your own custom functions to the Underscore object.
	  _.mixin = function (obj) {
	    _.each(_.functions(obj), function (name) {
	      var func = _[name] = obj[name];
	      _.prototype[name] = function () {
	        var args = [this._wrapped];
	        push.apply(args, arguments);
	        return result(this, func.apply(_, args));
	      };
	    });
	  };

	  // Add all of the Underscore functions to the wrapper object.
	  _.mixin(_);

	  // Add all mutator Array functions to the wrapper.
	  _.each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function (name) {
	    var method = ArrayProto[name];
	    _.prototype[name] = function () {
	      var obj = this._wrapped;
	      method.apply(obj, arguments);
	      if ((name === 'shift' || name === 'splice') && obj.length === 0) delete obj[0];
	      return result(this, obj);
	    };
	  });

	  // Add all accessor Array functions to the wrapper.
	  _.each(['concat', 'join', 'slice'], function (name) {
	    var method = ArrayProto[name];
	    _.prototype[name] = function () {
	      return result(this, method.apply(this._wrapped, arguments));
	    };
	  });

	  // Extracts the result from a wrapped and chained object.
	  _.prototype.value = function () {
	    return this._wrapped;
	  };

	  // Provide unwrapping proxy for some methods used in engine operations
	  // such as arithmetic and JSON stringification.
	  _.prototype.valueOf = _.prototype.toJSON = _.prototype.value;

	  _.prototype.toString = function () {
	    return '' + this._wrapped;
	  };

	  // AMD registration happens at the end for compatibility with AMD loaders
	  // that may not enforce next-turn semantics on modules. Even though general
	  // practice for AMD registration is to be anonymous, underscore registers
	  // as a named module because, like jQuery, it is a base library that is
	  // popular enough to be bundled in a third party lib, but not be part of
	  // an AMD load request. Those cases could generate an error when an
	  // anonymous define() is called outside of a loader request.
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
	      return _;
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  }
	}).call(undefined);

/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(52);
	var RouteHandler = __webpack_require__(106).RouteHandler;
	var NavList = __webpack_require__(110);
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
	        React.createElement(RouteHandler, null)
	      ),
	      React.createElement(Message, null)
	    );
	  }
	});

/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var classnames = __webpack_require__(111);
	var React = __webpack_require__(52);
	var Router = __webpack_require__(106);
	var menulist = __webpack_require__(112);
	var Icon = __webpack_require__(115);

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
/* 111 */
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
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = [{ route: 'button', text: 'Button', handler: __webpack_require__(125) }, { route: 'checkbox', text: 'Checkbox', handler: __webpack_require__(130) }, { route: 'checkbox-group', text: 'Checkbox Group', handler: __webpack_require__(134) }, { route: 'icon', text: 'Icon', handler: __webpack_require__(113) }, { route: 'message', text: 'Message', handler: __webpack_require__(146) }, { route: 'radio-group', text: 'Radio Group', handler: __webpack_require__(154) }];

/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(52);
	var Prettify = __webpack_require__(114);
	var Icon = __webpack_require__(115);

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
	        '  &nbsp',
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
	          '<Icon icon="camera-retro" />\r<Icon icon="camera-retro" size="lg" />\n<Icon icon="camera-retro" size="2x" />\n<Icon icon="camera-retro" size="3" />\n<Icon icon="camera-retro" size={4} />\n<Icon icon="camera-retro" size={5} />'
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
/* 114 */
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
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(116);

	var React = __webpack_require__(52);
	var Classable = __webpack_require__(124);

	var Icon = React.createClass({
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
	    var classes = {
	      'icon': true,
	      'icon-spin': this.state.spin
	    };
	    if (this.props.icon) {
	      classes['icon-' + this.props.icon] = true;
	    }

	    var size = this.props.size;
	    if (size) {
	      if (typeof size === 'number' || size.length === 1) {
	        size = size + 'x';
	      }
	      classes['icon-' + size] = true;
	    }

	    var className = this.getClasses(classes);

	    return React.createElement('i', { className: className });
	  }
	});

	module.exports = Icon;

/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 117 */,
/* 118 */,
/* 119 */,
/* 120 */,
/* 121 */,
/* 122 */,
/* 123 */,
/* 124 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var React = __webpack_require__(52);
	var classnames = __webpack_require__(111);

	module.exports = {

	  propTypes: {
	    className: React.PropTypes.string
	  },

	  getClasses: function getClasses() {
	    var mainArguments = Array.prototype.slice.call(arguments);
	    if (this.props.className) {
	      mainArguments.push(this.props.className);
	    }

	    return classnames.apply(null, mainArguments);
	  }
	};

/***/ },
/* 125 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(52);
	var Prettify = __webpack_require__(114);
	var Button = __webpack_require__(126);
	var Icon = __webpack_require__(115);

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
	          '<Button status="primary">Primary Button</Button>\r<Button>Button</Button>'
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
	          '.button-extend {\r  border-radius: 4px;\r}\r.button-success, .button-error, .button-warning, .button-info {\r  color: #fff;\r  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);\r}\r.button-success {\r  background: rgb(28, 184, 65);\r}\r.button-error {\r  background: rgb(202, 60, 60);\r}\r.button-warning {\r  background: rgb(223, 117, 20);\r}\r.button-info {\r  background: rgb(66, 184, 221);\r}\r.button-large {\r  font-size: 120%;\r}'
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
	          '<Button status="success">Success Button</Button>\r<Button status="warning">Warning Button</Button>\r<Button status="error">Error Button</Button>\r<Button status="info">Info Button</Button>'
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
	          '<Button ref="button">Button</Button>\r<label className="pure-checkbox">\r  <input onClick={this.disableExample} type="checkbox" /> 禁用\r</label>'
	        ),
	        React.createElement(
	          'pre',
	          { className: 'prettyprint' },
	          'disableExample: function (event) {\r  var button = this.refs.button;\r  if (event.target.checked) {\r    button.disable(<span><Icon icon="lock" />我被禁用了</span>);\r  } else {\r    button.enable("我又可以使用了");\r  }\r}'
	        )
	      )
	    );
	  }
	});

/***/ },
/* 126 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _react = __webpack_require__(52);

	var _react2 = _interopRequireDefault(_react);

	var _mixinsClassable = __webpack_require__(124);

	var _mixinsClassable2 = _interopRequireDefault(_mixinsClassable);

	__webpack_require__(127);
	exports['default'] = _react2['default'].createClass({
	  displayName: 'Button',

	  propTypes: {
	    children: _react2['default'].PropTypes.any,
	    disabled: _react2['default'].PropTypes.bool,
	    onClick: _react2['default'].PropTypes.func,
	    once: _react2['default'].PropTypes.bool,
	    status: _react2['default'].PropTypes.string,
	    type: _react2['default'].PropTypes.oneOf(['submit', 'button'])
	  },

	  mixins: [_mixinsClassable2['default']],

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

	    // use function disable argument first
	    var show = this.state.show || this.props.children;

	    return _react2['default'].createElement(
	      'button',
	      { onClick: this.handleClick, disabled: this.state.disabled, className: className, type: this.props.type || 'button' },
	      show
	    );
	  }
	});
	module.exports = exports['default'];

/***/ },
/* 127 */
/***/ function(module, exports, __webpack_require__) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 128 */,
/* 129 */,
/* 130 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(52);
	var Prettify = __webpack_require__(114);
	var Checkbox = __webpack_require__(131);

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
/* 131 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(132);
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
/* 132 */
/***/ function(module, exports, __webpack_require__) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 133 */,
/* 134 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(52);
	var Prettify = __webpack_require__(114);
	var CheckboxGroup = __webpack_require__(135);

	var textValue = __webpack_require__(145);

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
	          '<CheckboxGroup data={array} sep={string||null} inline={bool} onChange={function} readOnly={bool}\r  src="string" textKey="string" valueKey="string" value={any} />'
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
	            }, inline: true, value: 'shanghai,chengdu', src: 'json/text-value.json' })
	        ),
	        React.createElement(
	          'pre',
	          { className: 'prettyprint' },
	          '<CheckboxGroup inline={true} value="shanghai,chengdu" src="json/text-value.json" />'
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
/* 135 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _react = __webpack_require__(52);

	var _react2 = _interopRequireDefault(_react);

	var _checkboxJsx = __webpack_require__(131);

	var _checkboxJsx2 = _interopRequireDefault(_checkboxJsx);

	var _utilsStrings = __webpack_require__(138);

	var _utilsStrings2 = _interopRequireDefault(_utilsStrings);

	var _mixinsClassable = __webpack_require__(124);

	var _mixinsClassable2 = _interopRequireDefault(_mixinsClassable);

	var _utilsObjects = __webpack_require__(136);

	var _utilsObjects2 = _interopRequireDefault(_utilsObjects);

	var _mixinsResource = __webpack_require__(139);

	var _mixinsResource2 = _interopRequireDefault(_mixinsResource);

	var _mixinsReceiveValue = __webpack_require__(144);

	var _mixinsReceiveValue2 = _interopRequireDefault(_mixinsReceiveValue);

	__webpack_require__(132);

	var CheckboxGroup = _react2['default'].createClass({
	  displayName: 'CheckboxGroup',

	  propTypes: {
	    data: _react2['default'].PropTypes.array,
	    inline: _react2['default'].PropTypes.bool,
	    onChange: _react2['default'].PropTypes.func,
	    readOnly: _react2['default'].PropTypes.bool,
	    sep: _react2['default'].PropTypes.string,
	    src: _react2['default'].PropTypes.string,
	    textKey: _react2['default'].PropTypes.string,
	    value: _react2['default'].PropTypes.any,
	    valueKey: _react2['default'].PropTypes.string
	  },

	  mixins: [_mixinsClassable2['default'], _mixinsReceiveValue2['default'], _mixinsResource2['default']],

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
	    return _utilsStrings2['default'].toArray(value, this.props.sep);
	  },

	  initData: function initData(data) {
	    data = _utilsObjects2['default'].toTextValue(data, this.props.textKey, this.props.valueKey);
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
	      return _react2['default'].createElement(_checkboxJsx2['default'], { key: i, index: i, readOnly: _this.props.readOnly, checked: checked, onChange: _this.handleChange, text: item.text, value: item.value });
	    });

	    return _react2['default'].createElement(
	      'div',
	      { className: className },
	      this.state.msg || items
	    );
	  }
	});

	exports['default'] = CheckboxGroup;
	module.exports = exports['default'];

/***/ },
/* 136 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _type = __webpack_require__(137);

	var _type2 = _interopRequireDefault(_type);

	function isEmpty(obj) {

	  // null and undefined are "empty"
	  if (obj === null || obj === undefined) {
	    return true;
	  }

	  switch ((0, _type2['default'])(obj)) {
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
	    if ((0, _type2['default'])(s) !== 'object') {
	      return { text: s, value: s };
	    } else {
	      return { text: s[textKey], value: s[valueKey] };
	    }
	  });
	  return arr;
	}

	exports['default'] = { forEach: forEach, isEmpty: isEmpty, toTextValue: toTextValue };
	module.exports = exports['default'];

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

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
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

	exports['default'] = { format: format, substitute: substitute, toArray: toArray };
	module.exports = exports['default'];

/***/ },
/* 139 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _utilsAjax = __webpack_require__(140);

	var _utilsAjax2 = _interopRequireDefault(_utilsAjax);

	var _utilsClone = __webpack_require__(141);

	var _utilsClone2 = _interopRequireDefault(_utilsClone);

	var _lang = __webpack_require__(142);

	var _lang2 = _interopRequireDefault(_lang);

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
	      this.setState({ msg: _lang2['default'].get('request.loading'), data: [] });

	      new _utilsAjax2['default']().get(props.src).done((function (res) {
	        var data = res.status === 1 ? res.data : res instanceof Array ? res : undefined;

	        if (!data) {
	          var msg = res.msg ? res.msg : _lang2['default'].get('request.failure');
	          this.setState({ msg: msg });
	          return;
	        } else {
	          this.setState({ msg: null });
	        }

	        data = (0, _utilsClone2['default'])(data);

	        // initialize data
	        if (this.initData) {
	          this.initData(data);
	        } else {
	          this.setState({ data: data });
	        }
	      }).bind(this)).error((function () {
	        this.setState({ msg: _lang2['default'].get('request.failure') });
	      }).bind(this));
	    }
	  }
	};

/***/ },
/* 140 */
/***/ function(module, exports, __webpack_require__) {

	// from https://github.com/fdaciuk/ajax
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	function Ajax() {
	  var $public = {};
	  var $private = {};

	  $private.methods = {
	    done: function done() {},
	    error: function error() {},
	    always: function always() {}
	  };

	  $public.get = function get(url) {
	    return $private.xhrConnection('GET', url, null);
	  };

	  $public.post = function post(url, data) {
	    return $private.xhrConnection('POST', url, data);
	  };

	  $public.put = function put(url, data) {
	    return $private.promises('PUT', url, data);
	  };

	  $public['delete'] = function del(url, data) {
	    return $private.promises('DELETE', url, data);
	  };

	  $private.xhrConnection = function xhrConnection(type, url, data) {
	    var xhr = new XMLHttpRequest();
	    xhr.open(type, url || '', true);
	    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	    xhr.addEventListener('readystatechange', $private.handleReadyStateChange, false);
	    xhr.send($private.convertObjectToQueryString(data));
	    return $private.promises();
	  };

	  $private.handleReadyStateChange = function handleReadyStateChange() {
	    var xhr = this;
	    var DONE = 4;
	    if (xhr.readyState === DONE) {
	      $private.methods.always.apply($private.methods, $private.parseResponse(xhr));
	      if (xhr.status >= 200 && xhr.status < 300) {
	        return $private.methods.done.apply($private.methods, $private.parseResponse(xhr));
	      }
	      $private.methods.error.apply($private.methods, $private.parseResponse(xhr));
	    }
	  };

	  $private.parseResponse = function parseResponse(xhr) {
	    var result;
	    try {
	      result = JSON.parse(xhr.responseText);
	    } catch (e) {
	      result = xhr.responseText;
	    }
	    return [result, xhr];
	  };

	  $private.promises = function promises() {
	    return {
	      done: $private.generatePromise.call(this, 'done'),
	      error: $private.generatePromise.call(this, 'error'),
	      always: $private.generatePromise.call(this, 'always')
	    };
	  };

	  $private.generatePromise = function generatePromise(method) {
	    return function (callback) {
	      return ($private.methods[method] = callback, this);
	    };
	  };

	  $private.convertObjectToQueryString = function convertObjectToQueryString(data) {
	    var convertedData = [];
	    if (!$private.isObject(data)) {
	      return data;
	    }
	    Object.keys(data).forEach(function (key) {
	      convertedData.push(key + '=' + data[key]);
	    });
	    return convertedData.join('&');
	  };

	  $private.isObject = function isObject(data) {
	    return Object.prototype.toString.call(data) === '[object Object]';
	  };

	  return $public;
	}

	exports['default'] = Ajax;
	module.exports = exports['default'];

/***/ },
/* 141 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/component/clone
	/**
	 * Module dependencies.
	 */

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _type = __webpack_require__(137);

	var _type2 = _interopRequireDefault(_type);

	/**
	 * Clones objects.
	 *
	 * @param {Mixed} any object
	 * @api public
	 */

	function clone(obj) {
	  switch ((0, _type2['default'])(obj)) {
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

	exports['default'] = clone;
	module.exports = exports['default'];

/***/ },
/* 142 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var merge = __webpack_require__(143);
	var lang = {};

	module.exports = {
	  set: function set(obj) {
	    lang = merge(lang, obj);
	  },

	  get: function get(path) {
	    if (!path || typeof path !== 'string') {
	      return '';
	    }
	    var result = lang;
	    path.split('.').forEach(function (p) {
	      if (result) {
	        result = result[p];
	      }
	    });

	    return result;
	  }
	};

/***/ },
/* 143 */
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
/* 144 */
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
/* 145 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = [{ "value": "nanjing", "text": "南京" }, { "value": "beijing", "text": "北京" }, { "value": "guangzhou", "text": "广州" }, { "value": "shenzhen", "text": "深圳" }, { "value": "chengdu", "text": "成都" }, { "value": "chongqing", "text": "重庆" }, { "value": "shanghai", "text": "上海" }];

/***/ },
/* 146 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(52);
	var Prettify = __webpack_require__(114);
	var Message = __webpack_require__(147);
	var Icon = __webpack_require__(115);

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
	            { onClick: Message.show.bind(null, 'Info message.') },
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
	            { onClick: Message.show.bind(null, 'error message.', 'error') },
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
	            { onClick: Message.show.bind(null, React.createElement(
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
	            { onClick: Message.show.bind(null, React.createElement(
	                'span',
	                null,
	                React.createElement(Icon, { icon: 'music' }),
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
/* 147 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	__webpack_require__(148);

	var React = __webpack_require__(52);
	var Overlay = __webpack_require__(150);
	var Objects = __webpack_require__(136);
	var Classable = __webpack_require__(124);
	var PubSub = __webpack_require__(153);

	var messages = [],
	    ADD_MESSAGE = 'EB3A79637B40',
	    REMOVE_MESSAGE = '73D4EF15DF50';

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
	    var items = this.state.messages.map(function (msg, i) {
	      return React.createElement(Item, _extends({ key: i, index: i, ref: i, onDismiss: this.dismiss }, msg));
	    }, this);

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

	__webpack_require__(151);
	var React = __webpack_require__(52);
	var Classable = __webpack_require__(124);

	function noop() {}

	module.exports = React.createClass({
	  displayName: 'Overlay',

	  propTypes: {
	    onClick: React.PropTypes.func
	  },

	  mixins: [Classable],

	  render: function render() {
	    var className = this.getClasses('overlay');
	    var onClick = this.props.onClick || noop;

	    return React.createElement('div', { className: className, onClick: onClick });
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

	var React = __webpack_require__(52);
	var Prettify = __webpack_require__(114);
	var RadioGroup = __webpack_require__(155);

	var textValue = __webpack_require__(145);

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
	          '<RadioGroup data={array} inline={bool} onChange={function} readOnly={bool}\r  src="string" textKey="string" valueKey="string" value={any} />'
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
	          'data = [\r  { "value": "nanjing", "text": "南京" },\r  { "value": "beijing", "text": "北京" },\r  { "value": "guangzhou", "text": "广州" },\r  { "value": "shenzhen", "text": "深圳" },\r  { "value": "chengdu", "text": "成都" },\r  { "value": "chongqing", "text": "重庆" },\r  { "value": "shanghai", "text": "上海" }\r]'
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
/* 155 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(132);
	var React = __webpack_require__(52);
	var Classable = __webpack_require__(124);
	var Objects = __webpack_require__(136);
	var Resource = __webpack_require__(139);
	var ReceiveValue = __webpack_require__(144);
	var Radio = __webpack_require__(156);

	module.exports = React.createClass({
	  displayName: 'RadioGroup',

	  propTypes: {
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
/* 156 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(132);
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

	  // ignore react readonly warning
	  noop: function noop() {},

	  render: function render() {
	    return React.createElement(
	      'div',
	      { className: 'pure-radio rui-radio' },
	      React.createElement(
	        'label',
	        null,
	        React.createElement('input', { ref: 'input', type: 'radio', readOnly: this.props.readOnly, onChange: this.noop, onClick: this.handleClick, checked: this.props.checked, value: this.props.value }),
	        this.props.text
	      )
	    );
	  }
	});

/***/ },
/* 157 */
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
/* 158 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _index = __webpack_require__(142);

	var _index2 = _interopRequireDefault(_index);

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

	_index2['default'].set(data);

/***/ },
/* 159 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "index.html"

/***/ }
/******/ ])
});
;