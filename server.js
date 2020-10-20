require('dotenv').config()
const express = require('express')
const fetch = require('node-fetch')
const path = require('path')

const app = express()
const PORT = process.env.PORT || 4000

const API_URL = process.env.API_URL

app.use(express.static(path.join(__dirname, "views")));
app.set('view engine', 'ejs');

app.get('/', (req, res) =>{
    fetch(API_URL + '/twitter/oauth', {method: 'POST'})
    .then(resp => resp.json())
    .then(data => {
        var button
        if (data.url == undefined){
            button = '<p style="color: #ff3535">الرجاء المحاولة لاحقاً</p>'
        }else{
            button = `<a href="${data.url}" class="btn">اضغط هنا للإشتراك</a>`
        }
        res.render('index', {url:button})
    })
    .catch(err => {
        console.log(err)
        res.render('index', {url:'<p style="color: #ff3535">الرجاء المحاولة لاحقاً</p>'})
    })
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
