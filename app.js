require('dotenv').config();//sets the environment variables using the dotenv package
const   express     = require('express'),
        hbs  = require('hbs');

const   weather = require('./weather/weather'),
        location = require('./location/location'),
        imageSearch = require('./location/image');

let app = express();
app.use(express.static('public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');//Uses hbs(handlebars) as the view engine for the program
hbs.registerPartials(__dirname + '/views/partials');

//Function to convert decimals to their percentage representation
hbs.registerHelper("convertPercentage", function(num){
    return num * 100;
});

//Converts Farenheit values from the forecast api to their Celsius value
hbs.registerHelper("convertToCelsius", function(num){
    return ((num - 32) * 0.5556).toFixed(2);
});

//Main route
app.get('/', function (req, res) {
    res.render('home');
});


app.get('/search', function (req, res) {
    //Gets the coordinate of the location entered by the user
    location.getCoordinates(req.query.location,function (err, locationObj) {
        if(err){
            //If there is an error or no results were found, will redirect to the main page
            console.log(err);
            res.redirect('/');
        }else{

            let lat = locationObj.results[0].geometry.location.lat;
            let lng = locationObj.results[0].geometry.location.lng;
            let cityName = locationObj.results[0].address_components[0].long_name;

            //Uses the coordinates to find the forecast at the location
            weather.getWeatherData(lat, lng, function(err, weatherForecast){
                if(err){
                    console.log(err);
                }else{
                    weatherForecast = JSON.parse(weatherForecast);

                    //Searches google for pictures corresponding to the city
                    imageSearch.getImage(cityName, function(err, imageResult){
                        if(err){
                            console.log(err);
                        }else{
                            //renders the weather page for the city with the forecast object, name of the location
                            // and the url for the background
                            res.render('weather', {
                                weatherForecast: weatherForecast,
                                cityName: cityName,
                                imageUrl: imageResult
                            });
                        }
                    });
                }
            });
        }

    });
});

app.listen(3000, function (err) {
   if(!err){
       console.log("Starting server on port 3000");
   }
});