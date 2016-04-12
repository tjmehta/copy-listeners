# copy-listeners [![Build Status](https://travis-ci.org/tjmehta/copy-listeners.svg)](https://travis-ci.org/tjmehta/copy-listeners) [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](http://standardjs.com/)
copy (or move) event listeners from one event emitter to another

# Installation
```bash
npm i --save copy-listeners
```

# Usage

### Example: copy all listeners from one event emitter to another
```js
var copyListeners = require('copy-listeners')

var ee = new EventEmitter()
var ee2 = new EventEmitter()

ee.on('foo', function () {
  console.log('FOO!')
})

copyListeners(ee, ee2)

ee.emit('foo') // prints "FOO!".. like normal
ee2.emit('foo') // prints "FOO!".. the listener was copied to ee2
```

### Example: copy select listeners from one event emitter to another
```js
var copyListeners = require('copy-listeners')

var ee = new EventEmitter()
var ee2 = new EventEmitter()

ee.on('foo', function () {
  console.log('FOO!')
})
ee.on('bar', function () {
  console.log('BAR!')
})

copyListeners(ee, ee2, ['bar'])

ee.emit('foo') // prints "FOO!".. like normal
ee2.emit('foo') // does nothing.. was not copied
ee.emit('bar') // prints "BAR!".. like normal
ee2.emit('bar') // prints "BAR!".. the listener was copied to ee2
```

### Example: move all listeners from one event emitter to another (removes listeners from source)
```js
var moveListeners = require('copy-listeners').moveListeners

var ee = new EventEmitter()
var ee2 = new EventEmitter()

ee.on('foo', function () {
  console.log('FOO!')
})
ee.on('bar', function () {
  console.log('BAR!')
})

moveListeners(ee, ee2)

ee.emit('foo') // does nothing.. it was removed
ee2.emit('foo') // prints "FOO!".. the listener was copied to ee2
ee.emit('bar') // does nothing.. it was removed
ee2.emit('bar') // prints "BAR!".. the listener was copied to ee2
```

### Example: move select listeners from one event emitter to another (removes listeners from source)
```js
var moveListeners = require('copy-listeners').moveListeners

var ee = new EventEmitter()
var ee2 = new EventEmitter()

ee.on('foo', function () {
  console.log('FOO!')
})
ee.on('bar', function () {
  console.log('BAR!')
})

moveListeners(ee, ee2, ['bar'])
// to move all listeners don't provide `events`: moveListeners(ee, ee2)

ee.emit('foo') // prints "FOO!".. like normal
ee2.emit('foo') // does nothing.. was not copied
ee.emit('bar') // does nothing.. it was removed
ee2.emit('bar') // prints "BAR!".. the listener was copied to ee2
```

# License
MIT
