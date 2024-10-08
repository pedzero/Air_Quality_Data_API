import express from 'express'

import airQualityController from '../controllers/airQualityController.js'

const router = express.Router()

router.get('/aqi', airQualityController.generate)

export default router