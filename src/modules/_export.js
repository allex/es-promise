/**
 * Generic export for both internal export and globally
 *
 * MIT Licensed
 *
 * Authors:
 *   Allex Wang <allex.wxn@gmail.com> (http://iallex.com/)
 */

import global from './_global'
import _Promise from 'promise-polyfill'

var $Promise = global.Promise

const { process } = global
const { toString } = {}

const isNode = toString.call(process) === '[object process]'

const uid = (function () {
  // refs: core-js/modules/_uid.js
  let id = 0
  let px = Math.random()
  return (key) => {
    return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36))
  }
})()

const _wks = (function () {
  // refs: core-js/modules/_wks.js
  const store = {}
  const USE_SYMBOL = typeof Symbol === 'function'
  return (name) => {
    return store[name] || (store[name] =
      USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name))
  }
})()

const empty = function () { /* empty */ }

// Inspaired by core-js/library/modules/es6.promise.js
const USE_NATIVE = !!(function () {
  try {
    // correct subclassing with @@species support
    const promise = $Promise.resolve(1)
    const FakePromise = (promise.constructor = {})[_wks('species')] = function (exec) {
      exec(empty, empty)
    }
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    // https://github.com/zloirock/core-js/issues/319#issuecomment-317036136
    return (isNode || typeof PromiseRejectionEvent === 'function') && promise.then(empty) instanceof FakePromise
  } catch (e) { /* empty */ }
}())

if (!USE_NATIVE) {
  $Promise = global.Promise = _Promise
}

export default $Promise
