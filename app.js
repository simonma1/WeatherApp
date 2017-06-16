const   express     = require('express'),
        hbs  = require('hbs');

const   weather = require('./weather/weather'),
        location = require('./location/location');

let app = express();
app.use(express.static('public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');

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
        weather.getWeatherData(lat, lng, function(err, currentWeather){
            //console.log(currentWeather);
            res.render('weather', {currentWeather: currentWeather});
        });
    });
});

app.listen(3000, function (err) {
   if(!err){
       console.log("Starting server on port 3000");
   }
});