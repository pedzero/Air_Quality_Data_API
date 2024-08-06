import express from 'express'

import buffer from '../services/dataBufferService.js'

const router = express.Router()

router.post('/api/data', (request, response) => {
    const data = request.body
    let clientIp = request.headers['x-forwarded-for'] || request.socket.remoteAddress;

    if (clientIp.startsWith('::ffff:')) {
        clientIp = clientIp.replace('::ffff:', '');
    }

    console.log(`Adding new content in buffer from ${clientIp}.`)
    
    buffer.addDataToBuffer(data)

    response.sendStatus(200)
})

export default router