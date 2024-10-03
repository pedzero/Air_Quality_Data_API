import express from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'

import testRouter from './routes/testRoutes.js'
import dataRouter from './routes/dataRouter.js'
import aqiRouter from './routes/airQualityRouter.js'
import database from './config/database.js'

dotenv.config()

const app = express()
const port = process.env.PORT || 3333

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.use('/api', testRouter)
app.use('/api', dataRouter)
app.use('/api', aqiRouter)

const init = async () => {
    try {
        await database.sync()
        app.listen(port, () =>{
            console.log(`Server running on port ${port}.`)
        })
    } catch (error) {
        console.log(error)
    }
}

init()