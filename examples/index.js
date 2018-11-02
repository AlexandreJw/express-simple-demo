const express = require('../index.js')
const app = express()
app.get('/foo', function (req, res, next) {
  res.end('Welcome to GET /foo')
})

app.get('/bar', function (req, res, next) {
  res.end('Welcome to GET /bar')
})

app.post('/foo', function (req, res, next) {
  res.end('Welcome to POST /foo')
})
app.get('/favicon.ico', function (req, res, next) {
  res.end('Welcome to GET /favicon.ico')
})
app.listen(3001)