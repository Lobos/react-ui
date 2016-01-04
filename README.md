A collection of components for React.
文档 [戳这里](http://lobos.github.io/react-ui/)

# 使用

 - npm install
```
npm install rctui
```
```
var ReactUI = require('rctui')
var Form = ReactUI.Form
...
// 或者单独使用一个组件
var Input = require('rctui/Input')
var CheckboxGroup = require('rctui/CheckboxGroup')
var FormControl = require('rctui/FormControl')
```

# build
使用 [webpack](http://webpack.github.io/) 打包，可以修改 'src/index.js' 自定义需要的组件。
```
build: npm run build
```

# Components
目前完成的组件，后续应该会不断加入新的组件

- [Button](http://lobos.github.io/react-ui/#/button)
- [Checkbox](http://lobos.github.io/react-ui/#/checkbox)
- [Checkbox group](http://lobos.github.io/react-ui/#/checkboxGroup)
- [Datetime](http://lobos.github.io/react-ui/#/datetime)
- [Form](http://lobos.github.io/react-ui/#/form)
- [Form Control](http://lobos.github.io/react-ui/#/formControl)
- [Icon](http://lobos.github.io/react-ui/#/icon)
- [Message](http://lobos.github.io/react-ui/#/message)
- [Pagination](http://lobos.github.io/react-ui/#/pagination)
- [Radio group](http://lobos.github.io/react-ui/#/radioGroup)
- [Rating](http://lobos.github.io/react-ui/#/rating)
- [Select](http://lobos.github.io/react-ui/#/select)
- [Tree](http://lobos.github.io/react-ui/#/tree)
- [Table](http://lobos.github.io/react-ui/#/table)
- [Filter](http://lobos.github.io/react-ui/#/filter)
- [Modal](http://lobos.github.io/react-ui/#/modal)
- [Upload](http://lobos.github.io/react-ui/#/upload)

# Change log
v0.5.2
 - babel 5 => 6，移除es7的语法
 - 移除在线build(木有精力维护了……)
 - getGrid 改为utils下的方法，不再使用highorder component
 - 增加Grid文档

v0.5.1
 - Pagination 增加mini选项

v0.5.0
 - 修复bugs
 - react版本改为0.14.0

v0.4.0

 - 结构重新调整
 - 拆分Lang

v0.3.5

 - css 去除 local，使用 rct- 前缀
 - 加入 Upload

v0.3.4

 - 加入Modal
 - Message 改为动态创建

v0.3.3

 - Table, Tree的checkAble属性改为selectAble
 - 加入 Filter

v0.3.1

 - 加入Table
 - dataSource改为promise方式

v0.3.0

 - Component全部改为es6形式
 - grids的css改用js动态生成
 - 剥离需要服务端数据的Component内置ajax调用，改用dataSource实现
 - 移除全部Mixins，使用Higher Order

v0.2.3

 - 修改一些小bug
 - [增加在线build](http://lobos.github.io/react-ui/#/build)

v0.2.2

 - 使用webpack打包，减少体积，去除了 `Reflux` 和 `superagent` 依赖。
 - 放弃bootstrap，使用yahoo/pure。
 - 在webpack中使用了`babel-loader`，所以用了部分es6语法，参考 [babel](https://babeljs.io/docs/learn-es2015/) 的文档，没有使用需要 polyfill 支持的部分（因为需要额外引入45KB左右的 polyfill 包）。不要忘记在页面中加入 [es5-shim](https://github.com/es-shims/es5-shim) 引用。


