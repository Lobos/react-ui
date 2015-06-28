# react-ui

A collection of components for React.

# Install

# Build
```
    docs:    webpack --config webpack-docs.config.js [--min]
    publish: webpack --config webpack-publish.config.js [--min]
```

# Change log
使用webpack打包，减少体积，去除了 `Reflux` 和 `superagent` 依赖。

放弃bootstrap，使用yahoo/pure。

在webpack中使用了`babel-loader`，所以用了部分es6语法，参考 [babel](https://babeljs.io/docs/learn-es2015/) 的文档，没有使用需要 polyfill 支持的部分（因为需要额外引入45KB左右的 polyfill 包）。不要忘记在页面中加入 [es5-shim](https://github.com/es-shims/es5-shim) 引用。

# Components

- Checkbox
- Checkbox group
- Color Picker
- Datetime
- Form
- Form Control
- Icon
- Loading
- Message
- Mult select
- Pagination
- Radio group
- Rating
- Select
- Tree
