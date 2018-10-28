const http = require('http')
const methods = require('methods')

const app = function (req, res) {
  app.handle(req, res)
}
app.init = function () {
  this.handles = []
}
app.handle = function (req,res) {
  const method = req.method
  this.handles.forEach((function (handle) {
     if (method.toLowerCase() === handle.method){
       handle.fn(req,res)
     }
  }))
}
app.listen = function (port) {
  const server = http.createServer(this)
  return server.listen.apply(server, arguments)
}
methods.forEach(function (item) {
  app[item] = function (fn) {
    const layer = new Layer(item, fn)
    this.handles.push(layer)
  }
})

function Layer (method, fn) {
  this.method = method
  this.fn = fn
}

module.exports = function () {
  app.init()
  return app
}