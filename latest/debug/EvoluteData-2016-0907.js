var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');
var request = require('request');
var moment = require('moment');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())


mongoose.connect('mongodb://localhost:27017/evolute');
var info_schema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'lxc_id'
    },
    lxc_id: {
        type: String
    },
    dns_name: {
        type: String
    },
    ip_addr: {
        type: String
    },
    ReadTime: {
        type: Date
    },
    Names: {
        type: Array,
        "assigned_name": []
    },
    Image: {
        type: String
    },
    Command: {
        type: String
    },
    Created: {
        type: Number
    },
    Ports: {
        type: Array,
        "port_numbers": []
    },
    Labels: {
        Labels: Object
    },
    Status: {
        type: String
    }
});

//Mongoose Schemas
var stats_schema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId
    },
    read: {
        type: Date
    },
    network: {
        type: Object
    },
    precpu_stats: [{
        cpu_usage: [{
            total_usage: {
                type: String
            },
            percpu_usage: [{
                type: String
            }],
            usage_in_kernelmode: {
                type: String
            },
            usage_in_usermode: {
                type: String
            },
            system_cpu_usage: {
                type: String
            },
            throttling_data: [{
                periods: {
                    type: Number
                },
                throttled_periods: {
                    type: Number
                },
                throttled_time: {
                    type: Date
                },
            }]
        }],

    }],
    cpu_stats: [{
        cpu_usage: [{
            total_usage: {
                type: String
            },
            percpu_usage: [{
                type: String
            }],
            usage_in_kernelmode: {
                type: String
            },
            usage_in_usermode: {
                type: String
            },
            system_cpu_usage: {
                type: String
            },
            throttling_data: [{
                periods: {
                    type: Number
                },
                throttled_periods: {
                    type: Number
                },
                throttled_time: {
                    type: Date
                },
            }]
        }],

    }],
    memory_stats: [{
        usage: {
            type: Number
        },
        max_usage: {
            type: Number
        },
        stats: [{
            active_anon: Number,
            active_file: Number,
            cache: Number,
            hierarchical_memory_limit: {
                type: String
            },
            hierarchical_memsw_limit: {
                type: String
            },
            inactive_anon: Number,
            inactive_file: Number,
            mapped_file: Number,
            pgfault: Number,
            pgmajfault: Number,
            pgpgin: Number,
            pgpgout: Number,
            rss: Number,
            rss_huge: Number,
            swap: Number,
            total_active_anon: Number,
            total_active_file: Number,
            total_cache: Number,
            total_inactive_anon: Number,
            total_inactive_file: Number,
            total_cache: Number,
            total_inactive_file: Number,
            total_inactive_file: Number,
            total_mapped_file: Number,
            total_pgfault: Number,
            total_pgmajfault: Number,
            total_pgpgin: Number,
            total_pgpgout: Number,
            total_rss: Number,
            total_rss_huge: Number,
            total_swap: 0,
            total_unevictable: Number,
            unevictable: Number
        }],
        failcnt: Number,
        limit: {
            type: String
        }
    }],
    blkio_stats: [{
        io_service_bytes_recursive: [{
            major: Number,
            minor: Number,
            op: String,
            value: Number
        }],
        io_serviced_recursive: [{
            major: Number,
            minor: Number,
            op: String,
            value: Number
        }],
        io_queue_recursive: {
            type: Array
        },
        io_service_time_recursive: {
            type: Array
        },
        io_wait_time_recursive: {
            type: Array
        },
        io_merged_recursive: {
            type: Array
        },
        io_time_recursive: {
            type: Array
        },
        sectors_recursive: {
            type: Array
        }
    }],
    Host_DNS: {
        type: String
    },
    Host_IP: {
        type: String
    },
    LXC_Id: {
        type: String
    }
});

var services_schema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId
    },
    svcName: {
        type: String
    },
    svcStatus: {
        type: String
    },
    svcOwner: {
        type: String
    },
    svcHealth: {
        type: String
    },
    svcUptime: {
        type: String
    },
    //WORKS    svcApplications: {
    //        type: Array,
    //        "application": []
    //    },
    svcApplications: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'appInfos'
    }],

});

var apps_schema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId
    },
    appName: {
        type: String
    },
    appStatus: {
        type: String
    },
    appOwner: {
        type: String
    },
    appHealth: {
        type: String
    },
    appUptime: {
        type: String
    }
});

function generate_id() {
    var id = new mongoose.Types.ObjectId();
    console.log("new id generated" + id)
    return id;
}
//End Mongoose Schemas

//Mongoose Models
var containerInfos = mongoose.model('container_infos', info_schema);
var currentContainerInfos = mongoose.model('current_container_infos', info_schema);
var containerStats = mongoose.model('container_stats', stats_schema);
var currentContainerStats = mongoose.model('current_container_stats', stats_schema);
var serviceInfos = mongoose.model('service_infos', services_schema);
var appInfos = mongoose.model('app_infos', apps_schema);
//End Mongoose Models


app.get('/api/container_infos', function(req, res) {
    //    WORKS containerInfos.findOne(function (err, data) {
    containerInfos.find(function(err, data) {

            res.json(data);
        })
        //        .sort({'lxc_id': 1, 'date': -1})
        .limit(50);
});

app.get('/api/container_infos/current', function(req, res) {

    currentContainerInfos.find(function(err, data) {

        res.json(data);
    })

});



app.get('/api/container_infos/test', function(req, res) {
    containerInfos.aggregate([{
            "$limit": 200
        }, {
            $sort: {
                'lxc_id': 1,
                'date': -1
            }
        }, {
            $group: {
                '_id': "$lxc_id",
                lastDate: {
                    $last: "$ReadTime"
                }
            }
        }


    ], function(err, result) {
        if (err) {
            console.log(err);
            return;
        }
        console.log(result);
        res.json(result);
    });
});

app.get('/api/container_stats', function(req, res) {
    containerStats.findOne(function(err, data) {
        res.json(data);
    });
});

app.get('/api/container_stats/current', function(req, res) {
    console.log("someone hit /api/container_stats/current")
    currentContainerStats.find(function(err, data) {

        console.log("query executed to mongodb for all current container stats")
        res.json(data);
    })

});

app.get('/api/container_stats/current/top5/cpu', function(req, res) {
    currentContainerStats.aggregate({
        $project: {
            _id: 0,
            Names: 1,
            ratio: {
                $divide: ["$cpu_stats.cpu_usage.total_usage", "$cpu_stats.system_cpu_usage"]
            }
        }
    }, {
        $project: {
            Names: 1,
            percent: {
                $multiply: ["$ratio", 100]
            }
        }
    }, {
        $sort: {
            percent: -1
        }
    }, {
        $limit: 5
    }, function(err, data) {
        res.json(data);

    });

});

app.get('/api/container_stats/current/top5/memory', function(req, res) {
    currentContainerStats.aggregate({
        $project: {
            _id: 0,
            Names: 1,
            ratio: {
                $divide: ["$memory_stats.usage", "$memory_stats.limit"]
            }
        }
    }, {
        $project: {
            Names: 1,
            percent: {
                $multiply: ["$ratio", 100]
            }
        }
    }, {
        $sort: {
            percent: -1
        }
    }, {
        $limit: 5
    }, function(err, data) {
        res.json(data);

    });

});


app.get('/api/container_stats/current/top5/disk', function(req, res) {
    currentContainerStats.aggregate([
        {
            "$project": {
                lxc_id: 1,
                Names: 1,
                blkio_stats: 1
            }
        }
    ], function(err, result) {
        if (err) {
            console.log(err);
            return;
        }
        console.log("Logging current container stats data")
        console.log(result);
        console.log("parsing data on /api/container_stats/current/top5/disk ")
           
        var resultString = (JSON.stringify(result))
        console.log(resultString)
        var resultJSON = JSON.parse(resultString)
        console.log(resultJSON)
        var containerToDiskIOTotal = [];
        var containerToDiskIORead = [];
        var containerToDiskIOWrite = [];

        resultJSON.forEach(function(diskItem, index, arr) {
            console.log("logging disk item")
            console.log(diskItem);
            console.log("disk item blkio_stats")
            console.log(diskItem.blkio_stats)
            console.log("disk item blkio_stats io_service_bytes_recursive")
            console.log(diskItem.blkio_stats.io_service_bytes_recursive)
            diskItem.blkio_stats.io_service_bytes_recursive.forEach(function(diskIOItem, index, arr) {
                if ((diskIOItem.major == 253) && (diskIOItem.op == "Read") && (diskIOItem.minor > 0)) {
                    console.log("Found Read on " + diskItem.Names + " disk " + diskIOItem.major + " " + diskIOItem.minor + " with " + diskIOItem.op + " operations at " + diskIOItem.value);

                    var keyname = diskItem.lxc_id
                    containerToDiskIORead[keyname] = {key: diskItem.lxc_id, name: diskItem.Names, read: diskIOItem.value }
                    return;
                } else if ((diskIOItem.major == 253) && (diskIOItem.op == "Write") && (diskIOItem.minor > 0)) {
                     console.log("Found Write on " + diskItem.Names + " disk " + diskIOItem.major + " " + diskIOItem.minor + " with " + diskIOItem.op + " operations at " + diskIOItem.value);

                    var keyname = diskItem.lxc_id
                    containerToDiskIOWrite[keyname] = {key: diskItem.lxc_id, name: diskItem.Names, write: diskIOItem.value }
                    return;   
                  } else if ((diskIOItem.major == 253) && (diskIOItem.op == "Total") && (diskIOItem.minor > 0)) {
                     console.log("Found Total on " + diskItem.Names + " disk " + diskIOItem.major + " " + diskIOItem.minor + " with " + diskIOItem.op + " operations at " + diskIOItem.value);

                    var keyname = diskItem.lxc_id
                    containerToDiskIOTotal[keyname] = {key: diskItem.lxc_id, name: diskItem.Names, total: diskIOItem.value }
                    return;   
                }

            });
        });
        console.log("containerToDiskIOTotal Total")
        console.log(containerToDiskIOTotal)
        console.log("containerToDiskIOTotal first element")
        console.log(containerToDiskIOTotal[0])
        console.log("containerToDiskIOTotal total")
        console.log(containerToDiskIOTotal.total)
        console.log("containerToDiskIO f2193d3beeb8da439485436c183a55dbb9382ed8125afaab7f6c781b8eefcff5Total")
        console.log(containerToDiskIOTotal["f2193d3beeb8da439485436c183a55dbb9382ed8125afaab7f6c781b8eefcff5Total"])
        
        var containerToDiskIOTotalitems = Object.keys(containerToDiskIOTotal).map(function(key) {
            return [key, containerToDiskIOTotal[key].total];
        });
        console.log("containerToDiskIOTotalitems")
        console.log(containerToDiskIOTotalitems)


        containerToDiskIOTotalitems.sort(function(first, second) {
            console.log("containerToDiskIOTotalitems second - ")
            console.log(second);
            console.log("containerToDiskIOTotalitems first")
            console.log(first)

            console.log("containerToDiskIOTotalitems second key ")
               console.log(second[0])
               console.log("containerToDiskIOTotalitems second value ")
               console.log(second[1])
               
            return second[1] - first[1];
        });
        console.log("containerToDiskIOTotalitems sorted")
        console.log(containerToDiskIOTotalitems)
        console.log("containerToDiskIOTotalitems top 5")
        var containerToDiskIOTotalitemsTop5=containerToDiskIOTotalitems.slice(0, 5)
        console.log(containerToDiskIOTotalitems.slice(0, 5));        
        console.log("containerToDiskIOTotalitems top 1")
        console.log(containerToDiskIOTotalitems[0])
        console.log("containerToDiskIOTotalitems top 1 id")
        console.log(containerToDiskIOTotalitems[0][0])
        console.log("containerToDiskIOTotalitems top 1 Read item")
console.log(containerToDiskIORead[containerToDiskIOTotalitems[0][0]])
console.log("containerToDiskIOTotalitems top 1 Read item value")
console.log(containerToDiskIORead[containerToDiskIOTotalitems[0][0]].read)
console.log("containerToDiskIOTotalitems top 1 write item value")
console.log(containerToDiskIOWrite[containerToDiskIOTotalitems[0][0]].write)
var diskIOTop5AllValues =[]
containerToDiskIOTotalitemsTop5.forEach(function(diskIOTop5, index, arr) {
    console.log("Disk IO Top 5 Item " + index + ": ")
    console.log(diskIOTop5)
    diskIOTop5AllValues[index] = {key: diskIOTop5[0], name: containerToDiskIOTotal[diskIOTop5[0]].name, read:containerToDiskIORead[diskIOTop5[0]].read, write: containerToDiskIOWrite[diskIOTop5[0]].write, total: containerToDiskIOTotal[diskIOTop5[0]].total }
    
});
        console.log("Disk IO Top 5 All Values")
console.log(diskIOTop5AllValues)
res.json(diskIOTop5AllValues);

    });




});





app.get('/api/container_stats/current/:lxc_id/cpu/by_minute', function(req, res) {
    containerStats.aggregate([
    { "$project": 
     {read: 1, lxc_id: 1, cpu_stats: 1}
     
    }, 
        {"$match": 
             {read: 
              {"$gte":  new Date(2016, 7, 20),"$lt":  new Date(2016, 7, 21)}},
        }   



    ], function(err, result) {
        if (err) {
            console.log(err);
            return;
        }
        console.log(result);

        
        
        console.log("first entry in query lxc cpu by minute")
        console.log(result[0])
        console.log("first entry in query lxc cpu by minute lxc_id")
        console.log(result[0].lxc_id)
        console.log("first entry in query lxc cpu by minute read")
        console.log(result[0].read)
        var queryDate=result[0].read
        var queryDateConverted=queryDate.toISOString().substring(0, 10)
        console.log("queryDate Full date")
        console.log(queryDateConverted)
        var queryDateMinute=queryDate.getMinutes()
        console.log("queryDate minute")
        console.log(queryDateMinute)
        var queryTotalUsage=result[0].cpu_stats.cpu_usage.total_usage
        console.log("logging query total usage")
        console.log(queryTotalUsage)
     
        
        var reformatResult = result.map(function(lxcCPUStatItem){
           var rlxcCPUStatItem = {};
            keyname = lxcCPUStatItem.read.toISOString()
rlxcCPUStatItem[keyname] = {key: lxcCPUStatItem.lxc_id , utlz: (lxcCPUStatItem.cpu_stats.cpu_usage.total_usage/lxcCPUStatItem.cpu_stats.system_cpu_usage) }
            return rlxcCPUStatItem;
                                        });
        
        console.log("logging reformatted results")
        console.log(reformatResult)
        res.json(reformatResult);
             var lxcCPUStatItemRefItem = {};
        var arrayOfDatesByMinute = []
        reformatResult.forEach(function(lxcCPUStatItemRef, index, arr) {
console.log("logging lxcCPUStatItemRef")
console.log(lxcCPUStatItemRef)
console.log("logging lxcCPUStatItemRef key")
console.log(Object.keys(lxcCPUStatItemRef))
console.log("logging parsed date")
var parsedDate= Object.keys(lxcCPUStatItemRef)[0]
console.log(parsedDate)
console.log("determining parsedDate type")
console.log(typeof parsedDate)
var d = Date.parse(parsedDate);
console.log("determining d type")   
console.log(typeof d)
var dDate = new Date (d);
console.log(dDate)

console.log("logging to minute parsed date")
console.log(new Date (dDate.toISOString().substring(0, 16)))


      
            var keyname = new Date (dDate.toISOString().substring(0, 16))
            arrayOfDatesByMinute.push(keyname)
            

});
            console.log("logging lxcCPUStatItemRefItem")
        console.log(lxcCPUStatItemRefItem)
           console.log("logging array of keys")
            console.log(arrayOfDatesByMinute)
            
            function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
}


var unique = arrayOfDatesByMinute.filter( onlyUnique );
        console.log("logging unique minute")
        console.log(unique)
        
    });

    //                             );
});


app.use('/api/container_stats/cpu/utilization/:from_date/:to_date', function(req, res) {
    console.log("someone hit /api/container_stats/cpu/utilization/:from_date/:to_date");
    
    console.log("logging start date range")
   console.log(req.params.from_date)
   console.log("logging end date range")
   console.log(req.params.to_date)
   var fromMoment = moment(req.params.from_date)
   var toMoment = moment(req.params.to_date)
   console.log("converting from_date param to moment object")
   console.log(fromMoment.format())
     console.log("converting to_date param to moment object")
   console.log(toMoment.format())
    
containerStats.aggregate([{
                "$project": {
                    read: 1,
                    lxc_id: 1,
                    utilization: {
                    $divide: ["$cpu_stats.cpu_usage.total_usage", "$cpu_stats.system_cpu_usage"]
                    },
                    cpu_stats: 1,
                    
                }

            }, {
                "$match": {
                    read:
                    {

                           "$gte": fromMoment.toDate(),
                            "$lt": toMoment.toDate()
                    }
                },
            },
{                   
    $group: {
                    _id: null,
                    count: {
                        $sum: 1
                    },
                    avgCpuUtilization: {
                        $avg: "$utilization"
                    }
                }
 }

 ], function(err, result) {
        if (err) {
            console.log("error detected")
            console.log(err);
            return;
        }
        console.log("no errors, logging results")
        console.log(result);
        res.json(result);
    console.log("troubleshooting date")
    console.log(new Date(2017, 7, 22))
    });
    
});




app.get('/api/container_stats/test', function(req, res) {
    containerStats.aggregate([
        //        { "$limit": 10000 },
        {
            "$project": {
                LXC_Id: 1,
                read: 1
            }
        },
        //        { $sort: {'lxc_id': 1, 'date': 1}},
        {
            $group: {
                '_id': "$LXC_Id",
                lastDate: {
                    $last: "$read"
                }
            }
        },
        //             {
        //   "$lookup":
        //     {
        //       from: 'container_stats',
        //       localField: '_id',
        //       foreignField: 'LXC_Id',
        //       as: 'current_stats'
        //     }
        //}
        //fail on host third entry{ $group: {'_id': "$lxc_id", 'host': "$dns_name", lastDate: { $last: "$ReadTime"} }}

        //        { $populate: {'lxc_id'} }


    ], function(err, result) {
        if (err) {
            console.log(err);
            return;
        }
        console.log(result);
        //FAIL        containerInfos.populate(result, {path: "lxc_id"}, err);
        res.json(result);
    });

});


app.get('/api/service_infos/', function(req, res) {
    serviceInfos.find(function(err, data) {
        res.json(data);
    });
});

app.get('/api/app_infos', function(req, res) {
    appInfos.find(function(err, data) {
        res.json(data);
    });
});


app.use('/api/container', function(req, res) {
    console.log("someone hit /api/container");
    console.log("user sent name: " + req.query.name + " to /api/container")

    console.log("logging request to /api/container ")
    console.log(req)
    request({
        method: 'GET',
        url: 'http://felicity.evolute.io',
        qs: {
            name: req.query.name,
            scale: req.query.scale,
            cpu: req.query.cpu,
            mem: req.query.mem,
            cmd: req.query.cmd,
            image: req.query.image
        }
    }, function(error, response, body) {
        if (error) {
            console.log("Made it to error")
            res.json(502, {
                error: "bad_gateway",
                reason: err.code
            });
            return;
        }
        if (!error && response.statusCode == 200) {
            res.send(body);
        } else {
            console.log("something else happened brother")
            console.log(response)
            console.log(body)
            res.send(body);
        }

    });

});



//app.get('/api/health/container/:lxc_id', function(req, res) {
//    console.log("someone hit /api/health/container");
//    console.log("health on container name: " + req.params.lxc_id + " to /api/health/container")
//
//    //    var lxc_id_norm = req.params.lxc_id.substring(0, 12);
//    console.log("container name to 12 characters: " + req.params.lxc_id);
//    //    console.log("logging request to /api/health/container ")
//    //            console.log(req)
//    request({
//        method: 'GET',
//        url: 'http://consul-api.evolute.io:8500/v1/health/node/' + req.params.lxc_id,
//        //     qs: {
//        //         name: req.query.name,
//        //         scale: req.query.scale,
//        //         cpu: req.query.cpu,
//        //         mem: req.query.mem,
//        //         cmd: req.query.cmd,
//        //         image: req.query.image
//        //     }
//    }, function(error, response, body) {
//        if (error) {
//            console.log("Made it to /api/health/container error")
//            res.json(502, {
//                error: "bad_gateway",
//                reason: err.code
//            });
//            return;
//        }
//        if (!error && response.statusCode == 200) {
//            //    console.log(body) // Show the HTML for the Google homepage.
//            console.log("logging response")
//                //            console.log(response)
//                //    res.json(data);
//            var parsedbody = JSON.parse(body);
//            console.log("parsing json of returned body")
//            console.log(parsedbody)
//            console.log("parsing json of returned body status")
//            console.log(parsedbody[0].Status)
//            res.send(body);
//            //            res.send(parsedbody[0].Status);
//        } else {
//            console.log("something else happened when querying /api/health/container brother")
//            console.log(response)
//            console.log(body)
//            res.send(body);
//        }
//
//    });
//
//});

//CLOSE
//app.use('/api/health/application/:app_id', function(req, res) {
//    console.log("someone hit /api/health/application/");
//    console.log("health on container name: " + req.params.app_id + " to /api/health/application/")
//
//    //    var lxc_id_norm = req.params.lxc_id.substring(0, 12);
//    //    console.log("container name to 12 characters: " + lxc_id_norm);
//    //    console.log("logging request to /api/health/container ")
//    //            console.log(req)
//    request({
//        method: 'GET',
//        url: 'http://consul-api.evolute.io:8500/v1/health/checks/' + req.params.app_id,
//        //     qs: {
//        //         name: req.query.name,
//        //         scale: req.query.scale,
//        //         cpu: req.query.cpu,
//        //         mem: req.query.mem,
//        //         cmd: req.query.cmd,
//        //         image: req.query.image
//        //     }
//    }, function(error, response, body) {
//        if (error) {
//            console.log("Made it to /api/health/application error")
//            res.json(502, {
//                error: "bad_gateway",
//                reason: err.code
//            });
//            return;
//        }
//        if (!error && response.statusCode == 200) {
//            //    console.log(body) // Show the HTML for the Google homepage.
//            console.log("logging response")
//                //            console.log(response)
//                //    res.json(data);
//                //            var parsedbody = JSON.parse(body);
//                //            console.log("parsing json of returned body")
//                //            console.log(parsedbody)
//                //            console.log("parsing json of returned body status")
//                //            console.log(parsedbody[0].Status)
//            res.send(body);
//            //            res.send(parsedbody[0].Status);
//        } else {
//            console.log("something else happened when querying /api/health/container brother")
//            console.log(response)
//            console.log(body)
//            res.send(body);
//        }
//
//    });
//
//});

//
//app.use('/api/application/:app_id/count', function(req, res) {
//    console.log("someone hit /api/application/:app_id/count");
//    
//    
//    var match = '/.*' + req.params.app_id + '.*/',
////    query={$project: {_id: 0,Names: 1,lxc_id: 1},"Names": match}
//    query={ $match:  {"Names": match} }
//   
//   console.log("logging query")
//   console.log(query)
//currentContainerStats.aggregate([query
////    {
////     $project: {
////            _id: 0,
////            Names: 1,
////            lxc_id: 1
////    }
////        },
//////    WORKS{ $match:  {"Names": /.*evo-cassandra-seed.*/}}
////    { $match:  {"Names": /.*(req.params.app_id).*/}}
////    
//////    {
//////        $match:
//////                {"Names": '/.*evo-cassandra-seed.*/'}
//////        {"Names": '/.*' + req.params.app_id + '.*/'}
////        
//////        {"Names": new RegExp('^'+req.params.app_id+'$', "i")}
//////    }
//    
// ], function(err, result) {
//        if (err) {
//            console.log("error detected")
//            console.log(err);
//            return;
//        }
//        console.log("no errors, logging results")
//        console.log(result);
////    console.log('/.*' + req.params.app_id + '.*/')
////    console.log(new RegExp('^'+req.params.app_id+'$', "i"))
//
//        res.json(result);
//    });
//    
//});



app.use('/api/application/:app_id/count', function(req, res) {
var querystring = `^${req.params.app_id}`
//var query = `$(/${querystring}.*/)`
var regEx = new RegExp(querystring);
var ContainerNames = [];
    var testarray = [];
     request({
        method: 'GET',
        url: 'http://127.0.0.1:3000/api/container_stats/current'
    }, function(error, response, body) {
        if (error) {
            console.log("Made it to /api/application/:app_id/count2 error")
            res.json(502, {
                error: "bad_gateway",
                reason: err.code
            });
            return;
        }
        if (!error && response.statusCode == 200) {

            var responseString = (JSON.stringify(response))

            var responseJSON = JSON.parse(responseString)

        var containers = responseJSON.body
        var containersJSON = JSON.parse(containers)

        
containersJSON.forEach(function(containerItem, index, arr) {

ContainerNames.push(containerItem.Names)
});
        
            
ContainerNames.forEach(function(containerNamesItem, index, arr) {

    var containerNamesItemElement = containerNamesItem[0]

    if (containerNamesItemElement.match(regEx)){
        testarray.push(containerNamesItemElement)
        
    }
    
    return testarray.length
        
});

console.log("loggin test array length")
console.log(testarray.length)
res.json(testarray.length) 

        } else {
            console.log("something else happened when querying /api/health/container brother")
            console.log(response)
            console.log(body)
            res.send(body);
        }

    });
   
    
    
});

app.get('/api/service_infos/apps', function(req, res) {
    
    serviceInfos.aggregate([
    
        {
            "$limit": 200
        }, 
        {
            "$project": {
                svcApplications: 1
            }
        }, {
            "$unwind": '$svcApplications'
        }, {
            "$lookup": {
                from: 'app_infos',
                localField: 'svcApplications',
                foreignField: '_id',
                as: 'app_info'
            }
        }, {
            "$group": {
                _id: '$_id',
                apps: {
                    "$push": '$app_info'
                }

            }
        }, {
            "$lookup": {
                from: 'service_infos',
                localField: '_id',
                foreignField: '_id',
                as: 'service_info'
            }
        },
 


    ], function(err, result) {
        if (err) {
            console.log(err);
            return;
        }
        console.log(result);

        res.json(result);
    });

});






app.use('/api/app_infos', function(req, res) {

    console.log("generating id: ")
    var newid = generate_id();
    console.log("logging new id: " + newid)

    res.setHeader('Content-Type', 'text/plain')
    res.write('you posted:\n')
    res.end(JSON.stringify(req.body, null, 2))
    console.log("Request body plain")
    console.log(req.body)
    console.log("Parsing received JSON")
    console.log(req.body.appName)


    var newApp = new appInfos({
        _id: newid,
        appName: req.body.appName,
        appStatus: req.body.appStatus,
        appHealth: req.body.appHealth,
        appUptime: req.body.appUptime
    });
    console.log(newApp.appName);
    newApp.save(function(err, newApp) {
        if (err) return console.error(err);
    });

})


var server = app.listen(3000);



var newid = generate_id();
var CVX_DataLake3 = new serviceInfos({
    _id: newid,
    svcName: 'CVX_DataLake3',
    svcStatus: 'Undeployed',
    svcOwner: 'Jason Bourne',
    svcHealth: 'Healthy',
    svcUptime: 'Not Applicable',
    svcApplications: [{
        _id: "57c5eec4a339f1dc3ffd08d0"
    }, {
        _id: "57c5eecba339f1dc3ffd08d1"
    }]
});

console.log(CVX_DataLake3);
//console.log("saving CVX_DataLake3")
//    CVX_DataLake3.save(function (err, newApp) {
//    if (err) return console.error(err);
//});





console.log("starting nested query")
var appids = []
serviceInfos.find().limit(50).exec(function(err, results) {
    console.log("inside nested query")

    var ids = results.map(function(el) {
        return el._id
    });
    console.log("found the following service ids: " + ids);
    var appids = results.map(function(el) {
            return el.svcApplications
        })
    console.log("found the following application ids " + appids)
     
    console.log("maintained variable appids: " + appids)
    appids.forEach(function(doc) {
        appInfos.find({
            "_id": {
                "$in": doc
            }
        }, function(err, items) {
            console.log("found the following applications: " + items)
        })

    })

})



console.log("Opening up connection to MongoDB")
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // we're connected!
});