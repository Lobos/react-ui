'use strict';

var app = require('koa')();
var router = require('koa-router')();
var koaBody = require('koa-body')();
var serve = require('koa-static');
var md5 = require('md5');
var mkdirp = require('mkdirp');
var fs = require('fs');
var components = require('./data');
var getBuildThunk = require('./build').getBuildThunk;
var zip = require('./zip');

app.use(router.routes());

if (!fs.existsSync('./static/dist')) {
  mkdirp('./static/dist');
}

function getIndexFile(keys) {
  if (!Array.isArray(keys)) {
    keys = [keys];
  }
  var arr = [];
  var cpt, text, path;
  keys.forEach(key => {
    cpt = components[key];
    path = cpt.path.replace('./', '../../../src/');
    if (cpt.notExport) {
      text = 'require("' + path + '")';
    } else {
      text = 'exports.' + key + ' = require("' + path + '")';
    }
    arr.push(text);
  });
  return arr.join('\n');
}

function sleep(n) {
  return function (callback) {
    setTimeout(function () {
      callback();
    }, n);
  };
}

function checkFile(key, ctx) {
  if (fs.existsSync('./static/dist/' + key + '.zip')) {
    ctx.redirect('dist/' + key + '.zip');
    return true;
  }
  return false;
}

router.post('/build', koaBody, function *() {
  let body = this.request.body;
  var key = md5(JSON.stringify(body));

  // redirect return file if already created
  if (checkFile(key, this)) { return; }

  var path = './build/' + key + '/';
  if (fs.existsSync(path)) {

    // wait file build completed
    yield sleep(10000);
    if (checkFile(key, this)) { return; }

  } else {
    mkdirp.sync(path);
  }

  if (!fs.existsSync(path + 'index.js')) {
    // create index.js
    var keys = body.components;
    var text = getIndexFile(keys);
    fs.writeFileSync(path + 'index.js', text);
  }

  yield getBuildThunk(key, !!body.minimize, !!body.css);
  // remove index.js
  fs.unlinkSync('./build/' + key + '/index.js');

  this.redirect(yield zip(key));
});

router.options('/upload', function *() {
  this.set('Access-Control-Allow-Origin', this.request.header.origin);
  this.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  this.set('Access-Control-Allow-Credentials', true);
  this.body = '';
});

router.post('/upload', koaBody, function *() {
  this.set('Access-Control-Allow-Origin', this.request.header.origin);
  this.set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  this.set('Access-Control-Allow-Credentials', true);
  this.body = Date.now();
});

router.get('/components', function *() {
  this.body = components;
});

app.use(serve('./static'));

app.listen(8080);
