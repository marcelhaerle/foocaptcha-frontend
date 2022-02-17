const express = require('express')
const router = express.Router()

const homeRouter = (redisClient) => {
  router.get('/', async (req, res) => {
    const totalCaptchas = await redisClient.get('fc:totalCaptchas')
    const totalVerified = await redisClient.get('fc:totalVerified')
    const totalViewed = await redisClient.get('fc:totalViewed')
    res.render('home', {
      totalCaptchas: totalCaptchas || 0,
      totalVerified: totalVerified || 0,
      totalViewed: totalViewed || 0
    })
  })

  return router
}

module.exports = homeRouter
