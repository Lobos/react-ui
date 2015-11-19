'use strict';

var JSZip = require('jszip');
var fs = require('fs');

function archiver(key, callback) {
  var zip = new JSZip();
  var root = './build/' + key;
  //zip.file('ReactUI.js', fs.readFileSync(path + 'ReactUI.js'))

  function walk (path) {  
    var dirList = fs.readdirSync(path);
    dirList.forEach(function(item) {
      if (fs.statSync(path + '/' + item).isDirectory()){
        walk(path + '/' + item);
      } else {
        var sp = path.replace(root, '');
        if (sp.length > 0) {
          sp = sp.substr(1);
          zip.folder(sp).file(item, fs.readFileSync(path + '/' + item));
        } else {
          zip.file(item, fs.readFileSync(path + '/' + item));
        }
      }
    });
  }

  walk(root);

  var data = zip.generate({type:"nodebuffer"});
  fs.writeFile('./static/dist/' + key + '.zip', data, function () {
    callback(null, 'dist/' + key + '.zip');
  });
}

function zipThunk(key) {
  return function (callback) {
    archiver(key, callback);
  };
}

module.exports = zipThunk;
