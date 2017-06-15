/**
 * Created by Simon on 2017-06-14.
 */

const request = require('request');

let getCoordinates = function(location, callback){
    const baseUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
    let locationUrl = baseUrl + location;
    request(locationUrl, function (error, response, body) {
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
    getCoordinates
};