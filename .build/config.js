/**
 * Configs module for project builder extends
 *
 * MIT Licensed
 *
 * Authors:
 *   Allex Wang <allex.wxn@gmail.com> (http://iallex.com/)
 */

'use strict'

const path = require('path')
const pkg = require('../package.json')

const resolve = function(dir) {
  return path.resolve(__dirname, '..', dir)
}

// Normalize fss configrations
const fssConfig = pkg.fss || {}
if (!fssConfig.publicPath) {
    let cdnPrefix = fssConfig.cdnPrefix
    if (!cdnPrefix) {
      throw new Error('FSS cdn prefix not found.')
    }
    cdnPrefix = cdnPrefix.replace(/\/+$/, '')
    fssConfig.publicPath = `${cdnPrefix}/${pkg.name}@${pkg.version}`
}

module.exports = {
  fssConfig
}

// vim: set ft=javascript fdm=marker et ff=unix tw=80 sw=2:
