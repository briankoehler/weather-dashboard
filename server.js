const express = require('express')
const https = require('https')
const cors = require('cors')
const dotenv = require('dotenv')

dotenv.config()
const OPEN_WEATHER_API_KEY = process.env.OPEN_WEATHER_API_KEY

const app = express()
const port = 3000


app.use(express.static('public'))
app.use(cors())
app.listen(port)


/* Home Page */
app.get('/', (req, res) => {
    res.render('index.html')
})


/* Back End */
app.get('/api/today/jacksonville', (req, res) => {

    const options = {

        hostname: 'api.openweathermap.org',
        port: 443,
        path: '/data/2.5/weather?q=Jacksonville&units=imperial&appid=' + OPEN_WEATHER_API_KEY,
        method: 'GET'

    }

    let body = ''

    const req2 = https.request(options, res2 => {

        res2.on('data', d => {
            body = body + d
        })

        res2.on('end', () => {
            res.json(JSON.parse(body))
        })

    })

    req2.end()

})

app.get('/api/forecast/jacksonville', (req, res) => {

    const options = {

        hostname: 'api.openweathermap.org',
        port: 443,
        path: '/data/2.5/onecall?lat=30.332184&lon=-81.6557&units=imperial&appid=' + OPEN_WEATHER_API_KEY,
        method: 'GET'

    }

    let body = ''

    const req2 = https.request(options, res2 => {

        res2.on('data', d => {
            body = body + d
        })

        res2.on('end', () => {
            res.json(JSON.parse(body))
        })

    })

    req2.end()

})