const   express     = require('express'),
        hbs  = require('hbs');

const   weather = require('./weather/weather'),
        location = require('./location/location');

let app = express();
app.use(express.static('public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper("convertPercentage", function(num){
    return num * 100;
});

hbs.registerHelper("convertToCelsius", function(num){
    return ((num - 32) * 0.5556).toFixed(2);
});

app.get('/', function (req, res) {
    location.getCoordinates("montreal",function (err, location) {
        res.render('home',{location: location});
    });
});

app.get('/search', function (req, res) {
    location.getCoordinates(req.query.location,function (err, location) {
        let locationObj = JSON.parse(location);
        console.log(locationObj.results[0].geometry.location.lat);
        let lat = locationObj.results[0].geometry.location.lat;
        let lng = locationObj.results[0].geometry.location.lng;
        let cityName = locationObj.results[0].address_components[0].long_name;
        weather.getWeatherData(lat, lng, function(err, weatherForecast){
            weatherForecast = JSON.parse(weatherForecast);
            res.render('weather', {weatherForecast: weatherForecast, cityName: cityName});
        });
    });
});

app.listen(3000, function (err) {
   if(!err){
       console.log("Starting server on port 3000");
   }
});