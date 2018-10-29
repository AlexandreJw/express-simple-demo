const http = require('http')
const methods = require('methods')
const Route = require('./router/router.js')
const slice = Array.prototype.slice
const app = function (req, res) {
  app.handle(req, res)
}
app.init = function () {
  /// 每个发布者都需要一个电话本
  this.route = new Route()
}
app.handle = function (req, res) {
  /// 事件的发布
  this.route.dispatch.apply(this.route, slice.call(arguments))
}
app.listen = function (port) {
  const server = http.createServer(this)
  return server.listen.apply(server, arguments)
}
methods.forEach(function (method) {
  app[method] = function (fn) {
    this.route[method].apply(this.route, slice.call(arguments))
  }
})

module.exports = function () {
  app.init()
  return app
}