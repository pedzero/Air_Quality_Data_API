import express from 'express'

import citiesController from '../controllers/citiesController.js'

const router = express.Router()

router.get('/cities', citiesController.retrieve)
router.delete('/cities', citiesController.destroy)

export default router