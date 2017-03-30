A collection of components for React, base on bootstrap 4.0. [Docs](http://lobos.github.io/react-ui/0.7)

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

If you don't want compile the file or encounter any compile problems, you can use the built file
```
// html
<script src="https://unpkg.com/rctui/dist/index.js"></script>
// webpack config
externals: {'react': 'React', 'react-dom': 'ReactDOM', 'rctui': 'rctui'},
// jsx
import { Form } from 'rctui'
...

```


# cli
There is a internal cli command, help you easy start you app.

**need nodejs >= 4，npm >= 3**

**Waning options all/webpack will overwrite your webpack.config.js file**

```
npm install rctui
node node_modules/rctui/cli/init.js [options]
options:
    - all        install dependencies and devDependencies package, simple demo code, devServer, webpack config
    - update     install / update package
    - demo       a simple demo
    - server     node devServer.js
    - webpack    webpack.config.js !warning: will overwrite your webpack.config.js file
```

