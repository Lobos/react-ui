var path = require("path")
var _ = require("underscore")
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
	var loaders = {
		"jsx": options.hotComponents ? ["react-hot-loader", "babel-loader?stage=0"] : "babel-loader?stage=0",
		"js": {
			loader: "babel-loader?stage=0"//, include: path.join(__dirname, "app")
		},
    //,
    //"json": "json-loader",
		"json": "file-loader?name=./json/[name].json",
		//"txt": "raw-loader",
    "png|jpg|jpeg|gif|svg": "url-loader?limit=10000&name=./images/[name].[ext]",
		//"png|jpg|jpeg|gif": "file-loader?name=./images/[name].[ext]",
		"ttf|eot|woff|woff2|otf|svg": "file-loader?name=./font/[name].[ext]"
		//"wav|mp3": "file-loader",
		//"html": "html-loader",
		//"md|markdown": ["html-loader", "markdown-loader"]
	}
	var cssLoader = minimize ? "css-loader" : "css-loader?localIdentName=[path][name]---[local]---[hash:base64:5]"
	var stylesheetLoaders = {
		"css": cssLoader,
		"less": [cssLoader, "less-loader"]
	}
	var additionalLoaders = [
    { test: /(\.js|\.jsx)$/, loader: 'eslint-loader', exclude: /(node_modules|\.css$|\.less$)/ }
	]
	var alias = {

	}
	var aliasLoader = {

	}
	var externals = [

	]
	var modulesDirectories = ["web_modules", "node_modules"]
	var extensions = ["", ".web.js", ".js", ".jsx"]
	var publicPath = options.devServer ?
		"http://localhost:2992/assets/" :
		"/assets/"
	var output = {
		path: options.path || "./",
		//publicPath: publicPath,
		filename: options.filename || "js/[name].js",
		//chunkFilename: (options.devServer ? "[id].js" : "[name].js") + (options.longTermCaching ? "?[chunkhash]" : ""),
		sourceMapFilename: "js/[file].map",
		pathinfo: options.debug,
    library: options.library,
		libraryTarget: options.libraryTarget || "umd"
	}
	var excludeFromStats = [
		/node_modules[\\\/]react(-router)?[\\\/]/,
		/node_modules[\\\/]items-store[\\\/]/
	]
	var plugins = [
		new webpack.PrefetchPlugin("react"),
		new webpack.PrefetchPlugin("react/lib/ReactComponentBrowserEnvironment")
	]

  _.mapObject({"react":"React", "reflux":"Reflux", "react-router":"ReactRouter"}, function (val, key) {
    var ext = {}
    ext[key] = {root:val,commonjs2:key,commonjs:key,amd:key}
    externals.push(ext)
  })

	Object.keys(stylesheetLoaders).forEach(function(ext) {
		var stylesheetLoader = stylesheetLoaders[ext]
		if(Array.isArray(stylesheetLoader)) stylesheetLoader = stylesheetLoader.join("!")
		if(options.separateStylesheet) {
			stylesheetLoaders[ext] = ExtractTextPlugin.extract("style-loader", stylesheetLoader, { publicPath: '.' })
		} else {
			stylesheetLoaders[ext] = "style-loader!" + stylesheetLoader
		}
	})
	if(options.separateStylesheet) {
		plugins.push(new ExtractTextPlugin("css/[name].css"))
	}
	if(minimize) {
		plugins.push(
			new webpack.optimize.UglifyJsPlugin({
				compressor: {
					warnings: false
				}
			}),
			new webpack.optimize.DedupePlugin()
		)
		plugins.push(
			new webpack.DefinePlugin({
				"process.env": {
					NODE_ENV: JSON.stringify("production")
				}
			}),
			new webpack.NoErrorsPlugin()
		)
	}

	return {
		entry: entry,
		output: output,
		target: options.target || "web",
		module: {
			loaders: loadersByExtension(loaders).concat(loadersByExtension(stylesheetLoaders)).concat(additionalLoaders)
		},
		devtool: options.devtool,
		debug: options.debug,
		externals: externals,
		plugins: plugins,
		devServer: {
			stats: {
				cached: false,
				exclude: excludeFromStats
			}
		}
	}
}
