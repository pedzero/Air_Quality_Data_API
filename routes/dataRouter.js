import express from 'express'

import buffer from '../services/dataBufferService.js'

const router = express.Router()

router.post('/api/data', (request, response) => {
    const data = request.body
    const sender = request.headers.host

    console.log(`Adding new content in buffer from ${sender}.`)
    
    buffer.addDataToBuffer(data)

    response.sendStatus(200)
})

export default router