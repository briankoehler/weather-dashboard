const express = require('express')
const https = require('https')
const cors = require('cors')
const dotenv = require('dotenv')

/* .env Retrieval */
dotenv.config()
const OPEN_WEATHER_API_KEY = process.env.OPEN_WEATHER_API_KEY
const LOCATION_IQ_API_KEY = process.env.LOCATION_IQ_API_KEY

/* Express setup */
const app = express()
const port = 3000


/* Configuring Express */
app.use(express.static('public'))
app.use(cors())
app.listen(port)


/* Home Page */
app.get('/', (req, res) => {
    res.render('index.html')
})


/* Retrieving today's forecast given a city name */
app.get('/api/today/:city', (req, res) => {

    /* HTTPS Request Options */
    const options = {
        hostname: 'api.openweathermap.org',
        port: 443,
        path: '/data/2.5/weather?q=' + req.params.city + '&units=imperial&appid=' + OPEN_WEATHER_API_KEY,
        method: 'GET'
    }

    /* Initialize body */
    let body = ''

    /* Submit HTTPS request to get today's forecast data as JSON */
    const req2 = https.request(options, res2 => {

        /* Appends new data to body*/
        res2.on('data', d => {
            body = body + d
        })

        /* Once request is finished, send a JSON response */
        res2.on('end', () => {
            res.json(JSON.parse(body))
        })
    })

    /* End HTTPS request */
    req2.end()
})


/* Retreieve forecast for next 6 days given coordinates */
app.get('/api/forecast/:coords', (req, res) => {

    /* Converts coords parameter to JSON */
    const coords = JSON.parse(req.params.coords)

    /* HTTPS Request Options */
    const options = {
        hostname: 'api.openweathermap.org',
        port: 443,
        path: '/data/2.5/onecall?lat=' + coords.latitude + '&lon=' + coords.longitude + '&units=imperial&appid=' + OPEN_WEATHER_API_KEY,
        method: 'GET'
    }

    /* Initialize body */
    let body = ''

    /* Submit HTTPS request to get weeks forecast data as JSON */
    const req2 = https.request(options, res2 => {

        /* Appends new data to body*/
        res2.on('data', d => {
            body = body + d
        })

        /* Once request is finished, send a JSON response */
        res2.on('end', () => {
            res.json(JSON.parse(body))
        })
    })

    /* End HTTPS request */
    req2.end()
})


/* Retrieve the location data given coordinates */
app.get('/api/city/:coords', (req, res) => {

    /* Converts coords parameter to JSON */
    const coords = JSON.parse(req.params.coords)

    /* HTTPS Request Options */
    const options = {
        hostname: 'locationiq.com',
        port: 443,
        path: '/v1/reverse.php?key=' + LOCATION_IQ_API_KEY + '&lat=' + coords.latitude + '&lon=' + coords.longitude + '&format=json',
        method: 'GET'
    }

    /* Initialize body */
    let body = ''

    /* Submit HTTPS request to get location data as JSON */
    const req2 = https.request(options, res2 => {

        /* Appends new data to body*/
        res2.on('data', d => {
            body = body + d
        })

        /* Once request is finished, send a JSON response */
        res2.on('end', () => {
            res.json(JSON.parse(body))
        })
    })

    /* End HTTPS request */
    req2.end()
})
