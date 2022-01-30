var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var axios = require('axios');
// const socketio = require('socket.io');
// const http = require('http');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// const server = http.createServer(app);
// const io = socketio(server);

const { createServer } = require("http");
const { Server } = require("socket.io");
const httpServer = createServer(app);
const io = new Server(httpServer,{});


console.log("Beginning socket");
io.on('connection', socket => { 
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
        
        socket.on('getTemp',() => {
            socket.emit('temp',latestObj.temp);
        })
      
      })
      .catch(function (error) {
        console.log(error);
      });
});

httpServer.listen(3000);
module.exports = app;
