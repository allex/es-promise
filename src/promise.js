import Promise from './modules/_export'
import polyfill from './modules/_polyfill'

import './modules/es7.promise.try'
import './modules/es7.promise.finally'

Promise.polyfill = polyfill
Promise.Promise = Promise

export default Promise
