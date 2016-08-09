A collection of components for React, base on bootstrap 4.0. [Docs](http://lobos.github.io/react-ui/)

# Usage

 - npm install
```
npm install rctui
```
```
var ReactUI = require('rctui')
var Form = ReactUI.Form
// or
import { Form } from 'rctui'
...
// import one Component without other components
var Input = require('rctui/Input')
var CheckboxGroup = require('rctui/CheckboxGroup')
var FormControl = require('rctui/FormControl')
// or
import Input from 'rctui/Input'
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

