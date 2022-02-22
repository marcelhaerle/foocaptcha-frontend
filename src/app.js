const express = require('express')
const {engine} = require('express-handlebars')
const path = require('path')
const morgan = require('morgan')
const logger = require('./logger')
const redis = require('./db/redis')
const homeRoute = require('./routes/home')
const apiRoutes = require('./routes/api')(redis)
const metrics = require('./metrics')

const app = express()

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', path.join(__dirname, 'views'))

app.use(express.static(path.join(__dirname, '..', 'public')))
app.use(metrics)

// Logging
app.use(morgan('short', { stream: logger.stream }))

app.use('/', homeRoute)
app.use('/api', apiRoutes)

// 404 handler
app.use((req, res) => {
  res.status(404).render('404');
})

// Error handler, must be last 'use' call!
app.use((err, req, res, next) => {
  logger.error(err.message)
  res.status(500).render('500')
})

module.exports = app
