'use strict'
const flatten = require('array-flatten')
const Layer = require('./layer')
const methods = require('methods')
const slice = Array.prototype.slice

module.exports = Route

function Route () {
  this.stack = []
  this.methods = {}
}

Route.prototype.dispatch = function (req, res) {
  const method = req.method.toLowerCase()
  const path = req.url
  const stack = this.stack
  let idx = 0
  next()
  function next () {
    const layer = stack[idx++]
    if (layer.method && layer.method !== method || layer.path !== path) {
      return next()
    }
    layer.handle_request(req, res, next)
  }
}
methods.forEach(function (method) {
  Route.prototype[method] = function () {
    let handles = flatten(slice.call(arguments))
    let path = ''
    if(typeof handles[0] === 'string') {
      path = handles.shift()
    }
    for (let i = 0; i < handles.length; i++) {
      const layer = new Layer(path, method, handles[i])
      this.methods[method] = true
      this.stack.push(layer)
    }
  }
})
