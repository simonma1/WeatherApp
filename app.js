const   express     = require('express'),
        hbs  = require('hbs');

const   weather = require('./weather/weather'),
        location = require('./location/location');

let app = express();
app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');

app.get('/', function (req, res) {
    location.getCoordinates(function (err, location) {
        res.render('home',{location: location});
    });
});

app.get('/search', function (req, res) {
    weather.getWeatherData(function(err, currentWeather){
        console.log(currentWeather);
        res.render('weather', {currentWeather: currentWeather});
    });
});

app.listen(3000, function (err) {
   if(!err){
       console.log("Starting server on port 3000");
   }
});