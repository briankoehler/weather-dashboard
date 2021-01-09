
fetch('http://localhost:3000/api/today/jacksonville')
.then(res => res.json())
.then(data => {
    document.getElementById('today-high').innerHTML = Math.round(data['main']['temp_max'])
    document.getElementById('today-low').innerHTML = Math.round(data['main']['temp_min'])
})

fetch('http://localhost:3000/api/forecast/jacksonville')
.then(res => res.json())
.then(data => {

    days = data['daily']

    for (const [index, element] of days.entries()) {

        newTemperature = ''

        newTemperature += Math.round(element['temp']['max'])
        newTemperature += '/'
        newTemperature += Math.round(element['temp']['min'])

        document.getElementById('day-' + index + '-temperature').innerHTML = newTemperature

    }

})