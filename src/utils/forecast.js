const request = require('request')

const forecast = (longitude, latitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=3c4cb257a330cf3e5781d0d969f4d9cd&query=' + latitude + ',' + longitude + '&units=f'
    request({ url: url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service !', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            const currentWeather = body.current

            callback(undefined, currentWeather.weather_descriptions[0] + '. It is currently ' + currentWeather.temperature + ' degrees out. There is a ' + currentWeather.precip + ' % chance of rain. Humidity is ' + currentWeather.humidity + ' %')
        }
    })
}

module.exports = forecast