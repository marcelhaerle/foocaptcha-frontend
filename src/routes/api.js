const express = require('express')
const router = express.Router()
const axios = require('axios')

const FC_URL = process.env.FC_URL
const API_KEY = process.env.API_KEY

axios.interceptors.request.use(
  config => {
    config.headers['Authorization'] = `Bearer ${API_KEY}`;
        return config;
    },
    error => {
        return Promise.reject(error);
    }
)

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

  // Proxy chars captcha creation
  router.get('/chars', async (req, res) => {
    const response = await axios.get(`${FC_URL}/api/v1/chars`)
    res.json({
      id: response.data.id,
      url: `${FC_URL}/api/v1/captcha/${response.data.id}`
    })
  })

  // Proxy equation captcha creation
  router.get('/equation', async (req, res) => {
    const response = await axios.get(`${FC_URL}/api/v1/equation`)
    res.json({
      id: response.data.id,
      url: `${FC_URL}/api/v1/captcha/${response.data.id}`
    })
  })

  // Proxy captcha verification
  router.get('/verify/:id/:guess', (req, res) => {
    const id = req.params['id']
    const guess = req.params['guess']
    axios
      .get(`${FC_URL}/api/v1/verify/${id}/${guess}`)
      .then(response => {
        if (response.status === 200) {
          res.status(200).end()
        } else {
          res.status(400).end()
        }
      })
      .catch(() => {
        res.status(400).end()
      })
  })

  return router
}

module.exports = apiRouter
