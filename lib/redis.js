import { createClient } from 'redis'

const redisClient = createClient({
  url: process.env.REDIS_URL
})

redisClient.on('error', err => {
  console.error(err.message)
})

redisClient.connect().then(() => {
  console.log('Connected!')
})

export default redisClient
