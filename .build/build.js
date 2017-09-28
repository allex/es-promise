/**
 * rollup.config.js
 *
 * MIT Licensed
 *
 * Authors:
 *   Allex Wang <allex.wxn@gmail.com> (http://iallex.com/)
 */

'use strict'

var fs = require('fs')
var rollup = require('rollup')
var uglify = require('uglify-js')
var babel = require('rollup-plugin-babel')
var commonjs = require('rollup-plugin-commonjs')
var node = require('rollup-plugin-node-resolve')
var cfg = require('./config').fssConfig

rollup.rollup({
  input: 'src/index.js',
  plugins: [
    node({
      jsnext: true,
      browser: true,
      module: true
    }),
    babel({
      babelrc: true,
      runtimeHelpers: true,
      exclude: 'node_modules/**'
    }),
    commonjs()
  ]
})
.then(bundle =>
  bundle.generate({ format: 'umd', name: cfg.library }).then(({code}) =>
    write(`dist/${cfg.distname}.umd.js`, uglify.minify(code, { output: {
      comments: function (n, c) {
        /*
        IMPORTANT: Please preserve 3rd-party library license info,
        inspired from @allex/amd-build-worker/config/util.js
        */
        var text = c.value, type = c.type;
        if (type == 'comment2') {
          return /^!|@preserve|@license|@cc_on|MIT/i.test(text)
        }
      }
    } }).code, bundle)
  )
)
.then(bundle =>
  bundle.generate({
    format: 'cjs',
  }).then(({code}) => write(`dist/${cfg.distname}.esm.js`, code, bundle))
)
.catch(logError)

function read (path) {
  return fs.readFileSync(path, 'utf8')
}

function write (dest, code, bundle) {
  return new Promise(function (resolve, reject) {
    fs.writeFile(dest, code, function (err) {
      if (err) return reject(err)
      console.log(blue(dest) + ' ' + getSize(code))
      resolve(bundle)
    })
  })
}

function getSize (code) {
  return (code.length / 1024).toFixed(2) + 'kb'
}

function logError (e) {
  console.log(e)
}

function blue (str) {
  return '\x1b[1m\x1b[34m' + str + '\x1b[39m\x1b[22m'
}
