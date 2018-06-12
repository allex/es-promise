// vim: set ft=javascript fdm=marker et ff=unix tw=80 sw=2:

var path = require('path')
var babel = require('rollup-plugin-babel')
var dependencies = require('./package.json').dependencies

var plugins = [
  babel({
    babelrc: true,
    runtimeHelpers: true,
    exclude: 'node_modules/**'
  }),
  'resolve',
  'commonjs'
]

var banner = `/*! A promise implementation of Promises/A+, and with es7 promise enhancements. | MIT Licensed | http://fedor.io/ */`

module.exports = {
  rollup: {
    destDir: path.join(__dirname, './dist'),
    dependencies,
    entry: [
      {
        input: 'src/promise.js',
        plugins,
        targets: [
          {
            format: 'umd',
            name: 'ES6Promise',
            file: 'promise.umd.js',
            banner
          },
          {
            format: 'es',
            file: 'promise.esm.js',
            banner
          }
        ]
      },
      {
        input: 'src/promise.polyfill.js',
        plugins,
        targets: [
          {
            format: 'umd',
            name: 'ES6Promise',
            file: 'promise.polyfill.js',
            banner
          }
        ]
      }
    ]
  }
}
