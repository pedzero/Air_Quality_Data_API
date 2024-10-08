import express from 'express'

import parametersController from '../controllers/parametersController.js'

const router = express.Router()

router.get('/parameters', parametersController.retrieve)

export default router