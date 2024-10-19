import express from 'express'

import roomsController from '../controllers/roomsController.js'

const router = express.Router()

router.get('/rooms', roomsController.retrieve)

export default router