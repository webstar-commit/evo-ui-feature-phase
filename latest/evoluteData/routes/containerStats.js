const ContainerStat = require('../models/ContainerStat');
const CurrentContainerStat = require('../models/CurrentContainerStat');

function initialize(app) {
  app.get('/api/container_stats/test', (req, res) => {
    ContainerStat.aggregate([
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
      }
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


    ], function (err, result) {
      if (err) {
        console.log(err);
        return;
      }
      console.log(result);
      //FAIL        containerInfos.populate(result, {path: "lxc_id"}, err);
      res.json(result);
    });
  });


  app.get('/api/container_stats', function (req, res) {
    ContainerStat.findOne(function (err, data) {
      res.json(data);
    });
  });

  app.get('/api/container_stats/current', function (req, res) {
    console.log("someone hit /api/container_stats/current")
    CurrentContainerStat.find(function (err, data) {

      console.log("query executed to mongodb for all current container stats")
      res.json(data);
    })

  });

  app.get('/api/container_stats/current/top5/cpu', function (req, res) {
    CurrentContainerStat.aggregate({
      $project: {
        _id: 0,
        "container.name": 1,
        ratio: {
          $divide: ["$cpu_stats.cpu_usage.total_usage", "$cpu_stats.system_cpu_usage"]
        }
      }
    }, {
      $project: {
        "container.name": 1,
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
    }, function (err, data) {
      res.json(data);

    });

  });

    
      app.get('/api/container_stats/current/top5/network', function (req, res) {
    CurrentContainerStat.aggregate({
      $project: {
        _id: 0,
        "container.name": 1,
          total: {
          $sum: ["$networks.cali0.rx_bytes", "$networks.cali0.tx_bytes"]
        },
          "networks.cali0.rx_bytes":1,
          "networks.cali0.tx_bytes":1
        
      }
    }, {
      $project: {
        "container.name": 1,
          "networks.cali0.rx_bytes":1,
          "networks.cali0.tx_bytes":1
      }
    }, {
      $sort: {
        total: -1
      }
    }, {
      $limit: 5
    }, function (err, data) {
      res.json(data);

    });

  });
    
  app.get('/api/container_stats/current/top5/memory', function (req, res) {
    CurrentContainerStat.aggregate({
      $project: {
        _id: 0,
        "container.name": 1,
        ratio: {
          $divide: ["$memory_stats.usage", "$memory_stats.limit"]
        }
      }
    }, {
      $project: {
        "container.name": 1,
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
    }, function (err, data) {
      res.json(data);

    });

  });


  app.get('/api/container_stats/current/top5/disk', function (req, res) {
    CurrentContainerStat.aggregate([
      {
        "$project": {
          lxc_id: 1,
          "container.name": 1,
          blkio_stats: 1
        }
      }
    ], function (err, result) {
      if (err) {
        console.log(err);
        return;
      }
      console.log("Logging current container stats data");
      console.log(result);
      console.log("parsing data on /api/container_stats/current/top5/disk ");

      var resultString = (JSON.stringify(result));
      console.log(resultString);
      var resultJSON = JSON.parse(resultString);
      console.log(resultJSON);
      var containerToDiskIOTotal = [];
      var containerToDiskIORead = [];
      var containerToDiskIOWrite = [];

      resultJSON.forEach(function (diskItem, index, arr) {
        console.log("logging disk item");
        console.log(diskItem);
        console.log("disk item blkio_stats");
        console.log(diskItem.blkio_stats);
        console.log("disk item blkio_stats io_service_bytes_recursive");
        console.log(diskItem.blkio_stats.io_service_bytes_recursive);
        diskItem.blkio_stats.io_service_bytes_recursive.forEach(function (diskIOItem, index, arr) {
          if ((diskIOItem.major == 253) && (diskIOItem.op == "Read") && (diskIOItem.minor > 0)) {
            console.log("Found Read on " + diskItem.container.name + " disk " + diskIOItem.major + " " + diskIOItem.minor + " with " + diskIOItem.op + " operations at " + diskIOItem.value);

            var keyname = diskItem.lxc_id
            containerToDiskIORead[keyname] = {key: diskItem.lxc_id, name: diskItem.container.name, read: diskIOItem.value};
            return;
          } else if ((diskIOItem.major == 253) && (diskIOItem.op == "Write") && (diskIOItem.minor > 0)) {
            console.log("Found Write on " + diskItem.container.name + " disk " + diskIOItem.major + " " + diskIOItem.minor + " with " + diskIOItem.op + " operations at " + diskIOItem.value);

            var keyname = diskItem.lxc_id;
            containerToDiskIOWrite[keyname] = {key: diskItem.lxc_id, name: diskItem.container.name, write: diskIOItem.value};
            return;
          } else if ((diskIOItem.major == 253) && (diskIOItem.op == "Total") && (diskIOItem.minor > 0)) {
            console.log("Found Total on " + diskItem.container.name + " disk " + diskIOItem.major + " " + diskIOItem.minor + " with " + diskIOItem.op + " operations at " + diskIOItem.value);

            var keyname = diskItem.lxc_id;
            containerToDiskIOTotal[keyname] = {key: diskItem.lxc_id, name: diskItem.container.name, total: diskIOItem.value};
            return;
          }

        });
      });
      console.log("containerToDiskIOTotal Total");
      console.log(containerToDiskIOTotal);
      console.log("containerToDiskIOTotal first element");
      console.log(containerToDiskIOTotal[0]);
      console.log("containerToDiskIOTotal total");
      console.log(containerToDiskIOTotal.total);
      console.log("containerToDiskIO f2193d3beeb8da439485436c183a55dbb9382ed8125afaab7f6c781b8eefcff5Total");
      console.log(containerToDiskIOTotal["f2193d3beeb8da439485436c183a55dbb9382ed8125afaab7f6c781b8eefcff5Total"]);

      var containerToDiskIOTotalitems = Object.keys(containerToDiskIOTotal).map(function (key) {
        return [key, containerToDiskIOTotal[key].total];
      });
      console.log("containerToDiskIOTotalitems");
      console.log(containerToDiskIOTotalitems);


      containerToDiskIOTotalitems.sort(function (first, second) {
        console.log("containerToDiskIOTotalitems second - ");
        console.log(second);
        console.log("containerToDiskIOTotalitems first");
        console.log(first);

        console.log("containerToDiskIOTotalitems second key ");
        console.log(second[0]);
        console.log("containerToDiskIOTotalitems second value ");
        console.log(second[1]);

        return second[1] - first[1];
      });
      console.log("containerToDiskIOTotalitems sorted");
      console.log(containerToDiskIOTotalitems);
      console.log("containerToDiskIOTotalitems top 5");
      var containerToDiskIOTotalitemsTop5 = containerToDiskIOTotalitems.slice(0, 5);
      console.log(containerToDiskIOTotalitems.slice(0, 5));
      console.log("containerToDiskIOTotalitems top 1");
      console.log(containerToDiskIOTotalitems[0]);
      console.log("containerToDiskIOTotalitems top 1 id");
      console.log(containerToDiskIOTotalitems[0][0]);
      console.log("containerToDiskIOTotalitems top 1 Read item");
      console.log(containerToDiskIORead[containerToDiskIOTotalitems[0][0]]);
      console.log("containerToDiskIOTotalitems top 1 Read item value");
      console.log(containerToDiskIORead[containerToDiskIOTotalitems[0][0]].read);
      console.log("containerToDiskIOTotalitems top 1 write item value");
      console.log(containerToDiskIOWrite[containerToDiskIOTotalitems[0][0]].write);
      var diskIOTop5AllValues = [];
      containerToDiskIOTotalitemsTop5.forEach(function (diskIOTop5, index, arr) {
        console.log("Disk IO Top 5 Item " + index + ": ");
        console.log(diskIOTop5);
        diskIOTop5AllValues[index] = {
          key: diskIOTop5[0],
          name: containerToDiskIOTotal[diskIOTop5[0]].name,
          read: containerToDiskIORead[diskIOTop5[0]].read,
          write: containerToDiskIOWrite[diskIOTop5[0]].write,
          total: containerToDiskIOTotal[diskIOTop5[0]].total
        }

      });
      console.log("Disk IO Top 5 All Values");
      console.log(diskIOTop5AllValues);
      res.json(diskIOTop5AllValues);

    });

  });

  console.log('Container Stats API initialized.');
}

module.exports = {
  initialize
};


