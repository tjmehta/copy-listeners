var describe = global.describe
var it = global.it

var EventEmitter = require('events').EventEmitter

var chai = require('chai')
var sinon = require('sinon')

var copyListeners = require('../')

describe('copy-listeners', function () {
  it('should copy all listeners', function (done) {
    var ee = new EventEmitter()
    var ee2 = new EventEmitter()

    var listener = sinon.stub()
    ee.on('foo', listener)

    copyListeners(ee, ee2)

    ee.emit('foo')
    sinon.assert.calledOnce(listener)
    ee2.emit('foo')
    sinon.assert.calledTwice(listener)
    done()
  })

  it('should copy select listeners', function (done) {
    var ee = new EventEmitter()
    var ee2 = new EventEmitter()

    var fooListener = sinon.stub()
    var barListener = sinon.stub()
    ee.on('foo', fooListener)
    ee.on('bar', barListener)

    copyListeners(ee, ee2, 'bar')

    ee.emit('foo')
    sinon.assert.calledOnce(fooListener)
    ee2.emit('foo')
    sinon.assert.calledOnce(fooListener)
    ee.emit('bar')
    sinon.assert.calledOnce(barListener)
    ee2.emit('bar')
    sinon.assert.calledTwice(barListener)
    done()
  })
})