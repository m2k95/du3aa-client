require('dotenv').config()
const express = require('express')
const fetch = require('node-fetch')
const path = require('path')

const app = express()
const PORT = process.env.PORT || 4000

app.use(express.static(path.join(__dirname, 'views')))
app.set('view engine', 'ejs')

app.get('*', (req, res) => {
  let today = new Date()
  const dd = String(today.getDate()).padStart(2, '0')
  const mm = String(today.getMonth() + 1).padStart(2, '0')
  const yyyy = today.getFullYear()
  today = dd + '-' + mm + '-' + yyyy

  fetch(`https://api.aladhan.com/timingsByAddress/${today}?address=kuwait,al-asimah&method=9`)
    .then(resp => resp.json())
    .then(data => {
      if (data.code === 200) {
        const Fajr = data.data.timings.Fajr
        const Dhuhr = data.data.timings.Dhuhr
        const Asr = data.data.timings.Asr
        const Maghrib = data.data.timings.Maghrib
        const Isha = data.data.timings.Isha

        const prayer = {
          Fajr: `${reformatDate(Fajr)}`,
          Dhuhr: `${reformatDate(Dhuhr)}`,
          Asr: `${reformatDate(Asr)}`,
          Maghrib: `${reformatDate(Maghrib)}`,
          Isha: `${reformatDate(Isha)}`,
          Date: today
        }
        res.render('index', { prayer })
      } else {
        res.render('index')
      }
    })
    .catch(err => {
      console.log(err)
      res.render('index')
    })
})

app.use((err, req, res, next) => {
  console.error('::: CATCH ERROR ::: ' + err)
  res.send('501 internal error')
})

function reformatDate (date) {
  const h = date.toString().split(':')[0]
  const m = date.toString().split(':')[1]
  return parseInt(h) > 12 ? `${parseInt(h) - 12}:${m} م` : `${parseInt(h)}:${m} ص`
}

app.listen(PORT)
