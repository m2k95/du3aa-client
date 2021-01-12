require('dotenv').config()
const express = require('express')
const path = require('path')

const app = express()
const PORT = process.env.PORT || 4000

const pkg = require('./package.json')

app.use(express.static(path.join(__dirname, 'views')))
app.set('view engine', 'ejs')

app.get('*', (req, res) => {
  return res.render('index', { version: pkg.version })
})

app.use((err, req, res, next) => {
  console.error('::: CATCH ERROR ::: ' + err)
  res.status(501)
  return res.send('Internal Server Error')
})

app.listen(PORT)
