import express from 'express'

import citiesController from '../controllers/citiesController.js'

const router = express.Router()

router.get('/cities', citiesController.retrieveAll)

export default router