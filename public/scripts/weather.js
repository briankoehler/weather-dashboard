
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


const updateAllWeather = () => {

    const updateTodayWeather = () => {
        fetch('http://localhost:3000/api/today/jacksonville')
        .then(res => res.json())
        .then(data => {

            weather = data['weather'][0]['main']

            document.getElementById('today-weather').setAttribute('data-feather', getIconFromWeather(weather))

            feather.replace()
        })
    }


    const updateForecastWeather = () => {
        fetch('http://localhost:3000/api/forecast/jacksonville')
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

window.onload = () => {
    updateAllWeather()
    setTimeout(updateAllWeather, 600000)
}