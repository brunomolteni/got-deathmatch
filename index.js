const express = require('express')
const app = express()

app.use(express.static('dist'))
app.use('/static', express.static('static'))

app.listen(5000, function(err) {
  if (err) {
    console.error('error starting server:')
    console.error(err.stack)
    process.exit(1)
  }
  console.log('server listening at http://localhost:5000')
})
