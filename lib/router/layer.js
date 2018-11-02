'use strict'
module.exports = Layer

function Layer (path, method, fn) {
  this.method = method
  this.handle = fn
  this.path = path
}

Layer.prototype.handle_method = function (req) {
  return this.method.toLowerCase() === req.method.toLowerCase()
}
Layer.prototype.handle_path = function (req) {
  return this.path === req.url
}
Layer.prototype.handle_request = function (req, res, next) {
  if (!this.handle_method(req) || !this.handle_path(req)) {
    return
  }
  const fn = this.handle
  try {
    fn(req, res, next)
  } catch (err) {
    throw err
  }
}
