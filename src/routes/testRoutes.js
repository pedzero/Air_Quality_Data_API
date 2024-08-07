import express from 'express'

const router = express.Router()

router.get('/ping', (request, response) => {
    console.log("Pinged!")
    response.json({ message: "Pong!" })
})

export default router