/* globals Chart:false, feather:false */

const socket = io();

function openDevice(evt, eventNumber) {
  var i, tabcontent, tablinks;

  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active","");
  }

  document.getElementById(eventNumber).style.display = "block";
  evt.currentTarget.className += " active";
}

document.getElementById("defaultOpen").click();

// (function () {
//   'use strict'

//   feather.replace({ 'aria-hidden': 'true' })

//   // Graphs
//   var ctx = document.getElementById('myChart')
//   // eslint-disable-next-line no-unused-vars
//   var myChart = new Chart(ctx, {
//     type: 'line',
//     data: {
//       labels: [
//         'Sunday',
//         'Monday',
//         'Tuesday',
//         'Wednesday',
//         'Thursday',
//         'Friday',
//         'Saturday'
//       ],
//       datasets: [{
//         data: [
//           15339,
//           21345,
//           18483,
//           24003,
//           23489,
//           24092,
//           12034
//         ],
//         lineTension: 0,
//         backgroundColor: 'transparent',
//         borderColor: '#007bff',
//         borderWidth: 4,
//         pointBackgroundColor: '#007bff'
//       }]
//     },
//     options: {
//       scales: {
//         yAxes: [{
//           ticks: {
//             beginAtZero: false
//           }
//         }]
//       },
//       legend: {
//         display: false
//       }
//     }
//   })
// })()

socket.emit('temp',latestObj.temp);

socket.on('temp',(tempVal) => {
  console.log(tempVal);
  document.getElementById("temp").innerHTML = latestObj.tempVal;
})

// var axios = require('axios');
// var config = {
//   method: 'get',
//   url: 'http://api.thedamagecontrol.com/measurements/',
//   headers: { }
// };

// axios(config)
// .then(function (response) {
//   //console.log(JSON.stringify(response.data));
//   var objArray = JSON.stringify(response.data);
//   var jsonData = JSON.parse(objArray);
//   var latestObj = jsonData[jsonData.length - 1];

//   console.log(latestObj);
//   console.log(latestObj.temp);

//   document.getElementById("status").innerHTML = "Safe";
//   document.getElementById("temp").innerHTML = latestObj.temp;
//   document.getElementById("humidity").innerHTML = latestObj.humidity;
//   document.getElementById("water").innerHTML = latestObj.waterLevel;
  

// })
// .catch(function (error) {
//   console.log(error);
// });

