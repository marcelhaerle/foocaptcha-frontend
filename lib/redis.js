import {createClient} from 'redis';
import {logger} from './logger';

const redisClient = createClient({
  url: process.env.REDIS_URL
})

redisClient.on('error', err => {
  logger.error(err.message)
})

redisClient.connect().then(() => {
  logger.info('Redis connected')
})

export default redisClient
