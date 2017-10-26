// vim: set ft=javascript  fdm=marker et ff=unix tw=80 sw=4:

var path = require('path')

module.exports = {
  rollup: {
    destDir: path.join(__dirname, './dist'),
    entry: [
      {
        input: 'src/promise.js',
        plugins: [],
        targets: [
          {
            format: 'umd',
            name: 'ES6Promise',
            file: 'promise.umd.js'
          },
          {
            format: 'cjs',
            file: 'promise.esm.js'
          }
        ]
      },
      {
        input: 'src/promise.polyfill.js',
        plugins: [],
        targets: [
          {
            format: 'umd',
            name: 'ES6Promise',
            file: 'promise.polyfill.js'
          }
        ]
      }
    ]
  }
}
