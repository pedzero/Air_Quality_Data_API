import express from 'express'

import dataController from '../controllers/dataController.js'

const router = express.Router()

router.post('/data', dataController.create)

export default router