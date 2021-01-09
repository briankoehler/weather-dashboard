const express = require('express')
const https = require('https')
const cors = require('cors')
const dotenv = require('dotenv')

dotenv.config()
const OPEN_WEATHER_API_KEY = process.env.OPEN_WEATHER_API_KEY
const LOCATION_IQ_API_KEY = process.env.LOCATION_IQ_API_KEY

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
app.get('/api/today/:city', (req, res) => {

    const options = {

        hostname: 'api.openweathermap.org',
        port: 443,
        path: '/data/2.5/weather?q=' + req.params.city + '&units=imperial&appid=' + OPEN_WEATHER_API_KEY,
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

app.get('/api/forecast/:coords', (req, res) => {

    const coords = JSON.parse(req.params.coords)

    const options = {

        hostname: 'api.openweathermap.org',
        port: 443,
        path: '/data/2.5/onecall?lat=' + coords.latitude + '&lon=' + coords.longitude + '&units=imperial&appid=' + OPEN_WEATHER_API_KEY,
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

app.get('/api/city/:coords', (req, res) => {

    const coords = JSON.parse(req.params.coords)

    const options = {

        hostname: 'locationiq.com',
        port: 443,
        path: '/v1/reverse.php?key=' + LOCATION_IQ_API_KEY + '&lat=' + coords.latitude + '&lon=' + coords.longitude + '&format=json',
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