import express from 'express'

import airQualityController from '../controllers/airQualityController.js'

const router = express.Router()

router.get('/aqi/:city/:institute/:room', airQualityController.generate)

export default router