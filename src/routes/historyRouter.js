import express from 'express'

import historyController from '../controllers/historyController.js'

const router = express.Router()

router.get('/history', historyController.getHistoricalData)

export default router