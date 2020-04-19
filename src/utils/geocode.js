const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiaG90d2hlZWxzMzMiLCJhIjoiY2s4eXh1Z3E2MWNidzNpczdlMGkzdHdnMiJ9.E8KpDkFGkE7wRc-WPEmEsQ&limit=1'

    request({ url, json: true }, (error, { statusCode, body }) => {
        if (error) {
            callback('Unable to connect to geocoding service', undefined)
        } else if (statusCode !== 200 || body.features.length === 0) {
            callback('Unable to find coordinates for the given location', undefined)
        } else {
            callback(undefined, {
                location: body.features[0].place_name,
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1]
            })
        }
    })
}

module.exports = geocode