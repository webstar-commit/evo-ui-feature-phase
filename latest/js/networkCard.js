//networkcard
data = [10, 40, 60, 80, 100];
applications = ["hadoop-nn", "hadoop-dn", "cassandra-seed", "cassandra-peer", "nginx-proxy"]
console.log(data)
console.log(applications)

function humanFileSize(bytes, si) {
  var thresh = si ? 1000 : 1024;
  if (Math.abs(bytes) < thresh) {
    return bytes + ' B';
  }
  var units = si
    ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
  var u = -1;
  do {
    bytes /= thresh;
    ++u;
  } while (Math.abs(bytes) >= thresh && u < units.length - 1);
  return bytes.toFixed(1) + ' ' + units[u];
}

d3.json("http://localhost:3000/api/container_stats/current/top5/disk", function (error, data) {
  console.log("executing dataviz function");
  dataVizDisk(data)
});

function dataVizDisk(incomingData) {

  console.log("first element in incomingDataDisk")
  console.log(incomingData)


//    d3.select('#disk')
//    .selectAll('.purple')
//    .data(incomingData)
//    .style("width", function(d) {return d.percent.toString()+"%";} )

//    
  d3.select('#disk')
    .selectAll('.left h4')
    .data(incomingData)
    .text(function (d) {
      console.log("Logging d");
      console.log(d);
      return "..." + d.name.toString().slice(-10);
    })
//d3.select("#cpu").select('.left1 h4').html(incomingData[0].Names.toString().substring(0,16))
  d3.select('#disk')
    .selectAll('.right h4')
    .data(incomingData)
    .text(function (d) {
      return humanFileSize(d.read, true).toString() + "/" + humanFileSize(d.write, true).toString();
    })

}


data.forEach(function (element) {
  // The asynchronous action simulator
  setTimeout(function () {
    console.log(element.toString() + "%");
  }, 100);
});

//works
//d3.select('#memory').data(data).selectAll('.purple')
//    .style("width", "90%")


//WORKS NO FUNCTIONd3.select('#disk')
//    .selectAll('.right h4')
//    .data(data)
//    .text(function(d) {return Math.ceil(d).toString()+"%";})
