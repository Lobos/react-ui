'use strict'

var app = require('koa')()
var router  = require('koa-router')()
var koaBody = require('koa-body')()
var components = require('./data')

app.use(router.routes())

router.post('/build', koaBody, function *(next) {
  this.body = JSON.stringify(this.request.body)
})

router.get('/components', function *() {
  this.body = components
})

// response
app.use(function *(){
  this.body = 'Hello World'
})

app.listen(8080)
