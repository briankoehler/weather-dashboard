# Simple Weather Dashboard
Minimalistic weather dashboard to provide today's weather, temperature, high, low, as well as a 5-day forecast.

Determines the user's position through JavaScript's GeoLocation, and finds closest city using the LocationIQ API; weather data is retrieved from the Open Weather Map API.  Developed using Node.js and Express.js.

## Getting Started
Make sure you have [Node.js](https://nodejs.org/en/) installed.  Use the following to get the web application and its dependencies.

```
git clone https://github.com/briankoehler/weather-dashboard/
cd weather-dashboard
npm install
```

Next, obtain the necessary API keys.  Make an account at [Open Weather Map](https://openweathermap.org/api) and retrieve your API key.  Then make an account at [LocationIQ](https://locationiq.com) and retrieve your API key.

Then create a ```.env``` file within the ```weather-dashboard``` directory.  Edit the file to have the format below, replacing ```{YOUR OPEN WEATHER API KEY}``` and ```{YOUR LOCATIONIQ API KEY}``` with the corresponding API keys retrieved before.

```
OPEN_WEATHER_API_KEY="{YOUR OPEN WEATHER API KEY}"
LOCATION_IQ_API_KEY="{YOUR LOCATIONIQ API KEY}"
```

Once you want to run the web application:

```
npm run start
```

**NOTE: Unless you have a premium key from Open Weather Map, you will be limited in the frequency of calls.  Currently, the dashboard submits 4 calls every 7 minutes (amounting to rougly 823 calls per day, which is below the expected 1000 per day of the free plan).**


## Customization
### Update Frequency
If you are looking to change the time between updates, find the following code snippet in ```public/scripts/script.js```:

```
(async () => {
    let loc = await getLocation()
    wrapperUpdate(loc)
    window.setInterval(wrapperUpdate, 60 * 7 * 1000, loc)
})()
```
Simply change the 7 to the desired number of minutes between updates.


## Planned Features
* Better UI
* Settings
* Small animations
* City selection
* Lack of location sharing handling
