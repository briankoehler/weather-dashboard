
/**
 * Updates all temperatures of dashboard
 * @param {JSON} loc 
 */
const updateAllTemperatures = (loc) => {

    /* Determine city and coordinates from JSON loc object */
    let city = loc['address']['city']
    let coords = {
        latitude: loc['lat'],
        longitude: loc['lon']
    }

    /**
     * Updates today's temperature and high/low
     */
    const updateTodayTemperatures = () => {
        
        /* Connecting to backend to retrieve data */
        fetch('http://localhost:3000/api/today/' + city)
        
        /* Parse response as JSON */
        .then(res => res.json())

        /* Replace temperatures using JSON data (round to nearest degree) */
        .then(data => {
            document.getElementById('today-temperature').textContent = Math.round(data['main']['temp'])
            document.getElementById('today-high-low').innerHTML = Math.round(data['main']['temp_max']) + '/' + Math.round(data['main']['temp_min'])
        })
    }


    /**
     * Updates high/low of next 5 days
     */
    const updateForecastTemperatures = () => {

        /* Connecting to backend to retrieve data */
        fetch('http://localhost:3000/api/forecast/{"latitude":' + coords.latitude + ', "longitude":' + coords.longitude + '}')

        /* Parse response as JSON */
        .then(res => res.json())

        /* Replace temperatures using JSON data (round to nearest degree) */
        .then(data => {

            /* Retrieving only next 5 days */
            let days = data['daily'].splice(0, 5)

            /* Enumerate days */
            for (const [index, element] of days.entries()) {

                /* Retrieving high/low */
                newTemperature = Math.round(element['temp']['max']) + '/' + Math.round(element['temp']['min'])

                /* Setting corresponding <p> text */
                document.getElementById('day-' + index + '-temperature').innerText = newTemperature
            }
        })
    }

    /* Execute update functions */
    updateTodayTemperatures()
    updateForecastTemperatures()
}


/**
 * Updates all weather icons of dashboard
 * @param {JSON} loc 
 */
const updateAllWeather = (loc) => {

    /**
     * Returns string of corresponding Feather-Icon
     * @param {String} weather 
     */
    const getIconFromWeather = (weather) => {

        /* Initialize icon */
        icon = ''

        /* Set icon to corresponding Feather-Icon name */
        if (weather == 'Thunderstorm') {
            icon = 'cloud-lightning'
        }
        else if (weather == 'Drizzle') {
            icon = 'cloud-drizzle'
        }
        else if (weather == 'Rain') {
            icon = 'cloud-rain'
        }
        else if (weather == 'Snow') {
            icon = 'cloud-snow'
        }
        else if (weather == 'Clear') {
            icon = 'sun'
        }
        else if (weather == 'Clouds') {
            icon = 'cloud'
        }
        else {
            icon = 'help-circle'
        }

        return icon
    }

    /* Determine city and coordinates from JSON loc object */
    let city = loc['address']['city']
    let coords = {
        latitude: loc['lat'],
        longitude: loc['lon']
    }

    /**
     * Updates today's weather icon
     */
    const updateTodayWeather = () => {

        /* Connecting to backend to retrieve data */
        fetch('http://localhost:3000/api/today/' + city)

        /* Parse response as JSON */
        .then(res => res.json())

        /* Replace weather icons based on JSON data (referencing getIconFromWeather) */
        .then(data => {

            /* Retrieving weather from JSON data */
            let weather = data['weather'][0]['main']

            /* Setting data-feather attribute of today's weather icon  */
            document.getElementById('today-weather').setAttribute('data-feather', getIconFromWeather(weather))

            /* Replacing icon */
            feather.replace()
        })
    }


    /**
     * Update weather icons of next 5 days
     */
    const updateForecastWeather = () => {

        /* Connecting to backend to retrieve data */
        fetch('http://localhost:3000/api/forecast/{"latitude":' + coords.latitude + ', "longitude":' + coords.longitude + '}')
        
        /* Parse response as JSON */
        .then(res => res.json())

        /* Replace icons using JSON data (referencing getIconFromWeather) */
        .then(data => {

            /* Retrieving only next 5 days */
            let days = data['daily'].splice(0, 5)

            /* Enumerate days */
            for (const [index, element] of days.entries()) {

                /* Retrieving weather from JSON data */
                weather = element['weather'][0]['main']

                /* Setting data-feather attribute of corresponding icon element */
                document.getElementById('day-' + index + '-weather').setAttribute('data-feather', getIconFromWeather(weather))
                
                /* Replacing icon */
                feather.replace()
            }
        })
    }

    /* Execute update functions */
    updateTodayWeather()
    updateForecastWeather()

}


/**
 * Updates weather icons and temperatures
 * @param {JSON} loc 
 */
const wrapperUpdate = (loc) => {
    updateAllWeather(loc)
    updateAllTemperatures(loc)
}


/**
 * Retrieves location of user using JavaScript GeoLocation
 */
const getLocation = async () => {

    /**
     * Returns Promise of JavaScript GeoLocation
     */
    const getPosition = () => {
        return new Promise((res, rej) => {
            navigator.geolocation.getCurrentPosition(res, rej)
        })
    }
    
    /* Initialize position from getPosition and corresponding coordinates */
    let position = (await getPosition()).coords
    let coords = [position.latitude, position.longitude]

    /* Connect to backend to determine city data */
    const response = await fetch('http://localhost:3000/api/city/{"latitude":' + coords[0] + ', "longitude":' + coords[1] + '}')

    /* Parse response as JSON */
    const respJson = await response.json()

    /* Return JSON data */
    return respJson
}

/* Async wrapper that is executed to begin update cycle */
(async () => {
    let loc = await getLocation()
    wrapperUpdate(loc)
    window.setInterval(wrapperUpdate, 60 * 7 * 1000, loc)
})()
