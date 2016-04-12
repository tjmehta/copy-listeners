var describe = global.describe
var it = global.it

var EventEmitter = require('events').EventEmitter

var chai = require('chai')
var sinon = require('sinon')

var moveListeners = require('../').moveListeners

describe('move-listeners', function () {
  it('should move all listeners', function (done) {
    var ee = new EventEmitter()
    var ee2 = new EventEmitter()

    var listener = sinon.stub()
    ee.on('foo', listener)

    moveListeners(ee, ee2)

    ee.emit('foo')
    sinon.assert.notCalled(listener)
    ee2.emit('foo')
    sinon.assert.calledOnce(listener)
    done()
  })

  it('should move select listeners', function (done) {
    var ee = new EventEmitter()
    var ee2 = new EventEmitter()

    var fooListener = sinon.stub()
    var barListener = sinon.stub()
    ee.on('foo', fooListener)
    ee.on('bar', barListener)

    moveListeners(ee, ee2, 'bar')

    ee.emit('foo')
    sinon.assert.calledOnce(fooListener)
    ee2.emit('foo')
    sinon.assert.calledOnce(fooListener)
    ee.emit('bar')
    sinon.assert.notCalled(barListener)
    ee2.emit('bar')
    sinon.assert.calledOnce(barListener)
    done()
  })
})