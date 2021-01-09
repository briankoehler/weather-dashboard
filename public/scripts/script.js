
const updateAllTemperatures = (loc) => {

    let city = loc['address']['city']
    let coords = {
        latitude: loc['lat'],
        longitude: loc['lon']
    }

    const updateTodayTemperatures = () => {
        fetch('http://localhost:3000/api/today/' + city)
        .then(res => res.json())
        .then(data => {
            document.getElementById('today-temperature').textContent = Math.round(data['main']['temp'])
            document.getElementById('today-high-low').innerHTML = Math.round(data['main']['temp_max']) + '/' + Math.round(data['main']['temp_min'])
        })
    }


    const updateForecastTemperatures = () => {
        console.log(coords.latitude)
        console.log(coords.longitude)
        console.log('http://localhost:3000/api/forecast/{"latitude":' + coords.latitude + ', "longitude":' + coords.longitude + '}')
        fetch('http://localhost:3000/api/forecast/{"latitude":' + coords.latitude + ', "longitude":' + coords.longitude + '}')
        .then(res => res.json())
        .then(data => {

            console.log(data)
            days = data['daily'].splice(0, 5)

            for (const [index, element] of days.entries()) {

                newTemperature = ''

                newTemperature += Math.round(element['temp']['max'])
                newTemperature += '/'
                newTemperature += Math.round(element['temp']['min'])

                document.getElementById('day-' + index + '-temperature').innerHTML = newTemperature

            }

        })
    }

    updateTodayTemperatures()
    updateForecastTemperatures()

}


const updateAllWeather = (loc) => {

    const getIconFromWeather = (weather) => {
        icon = ''
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

    let city = loc['address']['city']
    let coords = {
        latitude: loc['lat'],
        longitude: loc['lon']
    }

    const updateTodayWeather = () => {
        fetch('http://localhost:3000/api/today/' + city)
        .then(res => res.json())
        .then(data => {

            weather = data['weather'][0]['main']

            document.getElementById('today-weather').setAttribute('data-feather', getIconFromWeather(weather))

            feather.replace()
        })
    }


    const updateForecastWeather = () => {
        fetch('http://localhost:3000/api/forecast/{"latitude":' + coords.latitude + ', "longitude":' + coords.longitude + '}')
        .then(res => res.json())
        .then(data => {

            days = data['daily'].splice(0, 5)

            for (const [index, element] of days.entries()) {

                weather = element['weather'][0]['main']

                document.getElementById('day-' + index + '-weather').setAttribute('data-feather', getIconFromWeather(weather))
                
                feather.replace()
            }

        })
    }

    updateTodayWeather()
    updateForecastWeather()

}


const wrapperUpdate = (loc) => {
    updateAllWeather(loc)
    updateAllTemperatures(loc)
}


const getLocation = async () => {
    const getPosition = () => {
        return new Promise((res, rej) => {
            navigator.geolocation.getCurrentPosition(res, rej)
        })
    }
    
    let position = (await getPosition()).coords
    let coords = [position.latitude, position.longitude]

    //const response = await fetch('https://us1.locationiq.com/v1/reverse.php?key=pk.bc93fefc85bac01fc31204c8042518fb&lat=' + coords[0] + '&lon=' + coords[1] + '&format=json')
    const response = await fetch('http://localhost:3000/api/city/{"latitude":' + coords[0] + ', "longitude":' + coords[1] + '}')
    const respJson = await response.json()
    console.log(respJson)
    return respJson
}

(async () => {
    let loc = await getLocation()
    wrapperUpdate(loc)
    window.setInterval(wrapperUpdate, 120 * 1000, loc)
})()
