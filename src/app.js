const express = require('express')
const { engine } = require('express-handlebars')
const path = require('path')

const app = express()

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', path.join(__dirname, 'views'))

app.use('/', require('./routes/home'))

module.exports = app
