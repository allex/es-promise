/* global self */
import Promise from './_export'

export default function polyfill () {
  let local

  if (typeof global !== 'undefined') {
    local = global
  } else if (typeof self !== 'undefined') {
    local = self
  } else {
    try {
      local = Function('return this')() /* eslint no-new-func: "off" */
    } catch (e) {
      throw new Error('polyfill failed because global object is unavailable in this environment')
    }
  }

  let P = local.Promise

  if (P) {
    var promiseToString = null
    try {
      promiseToString = Object.prototype.toString.call(P.resolve())
    } catch (e) {
      // silently ignored
    }

    if (promiseToString === '[object Promise]' && !P.cast) {
      return
    }
  }

  local.Promise = Promise
}
