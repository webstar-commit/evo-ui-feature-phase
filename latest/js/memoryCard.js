data = [10, 40, 60, 80, 100];
applications = ["hadoop-nn", "hadoop-dn", "cassandra-seed", "cassandra-peer", "nginx-proxy"]
console.log(data)
console.log(applications)


d3.json("http://localhost:3000/api/container_stats/current/top5/cpu", function (error, data) {
  console.log("executing dataviz function");
  dataVizMem(data)
});

function dataVizMem(incomingData) {

  console.log("first element in incomingDataMem's Name")
  console.log(incomingData[0].Names)
  console.log("second element in incomingDataMem's Name")
  console.log(incomingData[1].Names)
  console.log("third element in incomingDataMem's Name")
  console.log(incomingData[2].Names)
  console.log("fourth element in incomingDataMem's Name")
  console.log(incomingData[3].Names)
  console.log("fifth element in incomingDataMem's Name")
  console.log(incomingData[4].Names)


  d3.select('#memory')
    .selectAll('.purple')
    .data(incomingData)
    .style("width", function (d) {
      return d.percent.toString() + "%";
    })


  d3.select('#memory')
    .selectAll('.appName')
    .data(incomingData)
    .text(function (d) {
      console.log("Logging d");
      console.log(d);
      return d.Names;
    })

  d3.select('#memory')
    .selectAll('.right h4')
    .data(incomingData)
    .text(function (d) {
      return Math.ceil(d.percent).toString() + "%";
    })

//
//    
//d3.select("#cpu").select('.left1 h4').html(incomingData[0].Names.toString().substring(0,16))
//
//var canvas = d3.select("#cpu").select(".right1").append("svg")
//.attr("width", 40)
//.attr("height", 40);
//
//    var group = canvas.append("g")
//    .attr("transform", "translate(20,20)");
//
//        var arcInner = d3.arc()
//        .innerRadius(r - (rScale(15)*10))
//        .outerRadius(r)
//        .startAngle(0)
//        .endAngle(pScale(Math.ceil(incomingData[0].percent)))
//
//        var arcOuter = d3.arc()
//        .innerRadius(r - (rScale(5)*10))
//        .outerRadius(r - (rScale(8)*10) )
//        .startAngle(0)
//        .endAngle(p)
//
//        group.append("path")
//        .attr("d", arcOuter)
//        .attr("fill", "#CBD7DD");
//
//        group.append("path")
//        .attr("d", arcInner)
//        .attr("fill", "#4FB1E2")
//        .style("opacity", 0.800000012);
//
//        var text = group.selectAll("text")
//        .data([Math.ceil(incomingData[0].percent)])
//        .enter()
//        .append("text");
//
//        var textLabels = text
//            .attr("x", -6)
//            .attr("y", 4)
//            .text(function (d) {
//                {return d + "%"};
//            })
//            .attr("font-family", "San Francisco")
//            .attr("font-size", "10.47494996")
//            .attr("fill", "#4D4E57")
//        .attr("font-weight", "regular")
//        .attr("letter-spacing","1.40971704")
//
//
//
//d3.select("#cpu").select('.left2 h4').html(incomingData[1].Names.toString().substring(0,16))
//var canvas2 = d3.select("#cpu").select(".right2").append("svg")
//.attr("width", 40)
//.attr("height", 40);
//
//    var group2 = canvas2.append("g")
//    .attr("transform", "translate(20,20)");
//
//        var arcInner2 = d3.arc()
//        .innerRadius(r - (rScale(15)*10))
//        .outerRadius(r)
//        .startAngle(0)
//        .endAngle(pScale(Math.ceil(incomingData[1].percent)))
//
//        var arcOuter2 = d3.arc()
//        .innerRadius(r - (rScale(5)*10))
//        .outerRadius(r - (rScale(8)*10) )
//        .startAngle(0)
//        .endAngle(p)
//
//        group2.append("path")
//        .attr("d", arcOuter2)
//        .attr("fill", "#CBD7DD");
//
//        group2.append("path")
//        .attr("d", arcInner2)
//        .attr("fill", "#4FB1E2")
//        .style("opacity", 0.800000012);
//
//        var text2 = group2.selectAll("text")
//        .data([Math.ceil(incomingData[1].percent)])
//        .enter()
//        .append("text");
//
//        var textLabels2 = text2
//            .attr("x", -6)
//            .attr("y", 4)
//            .text(function (d) {
//                {return d + "%"};
//            })
//            .attr("font-family", "San Francisco")
//            .attr("font-size", "10.47494996")
//            .attr("fill", "#4D4E57")
//        .attr("font-weight", "regular")
//        .attr("letter-spacing","1.40971704")
//        
//        
//d3.select("#cpu").select('.left3 h4').html(incomingData[2].Names.toString().substring(0,16))        
//var canvas3 = d3.select("#cpu").select(".right3").append("svg")
//.attr("width", 40)
//.attr("height", 40);
//
//    var group3 = canvas3.append("g")
//    .attr("transform", "translate(20,20)");
//
//        var arcInner3 = d3.arc()
//        .innerRadius(r - (rScale(15)*10))
//        .outerRadius(r)
//        .startAngle(0)
//        .endAngle(pScale(Math.ceil(incomingData[2].percent)))
//
//        var arcOuter3 = d3.arc()
//        .innerRadius(r - (rScale(5)*10))
//        .outerRadius(r - (rScale(8)*10) )
//        .startAngle(0)
//        .endAngle(p)
//
//        group3.append("path")
//        .attr("d", arcOuter2)
//        .attr("fill", "#CBD7DD");
//
//        group3.append("path")
//        .attr("d", arcInner2)
//        .attr("fill", "#4FB1E2")
//        .style("opacity", 0.800000012);
//
//        var text3 = group3.selectAll("text")
//        .data([Math.ceil(incomingData[2].percent)])
//        .enter()
//        .append("text");
//
//        var textLabels3 = text3
//            .attr("x", -6)
//            .attr("y", 4)
//            .text(function (d) {
//                {return d + "%"};
//            })
//            .attr("font-family", "San Francisco")
//            .attr("font-size", "10.47494996")
//            .attr("fill", "#4D4E57")
//        .attr("font-weight", "regular")
//        .attr("letter-spacing","1.40971704")
//        
//        
//        
//        
//d3.select("#cpu").select('.left4 h4').html(incomingData[3].Names.toString().substring(0,16))
//var canvas4 = d3.select("#cpu").select(".right4").append("svg")
//.attr("width", 40)
//.attr("height", 40);
//
//    var group4 = canvas4.append("g")
//    .attr("transform", "translate(20,20)");
//
//        var arcInner4 = d3.arc()
//        .innerRadius(r - (rScale(15)*10))
//        .outerRadius(r)
//        .startAngle(0)
//        .endAngle(pScale(Math.ceil(incomingData[3].percent)))
//
//        var arcOuter4 = d3.arc()
//        .innerRadius(r - (rScale(5)*10))
//        .outerRadius(r - (rScale(8)*10) )
//        .startAngle(0)
//        .endAngle(p)
//
//        group4.append("path")
//        .attr("d", arcOuter2)
//        .attr("fill", "#CBD7DD");
//
//        group4.append("path")
//        .attr("d", arcInner2)
//        .attr("fill", "#4FB1E2")
//        .style("opacity", 0.800000012);
//
//        var text4 = group4.selectAll("text")
//        .data([Math.ceil(incomingData[3].percent)])
//        .enter()
//        .append("text");
//
//        var textLabels4 = text4
//            .attr("x", -6)
//            .attr("y", 4)
//            .text(function (d) {
//                {return d + "%"};
//            })
//            .attr("font-family", "San Francisco")
//            .attr("font-size", "10.47494996")
//            .attr("fill", "#4D4E57")
//        .attr("font-weight", "regular")
//        .attr("letter-spacing","1.40971704")
//   
//    
//d3.select("#cpu").select('.left5 h4').html(incomingData[4].Names.toString().substring(0,16))        
//var canvas5 = d3.select("#cpu").select(".right5").append("svg")
//.attr("width", 40)
//.attr("height", 40);
//
//    var group5 = canvas5.append("g")
//    .attr("transform", "translate(20,20)");
//
//        var arcInner5 = d3.arc()
//        .innerRadius(r - (rScale(15)*10))
//        .outerRadius(r)
//        .startAngle(0)
//        .endAngle(pScale(Math.ceil(incomingData[4].percent)))
//
//        var arcOuter5 = d3.arc()
//        .innerRadius(r - (rScale(5)*10))
//        .outerRadius(r - (rScale(8)*10) )
//        .startAngle(0)
//        .endAngle(p)
//
//        group5.append("path")
//        .attr("d", arcOuter2)
//        .attr("fill", "#CBD7DD");
//
//        group5.append("path")
//        .attr("d", arcInner2)
//        .attr("fill", "#4FB1E2")
//        .style("opacity", 0.800000012);
//
//        var text5 = group5.selectAll("text")
//        .data([Math.ceil(incomingData[4].percent)])
//        .enter()
//        .append("text");
//
//        var textLabels5 = text5
//            .attr("x", -6)
//            .attr("y", 4)
//            .text(function (d) {
//                {return d + "%"};
//            })
//            .attr("font-family", "San Francisco")
//            .attr("font-size", "10.47494996")
//            .attr("fill", "#4D4E57")
//        .attr("font-weight", "regular")
//        .attr("letter-spacing","1.40971704")
//   
//    d3.select("#svgdataurl").remove()
//    

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
