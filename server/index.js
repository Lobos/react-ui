'use strict'

var app = require('koa')()
var router = require('koa-router')()
var koaBody = require('koa-body')()
var serve = require('koa-static')
var md5 = require('MD5')
var mkdirp = require('mkdirp')
var fs = require('fs')
var components = require('./src/data')

app.use(router.routes())

function getIndexFile(keys) {
  var arr = []
  var cpt, text, path
  keys.forEach(key => {
    cpt = components[key]
    path = cpt.path.replace('./', '../../../src/js/')
    if (cpt.notExport) {
      text = 'require("' + path + '")'
    } else {
      text = 'exports.' + key + ' = require("' + path + '")'
    }
    arr.push(text)
  })
  return arr.join('\n')
}

router.post('/build', koaBody, function *() {
  var key = md5(JSON.stringify(this.request.body))
  // every sort of options create a folder
  var path = './build/' + key + '/'
  mkdirp.sync(path)

  var keys = this.request.body.components
  var text = getIndexFile(keys)
  fs.writeFileSync(path + 'index.js', text)

  this.body = text
})

router.get('/components', function *() {
  this.body = components
})

app.use(serve('./static'))

app.listen(8080)
