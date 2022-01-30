var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var axios = require('axios');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));
// app.use("/axios",express.static('node_modules/axios'));

app.use('/', indexRouter);
app.use('/users', usersRouter);

    var config = {
        method: 'get',
        url: 'http://api.thedamagecontrol.com/measurements/',
        headers: { }
      };
      
      axios(config)
      .then(function (response) {
        //console.log(JSON.stringify(response.data));
        var objArray = JSON.stringify(response.data);
        var jsonData = JSON.parse(objArray);
        var latestObj = jsonData[jsonData.length - 1];
      
        console.log(latestObj);
        console.log(latestObj.temp);
      
        // document.getElementById("status").innerHTML = "Safe";
        // document.getElementById("temp").innerHTML = latestObj.temp;
        // document.getElementById("humidity").innerHTML = latestObj.humidity;
        // document.getElementById("water").innerHTML = latestObj.waterLevel;
      
      })
      .catch(function (error) {
        console.log(error);
      });

module.exports = app;
