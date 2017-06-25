/**
 * Created by Simon on 2017-06-22.
 */

const request = require("request");

let     baseUrl = "https://www.googleapis.com/customsearch/v1?",
        key = "key=" + process.env.GOOGLE_API_KEY,
        cx = "&cx=" + process.env.SEARCH_CX,
        searchType = "&searchType=image",
        start = "&start=1";
        optionsURL = baseUrl + key + cx + searchType + start;

let getImage = function(cityName, callback){
    let imageSearchUrl = optionsURL + "&q=" + cityName;

    request(imageSearchUrl, function(error, response, body){
        if(error){
            console.log(error);
            callback(error);
        }else{
            imageData = JSON.parse(body);
            imageUrl = imageData.items[0].link;
            callback(undefined, imageUrl);
        }
    });
};

module.exports = {
    getImage
};