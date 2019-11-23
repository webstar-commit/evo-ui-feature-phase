var moment = require('moment');
var request = require('request');
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
    getData(start_date_formatted,end_date_formatted);

}

function getData(StartDate, EndDate) {


    DataURL = "http://127.0.0.1:3000/api/container_stats/cpu/utilization/" + start_date_formatted + "/" + end_date_formatted
    console.log(DataURL)

    request({
        method: 'GET',
        url: DataURL,
        local_start_date: StartDate,
        local_end_date: EndDate
    }, testFunction)

}


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

            
            var keyname = start_date_formatted
            DateToAvgCPU.push({
                key: keyname,
                value: parsedBody[0].avgCpuUtilization
            })
//            console.log(DateToAvgCPU)

     
            return "hello";
        }
console.log(DateToAvgCPU)
    } else {
        console.log("something else happened when querying /api/health/container brother")
        console.log(response)
        console.log(body)

        
    }
    
}

//console.log(DateToAvgCPU)