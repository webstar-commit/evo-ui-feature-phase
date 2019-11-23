var pScale = d3.scaleLinear().domain([0, 100]).range([0, Math.PI * 2]);
var rScale = d3.scaleLinear().domain([0, 100]).range([0, Math.PI]);

//var canvas = d3.select("#cpu").selectAll('.right').append("svg")
//.attr("width", 30)
//.attr("height", 30);
var canvas = d3.select("#svg").append("svg")
  .attr("width", 40)
  .attr("height", 40);

var group = canvas.append("g")
  .attr("transform", "translate(20,20)");

var r = (10 * pScale(30));
var p = Math.PI * 2;


var arc = d3.arc()
  .innerRadius(r - (rScale(15) * 10))
  .outerRadius(r)
  .startAngle(0)
  .endAngle(pScale(20))

var arc2 = d3.arc()
  .innerRadius(r - (rScale(5) * 10))
  .outerRadius(r - (rScale(8) * 10))
  .startAngle(0)
  .endAngle(p)

group.append("path")
  .attr("d", arc2)
  .attr("fill", "#CBD7DD");

group.append("path")
  .attr("d", arc)
  .attr("fill", "#4FB1E2")
  .style("opacity", 0.800000012);

data = [40]
var data2 = [];

d3.json("http://localhost:3000/api/container_stats/current/top5/cpu", function (error, data) {
  console.log("executing dataviz function");
  console.log(dataViz(data));
});

function dataViz(incomingData) {
//    var nestedstats = d3.nest()
//    .key(function (el) {return el.Names;})
//    .entries(incomingData)
//    
  console.log("logging incomingData")
  console.log(incomingData)
  console.log("logging nestedstats")
  console.log("first element in incomingData")
  console.log(incomingData[0])
  console.log("second element in incomingData")
  console.log(incomingData[1])
//    return nestedstats;
//    data2.push= incomingData
}
console.log("data2")
console.log(data2)

//console.log("logging json data from http://localhost:3000/api/container_stats/current/top5/cpu")
//console.log(data2)
//console.log("getting first object")
//console.log(data2)

var text = group.selectAll("text")
  .data(data)
  .enter()
  .append("text");

var textLabels = text
  .attr("x", -6)
  .attr("y", 4)
  .text(function (d) {
    {
      return d
    }
    ;
  })
  .attr("font-family", "San Francisco")
  .attr("font-size", "10.47494996")
  .attr("fill", "#4D4E57")
  .attr("font-weight", "regular")
  .attr("letter-spacing", "1.40971704")


var pScale = d3.scaleLinear().domain([0, 100]).range([0, Math.PI * 2]);
var rScale = d3.scaleLinear().domain([0, 100]).range([0, Math.PI]);

//var canvas = d3.select("#svg").append("svg")
//.attr("width", 50)
//.attr("height", 50);

//var group = canvas.append("g")
//.attr("transform", "translate(30,30)");

var r = (10 * pScale(30));
var p = Math.PI * 2;


//var arc = d3.arc()
//.innerRadius(r - (rScale(15)*10))
//.outerRadius(r)
//.startAngle(0)
//.endAngle(pScale(80))
//
//var arc2 = d3.arc()
//.innerRadius(r - (rScale(5)*10))
//.outerRadius(r - (rScale(8)*10) )
//.startAngle(0)
//.endAngle(p)
//
//group.append("path")
//.attr("d", arc2)
//.attr("fill", "#CBD7DD");
//
//group.append("path")
//.attr("d", arc)
//.attr("fill", "#4FB1E2")
//.style("opacity", 0.800000012);
//
//data = [80]
//var text = group.selectAll("text")
//.data(data)
//.enter()
//.append("text");
//
//var textLabels = text
//    .attr("x", -6)
//    .attr("y", 4)
//    .text(function (d) {
//        {return d};
//    })
//    .attr("font-family", ".SFNSText-Regular, .SF NS Text")
//    .attr("font-size", "10.47494996")
//    .attr("fill", "#4D4E57")
//.attr("font-weight", "normal")
//.attr("letter-spacing","1.40971704")


//    d3.select("#save").on("click", function(){
//  var html = d3.select("svg")
//        .attr("version", 1.1)
//        .attr("xmlns", "http://www.w3.org/2000/svg")
//        .node().parentNode.innerHTML;
//
//  console.log(html);
//  var imgsrc = 'data:image/svg+xml;base64,'+ btoa(html);
//  var img = '<img src="'+imgsrc+'">'; 
//  d3.select("#svgdataurl").html(img);
//
//});
//SHOULDWORK
var html = d3.select("svg")
  .attr("version", 1.1)
  .attr("xmlns", "http://www.w3.org/2000/svg")
  .node().parentNode.innerHTML;

console.log(html);
var imgsrc = 'data:image/svg+xml;base64,' + btoa(html);
console.log(imgsrc);
var img = '<img height="32" width="32" src="' + imgsrc + '">';
d3.select("#svgdataurl").html(img);
d3.select("#cpu").selectAll('.right').html(img)
d3.select("#svg").remove()
d3.select("#svgdataurl").remove()
