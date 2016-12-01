var path = require('path')
var express = require('express')
var webpack = require('webpack')
var Dashboard = require('webpack-dashboard')
var DashboardPlugin = require('webpack-dashboard/plugin')
var multer = require('multer')

var upload = multer({})

var config = require('./webpack.config.dev.js')

var app = express()
var compiler = webpack(config)
var dashboard = new Dashboard()

compiler.apply(new DashboardPlugin(dashboard.setData))

app.use(require('webpack-dev-middleware')(compiler, {
  // noInfo: true,
  quiet: true,
  publicPath: '/'
}))

app.use(require('webpack-hot-middleware')(compiler, {
  log: () => {}
}))

app.use('/dist', express.static('docs/dist'))
app.use('/images', express.static('docs/src/images'))
app.use('/json', express.static('docs/src/json'))
app.use('/lib', express.static('docs/lib'))

app.post('/upload', upload.single('file'), function (req, res) {
  res.send({
    success: true,
		model: {
			id: Date.now().toString(),
			name: req.file.originalname,
			content: 'data:' + req.file.mimetype + ';base64,' + req.file.buffer.toString('base64')
		}
  })
})

app.get('/validate', function (req, res) {
  if (req.query.name === 'lobos') {
    res.send({ success: true })
  } else {
    res.send({ success: false, msg: 'name already exists.' })
  }
})

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'docs/src/index.html'))
})

app.listen(3001, 'localhost', function (err) {
  if (err) {
    console.log(err)
    return
  }

  console.log('Listening at http://localhost:3001')
})
