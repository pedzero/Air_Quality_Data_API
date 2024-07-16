import express from 'express'
import bodyParser from 'body-parser'

const app = express()
const port = 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.get('/api/ping', (request, response) => {
    console.log("Pinged!")
    response.json({ message: "Pong!"})
})

const init = async () => {
    try {
        app.listen(port, () =>{
            console.log(`Server running on port ${port}.`)
        })
    } catch (error) {

    }
}

init()