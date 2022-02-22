const promBundle = require("express-prom-bundle")
const client = require('prom-client')
const redis = require('./db/redis')

const collectDefaultMetrics = client.collectDefaultMetrics
const Registry = client.Registry
const register = new Registry()
collectDefaultMetrics({ register })

new client.Gauge({
  name: 'redis',
  help: '1 = up, 0 = not up',
  collect() {
    this.set(redis.isOpen ? 1 : 0)
  },
  registers: [register]
})

const metrics = promBundle({
  includeMethod: true,
  includePath: true,
  promRegistry: register
})

module.exports = metrics
