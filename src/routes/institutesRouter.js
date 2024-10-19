import express from 'express'

import institutesController from '../controllers/institutesController.js'

const router = express.Router()

router.get('/institutes', institutesController.retrieve)

export default router