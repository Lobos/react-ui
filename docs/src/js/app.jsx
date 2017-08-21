import * as Language from './Language'
Language.set()

import ReactDOM from 'react-dom'
import Master from './master'

ReactDOM.render(
  <Master />,
  document.getElementById('body')
)

// static files
require('file?name=index.html!../index.html')
require('../json/countries.json')
require('../json/form.json')
require('../json/table.json')
require('../json/text-value.json')
require('../json/tree.json')
require('../json/select.json')
require('../json/photos.json')
require('../less/style.less')

module.hot && module.hot.accept()
