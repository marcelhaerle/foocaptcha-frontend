const express = require('express')
const router = express.Router()

const apiRouter = (redisClient) => {
  router.get('/stats', async (req, res) => {
    const totalCaptchas = await redisClient.get('fc:totalCaptchas')
    const totalVerified = await redisClient.get('fc:totalVerified')
    const totalViewed = await redisClient.get('fc:totalViewed')
    res.json({
      totalCaptchas: totalCaptchas || 0,
      totalVerified: totalVerified || 0,
      totalViewed: totalViewed || 0
    })
  })

  return router
}

module.exports = apiRouter
