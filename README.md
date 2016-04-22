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

# cli
webpack的环境配置确实太过麻烦，很多问题都出在配置的地方。本来打算写个start kit，但是觉得以后维护还是可能有同步更新的问题，所以在源码里加了一个cli的目录，实现安装／升级依赖包，提供一个简单的demo，webpack设置和支持hot load的devServer配置。**需要node 4，npm 3以上版本支持。npm 3 以下会有各种peerDependencies错误。**
**注意，会覆盖默认的webpack.config.js文件，请做好备份**

```
npm install rctui
node node_modules/rctui/cli/init.js [options]
options:
    - all        安装／升级依赖包，增加demo文件，devServer服务，webpack配置
    - update     只安装／升级依赖包
    - demo       一个简单的demo
    - server     在项目根目录下添加一个devServer.js文件，可以通过 node devServer.js 启动
    - webpack    在项目根目录下添加一个webpack.config.js文件，注意备份原来项目里的webpack配置文件
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
- [Grid](http://lobos.github.io/react-ui/#/grid)

# Change log
v0.6.1
 - dataSource 变为了 [fetch](http://lobos.github.io/react-ui/#/fetch)。方式改为higher order component，使用[refetch](https://github.com/Lobos/react-ui)，支持ajax，jsonp，cache
 - clickaway 改为 Mixins，增加registerClickAway
 - datetime 加入today, min, max, 移除 dateOnly, timeOnly, 使用 type 代替
 - 文档重构，增加rctui-example-loader把Example转为Code，避免文档和示例不同步造成误导
 - 加入FormItem，拆分FormControl。所有的表单组件都通过value传入值，通过onChange事件传出值。
 - 重构整个Form结构，不再使用getValue，setValue，通过onSubmit处理数据
 - CheckboxGroup, RadioGroup 支持data和children混合输入
 - Tree替换图片图标，改用传入icon
 - 由于Modal之前的版本中有很多人反应获取form有问题，所以，button 加入submit的快捷方式，直接触发children中的form submit事件。另外，除了全局方法调用，可以在组件中render。
 
 v0.5.2
 - babel 5 => 6，移除es7的语法
 - 移除在线build(木有精力维护了……)
 - getGrid 改为utils下的方法，不再使用higher order function
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
 - 移除全部Mixins，使用Higher Order Component

v0.2.3

 - 修改一些小bug
 - [增加在线build](http://lobos.github.io/react-ui/#/build)

v0.2.2

 - 使用webpack打包，减少体积，去除了 `Reflux` 和 `superagent` 依赖。
 - 放弃bootstrap，使用yahoo/pure。
 - 在webpack中使用了`babel-loader`，所以用了部分es6语法，参考 [babel](https://babeljs.io/docs/learn-es2015/) 的文档，没有使用需要 polyfill 支持的部分（因为需要额外引入45KB左右的 polyfill 包）。不要忘记在页面中加入 [es5-shim](https://github.com/es-shims/es5-shim) 引用。
