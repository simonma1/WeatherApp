/**
 * Created by Simon on 2017-06-14.
 */

const request = require('request');

let getCoordinates = function(callback){
    request('https://maps.googleapis.com/maps/api/geocode/json?address=montreal', function (error, response, body) {
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