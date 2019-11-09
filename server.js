const express = require('express')
const bodyParser = require('body-parser');
const request = require('request');
require('dotenv').config();
const Key = process.env.apiKey;

const app = express()

app.set('view engine', 'ejs')
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', function (req, res) {
  res.render('maps', {weather: "Weather Will be displayed when clicked on a location!", error: null});
 
  console.log("/get called");

})

app.post('/', function (req, res) {

  let lati=req.body.lat;
  let longi=req.body.lon;
  let url = `http://api.openweathermap.org/data/2.5/weather?lat=${lati}&lon=${longi}&units=metric&appid=${Key}`

  request(url, function (err, response, body) {
    
    if(err){
      res.render('maps', {weather: null, error: 'Error, please try again'});
      console.log("error");
      
    } 
    
    else {
      let weather = JSON.parse(body)
      
      if(weather.main == undefined){
        res.render('maps', {weather: null, error: 'Error, please try again'});
        console.log(weather);
      } 
      
      else {
        let weatherText = `It's ${weather.main.temp} degrees celsius in ${weather.name}!! with ${weather.weather[0]["main"]} and wind speed : ${weather.wind["speed"]}`;
        res.render('maps', {weather: weatherText, error: null});
        console.log(weatherText);
        console.log("/post called");
      }
    }
  });
})
var port=process.env.PORT || 5000;
app.listen(port, function () {
  console.log('Example app listening on port %d!',port)
})