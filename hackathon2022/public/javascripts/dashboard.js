/* globals Chart:false, feather:false */

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

(function () {
  'use strict'

  feather.replace({ 'aria-hidden': 'true' })

  // Graphs
  var ctx = document.getElementById('myChart')
  // eslint-disable-next-line no-unused-vars
  var myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
      ],
      datasets: [{
        data: [
          15339,
          21345,
          18483,
          24003,
          23489,
          24092,
          12034
        ],
        lineTension: 0,
        backgroundColor: 'transparent',
        borderColor: '#007bff',
        borderWidth: 4,
        pointBackgroundColor: '#007bff'
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: false
          }
        }]
      },
      legend: {
        display: false
      }
    }
  })
})()

// async getMeasurements(){
//   const config = {
//     headers: {
//       "Access-Control-Allow-Origin": "*",
//       "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
//     }
//   };
//   this.measurements = await axios.get('http://api.thedamagecontrol.com/measurements%27,config);
// }

async function test() {
  var config = {
    method: 'get',
    url: 'http://api.thedamagecontrol.com/measurements/',
    headers: { }
  };

  await axios(config)
  .then(function (response) {
    //console.log(JSON.stringify(response.data));
    var objArray = JSON.stringify(response.data);
    var jsonData = JSON.parse(objArray);
    var latestObj = jsonData[jsonData.length - 1];

    console.log(latestObj);
    console.log(latestObj.temp);
    
    document.getElementById("temp").innerHTML = latestObj.temp;
    document.getElementById("humidity").innerHTML = latestObj.humidity;
    document.getElementById("water").innerHTML = latestObj.waterLevel;
    
    if (latestObj.waterLevel > 200) {
      document.getElementById("status").innerHTML = "Is flooding";
    } else if (latestObj.temp > 105) {
      document.getElementById("status").innerHTML = "Heat Wave";
    } else if (latestObj.temp < 20) {
      document.getElementById("status").innerHTML = "Cold Spell";
    } else if (latestObj.temp > 150) {
      document.getElementById("status").innerHTML = "Fire";
    } else {
      document.getElementById("status").innerHTML = "Safe";
    }

  })
  .catch(function (error) {
    console.log(error);
  });

  // setTimeout(window.location.reload(),30000);
}  
  test();
  
    

