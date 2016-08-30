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

let argv = process.argv.slice(2);
let options = [];

argv.forEach((a) => {
  if (a === 'all') {
    options = options.concat(['update', 'demo', 'webpack', 'server']);
  } else if (['update', 'demo', 'webpack', 'server'].indexOf(a) >= 0) {
    options.push(a);
  }
});

// remove duplicate
options = options.filter((opt, pos) => {
  return options.indexOf(opt) === pos;
});

if (options.length === 0) {
  console.log(`Usage: node node_modules/rctui/cli/init.js [options]
  options:
    all     install dependencies, add demo, dev server, webpack config
    update  install/update dependencies
    demo    add demo dir
    webpack add webpack config, will overwrite webpack.config.js!!!
    server  add dev server
  `);
  return;
}

function mkdir (p) {
  if (!fs.existsSync(p)){
    fs.mkdirSync(p);
  }
}

function copy (origin, newFile) {
  fs.createReadStream(origin).pipe(fs.createWriteStream(newFile));
}

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

    if (options.indexOf('server') >= 0) {
      Object.keys(dependencies.server).forEach((m) => {
        data.devDependencies[m] = dependencies.server[m];
        dps.push({ m, v:dependencies.server[m] });
      });
    }

    fs.writeFile('./package.json', JSON.stringify(data, null, 2), (err) => {
      if (err) { reject(err); }
    });

    let total = dps.length;
    let count = 0;
    function done(msg) {
      count++;
      console.log(`${msg} [${count}/${total}]`);
      if (count === total) {
        // all done
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

function copyWebpackConfig (resolve, reject) {
  try {
    copy(`${__dirname}/webpack.config.js`, './webpack.config.js');
    console.log('add webpack.config.js success.');
    resolve(true);
  } catch (e) {
    reject(e);
  }
}

function copyDemo (resolve, reject) {
  try {
    mkdir('./demo');
    copy(`${__dirname}/demo/index.js`, './demo/index.js');
    copy(`${__dirname}/demo/index.css`, './demo/index.css');
    copy(`${__dirname}/demo/index.html`, './demo/index.html');
    console.log('add demo dir success.');
    resolve(true);
  } catch (e) {
    reject(e);
  }
}

function copyDevServer (resolve, reject) {
  try {
    copy(`${__dirname}/devServer.js`, './devServer.js');
    console.log('add devServer.js success.');
    resolve(true);
  } catch (e) {
    reject(e);
  }
}

const funcs = {
  'update': updatePackage,
  'demo': copyDemo,
  'webpack': copyWebpackConfig,
  'server': copyDevServer
}

let func = funcs[options[0]];
let promise = new Promise(func);
for (let i=1; i<options.length; i++) {
  promise = promise.then(() => new Promise(funcs[options[i]]));
}
promise.catch((e) => {
  throw e;
});

