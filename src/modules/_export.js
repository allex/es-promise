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
const empty = () => { /* empty */ }

const isNode = toString.call(process) === '[object process]'

// Inspaired by core-js/library/modules/es6.promise.js
const USE_NATIVE = !!(function () {
  try {
    // correct subclassing with @@species support
    const promise = $Promise.resolve(1)
    const FakePromise = function (exec) { exec(empty, empty) }
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent === 'function') && promise.then(empty) instanceof FakePromise
  } catch (e) { /* empty */ }
}())

if (!USE_NATIVE) {
  $Promise = global.Promise = _Promise
}

export default $Promise
