//starting the backend procedure
const express = require('express')
const app = express()
const port = 3000

// root url
app.get('/', (req, res) => {
  res.send('Hello World!')
})

// console log to print
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
