/**
 * Created by Simon on 2017-06-22.
 */

const request = require("request");

let     baseUrl = "https://www.googleapis.com/customsearch/v1?",
        key = "key=" + process.env.GOOGLE_API_KEY,
        cx = "&cx=" + process.env.SEARCH_CX,//Custom search engine
        searchType = "&searchType=image",//To search for images
        start = "&start=1";//Index of the first image to receive
        optionsURL = baseUrl + key + cx + searchType + start;

let getImage = function(cityName, callback){
    let imageSearchUrl = optionsURL + "&q=" + cityName;//append the city name to the search

    request(imageSearchUrl, function(error, response, body){
        if(error){
            console.log(error);
            callback(error);
        }else{
            imageData = JSON.parse(body);//parses the data to the JSON format
            let imageNumber = Math.floor(Math.random() * imageData.items.length);
            imageUrl = imageData.items[imageNumber].link;
            callback(undefined, imageUrl);
        }
    });
};

module.exports = {
    getImage
};