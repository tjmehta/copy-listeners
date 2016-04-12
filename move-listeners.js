var exists = require('101/exists')
var toArray = require('toarray')

module.exports = moveListeners

function moveListeners (src, dst, events) {
  var events = exists(events) ? toArray(events) : Object.keys(src._events)
  events.forEach(function (event) {
    listeners = src.listeners(event)
    listeners.forEach(function (listener) {
      dst.on(event, listener)
      src.removeListener(event, listener)
    })
  })
}
