import express from 'express'

const router = express.Router()

router.post('/api/data', (request, response) => {
    const data = request.body
    console.log(data)

    response.sendStatus(200)
})

export default router