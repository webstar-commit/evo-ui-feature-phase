var moment = require('moment');
var request = require('request');
var mongoose = require('mongoose');


//mongoose head



var hourlyCpuUtilization_schema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId
    },
    hour: {
        type: Date
    },
    avgCpuUtilization: {
        type: Number
    }
    });
    

var hourlyCpuUtilization = mongoose.model('container_stats_hourly_cpu', hourlyCpuUtilization_schema)

function generate_id() {
    var id = new mongoose.Types.ObjectId();
    console.log("new id generated" + id)
    return id;
}


    
//end mongoose head
//require('request').debug = true

var today = moment();
var yesterday = today.subtract(1, 'd').minute(0)
var log_day = moment("2016-08-21");
var DateToAvgCPU = []
console.log(today.format())


for (i = 1; i < 24; i++) {
  var start_date = log_day
  var start_date_formatted = start_date.format("Y-MM-DDTH")
  var end_date = start_date.add(1, 'h')
  var end_date_formatted = end_date.format("Y-MM-DDTH")
  console.log("Start Date: " + start_date_formatted + " End Date: " + end_date_formatted)
  var myID = generate_id()
  getData(start_date_formatted, end_date_formatted, myID);

}

/*setTimeout(function() {
 console.log('DateToAvgCPU', DateToAvgCPU);
 }, 2000);*/

function getData(StartDate, EndDate, ID) {


  DataURL = "http://127.0.0.1:3000/api/container_stats/cpu/utilization/" + StartDate + "/" + EndDate
  console.log(DataURL)

  request({
    method: 'GET',
    url: DataURL,
    local_start_date: StartDate,
    local_end_date: EndDate,
    local_id: ID
    
    
  }, testFunction)

  function testFunction(error, response, body) {
    if (error) {
      console.log("Made it to http://127.0.0.1:3000/api/container_stats/current/cpu/utilization/")
      res.json(502, {
        error: "bad_gateway",
        reason: err.code
      });
      return;
    }
    if (!error && response.statusCode == 200) {

      var parsedBody = JSON.parse(body)

      if (Object.keys(parsedBody).length !== 0) {

        console.log("parsed body first item avgCpuUtilization")
        console.log(parsedBody[0].avgCpuUtilization)

        var keyname = StartDate
        var id = ID
        DateToAvgCPU.push({
          key: keyname,
          value: parsedBody[0].avgCpuUtilization,
            id: ID
        })
  console.log("checking date to average length ")
        if (DateToAvgCPU.length > 0) {
            console.log("date to average length match 10")
            console.log(StartDate)
            console.log(ID)
            console.log(parsedBody[0].avgCpuUtilization)
//          console.log('DateToAvgCPU', DateToAvgCPU)
          
        var newAvgs = new hourlyCpuUtilization({
        _id: ID,
        hour: moment(StartDate).toDate(),
        avgCpuUtilization: parsedBody[0].avgCpuUtilization

    });
    console.log("writing to database ")
    console.log(newAvgs)

    newAvgs.save(function(err, newAvgs) {
        if (err) return console.error(err);
    });
            
console.log("Opening up connection to MongoDB")
mongoose.connect('mongodb://localhost:27017/evolute');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // we're connected!
});

            console.log("Closing MongoDB connection")
//            mongoose.connection.close()
        }

        return "hello";
      }
        console.log("logging DateToAvgCPU")
      console.log(DateToAvgCPU)
    } else {
      console.log("something else happened when querying /api/health/container brother")
      console.log(response)
      console.log(body)
    }

  }

}


//console.log(DateToAvgCPU)


