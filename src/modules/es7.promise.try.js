import Promise from './_export'

// https://github.com/tc39/proposal-promise-finally

if (typeof Promise.try !== 'function') {
  Promise.try = {
    try (func) {
      if (typeof this !== 'function') {
        throw new TypeError('Receiver must be a constructor')
      }
      return new this(function (resolve) {
        resolve(func())
      })
    }
  }.try
}
