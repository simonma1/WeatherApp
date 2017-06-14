/**
 * Created by Simon on 2017-06-13.
 */
const request = require('request');

let getWeatherData = function(callback){
    request('https://api.darksky.net/forecast/44f89dbceef00c16bd8804458d6b10af/37.8267,-122.4233', function (error, response, body) {
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