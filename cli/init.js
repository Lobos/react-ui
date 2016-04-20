'use strict';

const exec = require('child_process').exec;
const fs = require('fs');
const dependencies = require('./dependencies');
const path = require('path');

const defaultPackage = {
  "name": "",
  "author": "",
  "version": "",
  "description": ""
};

let cwd = process.cwd();

function updatePackage (resolve, reject) {
  fs.readFile('./package.json', function(err, data) {
    let dps = [];

    if (err) {
      console.log('package.json did not found, create ...');
      data = defaultPackage;
    } else {
      try {
        data = JSON.parse(data.toString());
      } catch (e) {
        data = defaultPackage;
      }
    }

    if (!data.dependencies) {
      data.dependencies = {};
    }

    if (!data.devDependencies) {
      data.devDependencies = {};
    }

    Object.keys(dependencies.peer).forEach((m) => {
      data.dependencies[m] = dependencies.peer[m];
      dps.push({ m, v:dependencies.peer[m] });
    });
    
    Object.keys(dependencies.babel).forEach((m) => {
      data.devDependencies[m] = dependencies.babel[m];
      dps.push({ m, v:dependencies.babel[m] });
    });

    Object.keys(dependencies.hot).forEach((m) => {
      data.dependencies[m] = dependencies.hot[m];
      dps.push({ m, v:dependencies.hot[m] });
    });

    fs.writeFile('./package.json', JSON.stringify(data, null, 2), (err) => {
      if (err) { reject(err); }
      console.log('package update success.');
    });

    let total = dps.length;
    let count = 0;
    function done(msg) {
      count++;
      console.log(`${msg} [${count}/${total}]`);
      if (count === total) {
        // all done
        console.log('all done');
        resolve(true);
      }
    }

    console.log('package install start...');
    dps.forEach((mv) => {
      let m = mv.m, v = mv.v;
      exec(`npm install ${m}@${v}`, { cwd }, function (err, stdout) {
        if (err) {
          throw err;
        }
        done(`install ${m}@${v} success.`);
      });
    });
  });
}

function webpackConfig (resolve, reject) {
  try {
    copy(`${__dirname}/webpack.config.js`, './webpack.config.js');
    resolve(true);
  } catch (e) {
    reject(e);
  }
}

function mkdir (p) {
  if (!fs.existsSync(p)){
    fs.mkdirSync(p);
  }
}

function copy (origin, newFile) {
  fs.createReadStream(origin).pipe(fs.createWriteStream(newFile));
}

function demo (resolve, reject) {
  mkdir('./demo');
  copy(`${__dirname}/demo/index.js`, './demo/index.js');
  copy(`${__dirname}/demo/index.html`, './demo/index.html');
  copy(`${__dirname}/devServer.js`, './devServer.js');
}

new Promise(updatePackage)
.then(() => {
  return new Promise(webpackConfig);
})
.then(() => {
  demo();
});
