require('dotenv').config()
const express = require('express')
const fetch = require('node-fetch')
const path = require('path')

const app = express()
const PORT = process.env.PORT || 4000

// const API_URL = process.env.API_URL

app.use(express.static(path.join(__dirname, "views")));
app.set('view engine', 'ejs');

app.get('/', (req, res) =>{
    res.render('index')
})

app.get('/prayer', (req, res) => {
    res.render('prayer')
})

app.all('*', (req, res) => {
    res.redirect('/')
})

app.use((err, req, res, next) => {
    console.error('::: CATCH ERROR ::: ' + err)
    res.send('501 internal error')
})

app.listen(PORT)
