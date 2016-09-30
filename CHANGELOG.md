# v0.7.0
 - 使用bootstrap作为基础样式库，增加rctui-theme-loader切换theme
 - 使用curry和compose处理higherorder component
 - 增加Transition处理动画
 - Checkbox, CheckboxGroup, Radio, RadioGroup, Rating 改为Dumb组件，优化性能
 - Select移除数据处理，交由FormItem处理，增加lazy render
 - Message拆分，去除PubSub依赖，暴露success, warning, error接口，UI调整到顶部
 - Modal拆分，去除PubSub依赖，改为垂直居中
 - Tree折线改为SVG，greedy改为capture
 - Table 拆分，Sort，Pagination改为高阶组件，去除state
 - Form, FormControl, FormItem 改为context方式传递form数据
 - 重构Upload
 - 增加Alert
 - 增加ButtonGroup
 - 增加Dropdown
 - 增加Switch
 - 增加Tag
 - 增加Breadcrumb
 - 增加Media
 - 增加Nav
 - 增加Card
 - 增加Cascade
 - 增加FormText
 - 增加ImageUpload
 - 增加Progress
 - 增加Popover
 - 增加Spin
 - 增加Timeage
 - 增加Tooltip
 - 增加Mask
 - 增加Image
 - 增加Editor

# v0.6.8
 - bugfix

# v0.6.1
 - dataSource 变为了 [fetch](http://lobos.github.io/react-ui/0.6/fetch)。方式改为higher order component，使用[refetch](https://github.com/Lobos/react-ui)，支持ajax，jsonp，cache
 - clickaway 改为 Mixins，增加registerClickAway
 - datetime 加入today, min, max, 移除 dateOnly, timeOnly, 使用 type 代替
 - 文档重构，增加rctui-example-loader把Example转为Code，避免文档和示例不同步造成误导
 - 加入FormItem，拆分FormControl。所有的表单组件都通过value传入值，通过onChange事件传出值。
 - 重构整个Form结构，不再使用getValue，setValue，通过onSubmit处理数据
 - CheckboxGroup, RadioGroup 支持data和children混合输入
 - Tree替换图片图标，改用传入icon
 - 由于Modal之前的版本中有很多人反应获取form有问题，所以，button 加入submit的快捷方式，直接触发children中的form submit事件。另外，除了全局方法调用，可以在组件中render。

# v0.5.2
 - babel 5 => 6，移除es7的语法
 - 移除在线build(木有精力维护了……)
 - getGrid 改为utils下的方法，不再使用higher order function
 - 增加Grid文档

# v0.5.1
 - Pagination 增加mini选项

# v0.5.0
 - 修复bugs
 - react版本改为0.14.0

# v0.4.0

 - 结构重新调整
 - 拆分Lang

# v0.3.5

 - css 去除 local，使用 rct- 前缀
 - 加入 Upload

# v0.3.4

 - 加入Modal
 - Message 改为动态创建

# v0.3.3

 - Table, Tree的checkAble属性改为selectAble
 - 加入 Filter

# v0.3.1

 - 加入Table
 - dataSource改为promise方式

# v0.3.0

 - Component全部改为es6形式
 - grids的css改用js动态生成
 - 剥离需要服务端数据的Component内置ajax调用，改用dataSource实现
 - 移除全部Mixins，使用Higher Order Component

# v0.2.3

 - 修改一些小bug
 - [增加在线build](http://lobos.github.io/react-ui/#/build)

# v0.2.2

 - 使用webpack打包，减少体积，去除了 `Reflux` 和 `superagent` 依赖。
 - 放弃bootstrap，使用yahoo/pure。
 - 在webpack中使用了`babel-loader`，所以用了部分es6语法，参考 [babel](https://babeljs.io/docs/learn-es2015/) 的文档，没有使用需要 polyfill 支持的部分（因为需要额外引入45KB左右的 polyfill 包）。不要忘记在页面中加入 [es5-shim](https://github.com/es-shims/es5-shim) 引用。
