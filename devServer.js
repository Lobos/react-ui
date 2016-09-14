'use strict'

var path = require('path')
var express = require('express')
var webpack = require('webpack')
var Dashboard = require('webpack-dashboard')
var DashboardPlugin = require('webpack-dashboard/plugin')

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

app.get('/form.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'standalone/form/index.html'))
})

app.get('/formBuilder.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'standalone/formBuilder/formBuilder.html'))
})

app.post('/upload', function (req, res) {
  res.send({success: true, id: Date.now().toString(), img: '../../images/image3.jpg'})
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
