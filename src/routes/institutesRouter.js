import express from 'express'

import institutesController from '../controllers/institutesController.js'

const router = express.Router()

router.get('/institutes', institutesController.retrieve)
router.delete('/institutes', institutesController.destroy)

export default router