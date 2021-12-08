const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const request = require('request');

const apiKey = 'd5d6f2667efb63b18ca593c8f29022e8';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  res.render('index', {weather: null, error: null});
})

//app.post('/', function (req, res) {
//  res.render('index');
//  console.log(req.body.city);
//})

app.post('/', function (req, res) {
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

  request(url, function (err, response, body) {
    if(err){
      res.render('index', {weather: null, error: 'Error, please try again'});
    } else {
      let weather = JSON.parse(body)
      if(weather.main == undefined){
        res.render('index', {weather: null, error: 'Error, please try again'});
      } else {
        let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
        res.render('index', {weather: weatherText, error: null});
      }
    }
  });
})
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Hello world listening on port', port);
});
