const redis = require('redis')
const logger = require("../logger");

const redisClient = redis.createClient({
  url: process.env.REDIS_URL
})

redisClient.on('error', err => {
  logger.error(err.message)
})

redisClient.connect().then(() => {
  logger.info('Redis connected')
})

module.exports = redisClient
