const express = require('../index.js')
const app = express()
app.get(function (req, res) {
  res.end('hahah')
})
app.listen(3001)
