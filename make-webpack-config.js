var path = require("path")
var webpack = require("webpack")
var ExtractTextPlugin = require("extract-text-webpack-plugin")

function extsToRegExp(exts) {
	return new RegExp("\\.(" + exts.map(function(ext) {
		return ext.replace(/\./g, "\\.")
	}).join("|") + ")(\\?.*)?$")
}

function loadersByExtension(obj) {
	var loaders = []
	Object.keys(obj).forEach(function(key) {
		var exts = key.split("|")
		var value = obj[key]
		var entry = {
			extensions: exts,
			test: extsToRegExp(exts)
		}
		if(Array.isArray(value)) {
			entry.loaders = value
		} else if(typeof value === "string") {
			entry.loader = value
		} else {
			Object.keys(value).forEach(function(valueKey) {
				entry[valueKey] = value[valueKey]
			})
		}
		loaders.push(entry)
	})
	return loaders
}

module.exports = function(options) {
  var minimize = options.minimize || process.argv.indexOf('--min') > 0
	var entry = options.entry

	var output = {
		path: options.path || "./",
		filename: options.filename || "[name].js",
		//chunkFilename: (options.devServer ? "[id].js" : "[name].js") + (options.longTermCaching ? "?[chunkhash]" : ""),
		sourceMapFilename: "[file].map",
		pathinfo: options.debug,
    library: options.library,
		libraryTarget: options.libraryTarget || "umd"
	}


  // loaders ===========================================================================
	var cssLoader = minimize ? "css-loader?localIdentName=[hash:base64:8]" : "css-loader?localIdentName=[path][name]---[local]---[hash:base64:5]",
      lessLoader = cssLoader + '!less-loader'

	var loaders = loadersByExtension({
		"jsx": options.hotComponents ? "babel" : "babel-loader?stage=0",
		"js": options.hotComponents ? "babel" : "babel-loader?stage=0",
		"json": "file-loader?name=./[name].json",
		//"txt": "raw-loader",
    "png|jpg|jpeg|gif": "url-loader?limit=10000&name=./images/[name].[ext]",
		"ttf|eot|woff|woff2|otf|svg": "file-loader?name=./font/[name].[ext]",
		//"wav|mp3": "file-loader",
		//"html": "html-loader",
		//"md|markdown": ["html-loader", "markdown-loader"]
    "css": options.separateStylesheet ? ExtractTextPlugin.extract("style-loader", cssLoader, { publicPath: '.' }) : "style-loader!" + cssLoader,
    "less": options.separateStylesheet ? ExtractTextPlugin.extract("style-loader", lessLoader, { publicPath: '.' }) : "style-loader!" + lessLoader
	})

  loaders.push({ test: /(\.js|\.jsx)$/, loader: 'eslint-loader', exclude: /(node_modules|\.css$|\.less$)/ })

  // externals ========================================================================
	var externals = []

  if (options.externals) {
    Object.keys(options.externals).forEach(function (key) {
      var val = options.externals[key]
      var ext = {}
      ext[key] = {root:val,commonjs2:key,commonjs:key,amd:key}
      externals.push(ext)
    })
  }

  // plugins ==========================================================================
	var plugins = [
		new webpack.PrefetchPlugin("react"),
		new webpack.PrefetchPlugin("react/lib/ReactComponentBrowserEnvironment")
	]

	if(options.separateStylesheet) {
		plugins.push(new ExtractTextPlugin("[name].css"))
	}

	if(minimize) {
		plugins.push(
			new webpack.optimize.UglifyJsPlugin({
				compressor: {
					warnings: false
				}
			})
    )
    plugins.push(new webpack.optimize.OccurenceOrderPlugin())
    plugins.push(new webpack.NoErrorsPlugin())
    plugins.push(new webpack.optimize.DedupePlugin())
		plugins.push(
			new webpack.DefinePlugin({
				"process.env": {
					NODE_ENV: JSON.stringify("production")
				}
			})
    )
	}

  if (options.plugins) {
    plugins = plugins.concat(options.plugins)
  } 

	return {
		entry: entry,
		output: output,
		target: options.target || "web",
		module: {
			loaders: loaders
		},
		devtool: options.devtool,
		debug: options.debug,
		externals: externals,
		plugins: plugins
	}
}
