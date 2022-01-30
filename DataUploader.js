var MongoClient = require('mongodb').MongoClient;

const uri = "mongodb+srv://admin:tamuhack@cluster0.t4gfg.mongodb.net/Devices?retryWrites=true&w=majority";

var SerialPort = require('serialport');

var axios = require('axios');

function tryParseJson (str) {
    try {
        JSON.parse(str);
    } catch (e) {
        console.log("yo");
        return false;
    }
    return JSON.parse(str);
}

function main() {

    var port = new SerialPort('COM3', {
        baudRate: 9600
    });
      
    var Readline = SerialPort.parsers.Readline
    var parser = new Readline()
    port.pipe(parser)

    const logIntervalMinutes = 0.1;
    let lastMoment = new Date();

    port.on('open', function () {
        console.log('Opened port...');
    
            // perform actions on the collection object
    
            parser.on('data', function (data) {
                str = data.toString(); //Convert to string
                str = JSON.stringify(str); // Convert to JSON
                str = tryParseJson(data); //Then parse it

                const moment = new Date();
                console.log(str);

                if (moment.getTime() - lastMoment.getTime() > logIntervalMinutes * 60 * 1000) {
                    lastMoment = moment;

                    var record = JSON.stringify({
                        temp: str.temperature, 
                        humidity: str.humidity, 
                        waterLevel: str.waterlevel, 
                        timestamp: moment
                    });

                    console.log(record);

                    var config = {
                        method: 'post',
                        url: 'http://api.thedamagecontrol.com/measurements/',
                        headers: { 
                          'Content-Type': 'application/json'
                        },
                        data : record
                    };  

                    axios(config)
                    .then(function (response) {
                      console.log(JSON.stringify(response.data));
                    })
                    .catch(function (error) {
                      console.log("error");
                    });
                    
                } 
    
        });
    
    });
}

main();

/*
async function main() {
    
    const client = new MongoClient(uri);
        // Connect to the MongoDB cluster
        await client.connect();
        const collection = client.db("Devices").collection("device00");

        var port = new SerialPort('COM3', {
            baudRate: 9600
        });
          
        var Readline = SerialPort.parsers.Readline
          
        var parser = new Readline()
        port.pipe(parser)


        const logIntervalMinutes = 0.1;
        let lastMoment = new Date();

        port.on('open', function () {
            console.log('Opened port...');
        
                // perform actions on the collection object
        
                parser.on('data', function (data) {
                    str = data.toString(); //Convert to string
                    str = JSON.stringify(str); // Convert to JSON
                    str = tryParseJson(data); //Then parse it

                    const moment = new Date();

                    if (moment.getTime() - lastMoment.getTime() > logIntervalMinutes * 60 * 1000) {
                        lastMoment = moment;
                        //var obj = {temperature: str.temperature, humidity: str.humidity, water_level: str.waterlevel, date: moment};
                        collection.insertOne( { temperature: str.temperature, humidity: str.humidity, water_level: str.waterlevel, date: moment } );
                        console.log("Logged " + moment);
                    } 
        
            });
        
        });
 

}
*/


/*
var count = 0;
var portName;

loop();   // start searching for Arduino on a port

function loop() {
    loopId = setInterval(function() {
        serialPort.list().then(function(ports){
            ports.forEach(function(portInfo){
                portName = portInfo.path;
                var myPort = new serialPort(portName);
                myPort.on('open' , function() {
                    showPortOpen();
                    myPort.write('RL');   // command to initiate Arduino functions
                });

                var Readline = serialPort.parsers.Readline
          
                var parser = new Readline()
                myPort.pipe(parser)
                
                parser.on('data' , readSerialData);   // echo data from Arduino
                myPort.on('close', showPortClose);       
            })
        })
    }, 1000)
};

async function readSerialData(data) {
    //console.log(data);
    const collection = client.db("Devices").collection("device00");
}

function showPortOpen() {
    console.log(portName,'opened');


    const client = new MongoClient(uri);
    await client.connect();

    count++;
    console.log(count);
    clearInterval(loopId);   // stop looping once Arduino found on port

}

function showPortClose() {
    console.log(portName,'closed');
    loop();   // start over when Arduino port is closed
}

*/

