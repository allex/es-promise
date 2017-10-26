/**
 * Rollup worker for bundle multiple entry
 *
 * MIT Licensed
 *
 * Authors:
 *   Allex Wang <allex.wxn@gmail.com> (http://iallex.com/)
 */

'use strict'

const Rollup = require('rollup-worker')
const fssConfig = require('config-finder')('fss')

function logError (e) {
  console.log(e)
}

(async function main() {
  let cfg = await fssConfig()
  if (cfg = (cfg && cfg.config)) {
    const worker = new Rollup(cfg.rollup)
    return worker.build()
  }
  throw new Error('fss config not found.')
})()
