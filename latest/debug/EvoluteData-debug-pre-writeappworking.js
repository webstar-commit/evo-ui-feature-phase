var express = require('express');
var bodyParser = require('body-parser')
var app = express();
var mongoose = require('mongoose');


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//mongoose.connect('mongodb://evo54.evolute.io:27017/docker');
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
        io_service_bytes_recursive: [
            {
                major: Number,
                minor: Number,
                op: String,
                value: Number
                        }
                ],
        io_serviced_recursive: [
            {
                major: Number,
                minor: Number,
                op: String,
                value: Number
                        }
                ],
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
    svcApplications: {
        type: Array,
        "application": []
    },
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


//    {key: 1, name: "CVX_DataLake", status: "Undeployed", owner:"Jason Bourne", health: "Not Applicable", uptime: "Not Applicable", applications:[
//        {key: 1, name: "cassandra-seed", status: "Undeployed",  health: "Not Applicable", uptime: "Not Applicable"}, 
//        {key: 2, name: "cassandra-peer", status: "Deployed", health: "Healthy", uptime: "12 hours 2 Min"},
//        {key: 3, name: "hadoop-dn", status: "Undeployed", health: "Not Applicable", uptime: "Not Applicable"},
//        {key: 4, name: "hadoop-nn", status: "Deployed", health: "Healthy", uptime: "12 hours 2 Min"} 
//        ]
//    },


var containerInfos = mongoose.model('container_infos', info_schema);
var containerStats = mongoose.model('container_stats', stats_schema);
var serviceInfos = mongoose.model('service_infos', services_schema);
var appInfos = mongoose.model('app_infos', apps_schema);

//DEBUGconsole.log(serviceInfos.base.models.service_infos);

//app.get('/api/container_stats', function (req, res) {
//    containerStats.find(function(err, data){
//        res.json(data);
//    });
//});

app.get('/api/container_infos', function (req, res) {
    containerInfos.findOne(function (err, data) {
        res.json(data);
    });
});

app.get('/api/service_infos', function (req, res) {
    serviceInfos.find(function (err, data) {
        res.json(data);
    });
});

app.get('/api/app_infos', function (req, res) {
    appInfos.find(function (err, data) {
        res.json(data);
//        console.log(data)
    });
});

app.use('/api/app_infos', function (req, res) {
  res.setHeader('Content-Type', 'text/plain')
  res.write('you posted:\n')
  res.end(JSON.stringify(req.body, null, 2))
  console.log("Request body plain")
  console.log(req.body)
  console.log("Parsing received JSON")
  console.log(req.body.appName)
  
  
  var newApp = new appInfos({
    _id: id,
    appName: req.body.appName,
    appStatus: req.body.appStatus,
    appHealth: req.body.appHealth,
    appUptime: req.body.appUptime
});
    console.log(newApp.appName); 
    newApp.save(function (err, newApp) {
    if (err) return console.error(err);
});

})

//app.post('/api/app_infos', function (req, res) {
// //   id = mongoose.Types.ObjectId(),
//    
//    
////CVX_DataLake.save(function (err, CVX_DataLake) {
////    if (err) return console.error(err);
////});
//    console.log("API app_infos POST received")
//    console.log(req.body);      // your JSON
//    
////    console.log(req)
////    console.log(res)
//    res.end()
//   });

//console.log(containerInfos)
var server = app.listen(3000);

var id = mongoose.Types.ObjectId();
var cassandra_peer = new appInfos({
    _id: id,
    appName: 'cassandra-peer',
    appStatus: 'Deployed',
    appHealth: 'Healthy',
    appUptime: '12 hours 2 Min'
});

var CVX_DataLake = new serviceInfos({
    _id: id,
    svcName: 'CVX_DataLake',
    svcStatus: 'Undeployed',
    svcOwner: 'Jason Bourne',
    svcHealth: 'Healthy',
    svcUptime: 'Not Applicable',
    svcApplications: [
        {
            key: 1,
            name: "cassandra-seed",
            status: "Undeployed",
            health: "Not Applicable",
            uptime: "Not Applicable"
        },
        {
            key: 2,
            name: "cassandra-peer",
            status: "Deployed",
            health: "Healthy",
            uptime: "12 hours 2 Min"
        },
        {
            key: 3,
            name: "hadoop-dn",
            status: "Undeployed",
            health: "Not Applicable",
            uptime: "Not Applicable"
        },
        {
            key: 4,
            name: "hadoop-nn",
            status: "Deployed",
            health: "Healthy",
            uptime: "12 hours 2 Min"
        }
        ]
});

console.log("Opening up connection to MongoDB")
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
});



//console.log(cassandra_peer.appName); 

//console.log(CVX_DataLake.svcName); 
////console.log(CVX_DataLake.svcApplications); // 'CVX_Datalake Applications'
//console.log(CVX_DataLake.svcOwner); // 'Jason Bourne'



//cassandra_peer.save(function (err, cassandra_peer) {
//CVX_DataLake.save(function (err, CVX_DataLake) {
//    if (err) return console.error(err);
//});


//let services = serviceInfos.find(function (err, service) {
//    if (err) return console.error(err);
//    console.log(service)
//})