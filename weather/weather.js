/**
 * Created by Simon on 2017-06-13.
 */
const request = require('request');

let getWeatherData = function(lat, lng, callback){
    const baseUrl = 'https://api.darksky.net/forecast/';
    const apiKey = process.env.FORECASTIO_API_KEY;
    let fullUrl = baseUrl + apiKey + '/' + lat + ','  + lng;
    request(fullUrl, function (error, response, body) {
        if(error){
            console.log(error);
            return callback(error);
        }else{
            //console.log(body);
            return callback(undefined, body);
        }
    });
};

module.exports = {
    getWeatherData
};