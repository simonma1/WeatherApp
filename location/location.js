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
            let locationObj = JSON.parse(body);
            console.log(body);
            //If no results were found, passes the body, which will be an error message
            // back to the callback as an error to prevent the application from breaking
            if(locationObj.results.length === 0){
                console.log("No results found");
                return callback(locationObj);
            }
            return callback(undefined, locationObj);
        }
    });
};

module.exports = {
    getCoordinates
};