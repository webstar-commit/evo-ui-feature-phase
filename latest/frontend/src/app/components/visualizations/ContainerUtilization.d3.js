import * as d3 from "d3";
console.log("ContainerUtilization.d3 started")
/**
 * Builds System Utilization Overview diagram
 * @param container
 * @param boundingClientRect
 * @param data
 */
function buildVisualization(container, boundingClientRect, data, options={}) {
//    console.log("logging container passed into build visualization")
//    console.log(container)
//    console.log("logging boundClientRect passed into build visualization")
//    console.log(boundingClientRect)
//    console.log("logging data passed into build visualization")
//    console.log(data)
  //container.html("");
  //var containerSize = container.node().getBoundingClientRect();
  var containerSize = boundingClientRect;

//  var height3 = 90;
//  var height1 = containerSize.height * 0.4, height2 = containerSize.height * 0.6 - height3;
//
//  var width2 = 150;
//  var width1 = containerSize.width - width2;
    // var options = { appId: "f2193d3beeb8da439485436c183a55dbb9382ed8125afaab7f6c781b8eefcff5" }
  const parseTime = d3.time.format("%Y-%m-%dT%H").parse;
  for (var lxcId in data) {
    var summary = data[lxcId].summary;
    var samples = []
    for (var timestamp in data[lxcId].samples) {
      samples.unshift({
        time: parseTime(timestamp),
        disk: data[lxcId].samples[timestamp].disk,
        network: data[lxcId].samples[timestamp].network
      })
    }
    samples.sort(function(a, b) {
      return a.t - b.t;
    })

    var rightTextWidth = 50, bottomTextHeight = 20;

    var svg = container.append("svg").attr("width", containerSize.width).attr("height", containerSize.height).style("background", "#fff");
//    console.log("logging containerSize height and width")
//    console.log(containerSize.height)
//    console.log(containerSize.width)
    var defs = svg.append("defs");

    var color1 = defs.append("linearGradient").attr("id", "color1b_1").attr("x1", "50%").attr("y1", "0%").attr("x2", "50%").attr("y2", "100%");
    color1.append("stop").attr("offset", "0%").attr("stop-color", "#47CBF2");
    color1.append("stop").attr("offset", "100%").attr("stop-color", "#70D6F6");

    var color2 = defs.append("linearGradient").attr("id", "color1b_2").attr("x1", "50%").attr("y1", "0%").attr("x2", "50%").attr("y2", "100%");
    color2.append("stop").attr("offset", "0%").attr("stop-color", "#FF6045");
    color2.append("stop").attr("offset", "100%").attr("stop-color", "#FFA075");

    svg.append("text").attr("class", "title").text("C: " + Math.round(summary.cpu * 100) / 100 + "%")
        .attr("x", (containerSize.width - rightTextWidth) * 0.6 * 0.25).attr("y", containerSize.height - bottomTextHeight + 15).attr("text-anchor", "middle");
    svg.append("text").attr("class", "title").text("M: " + Math.round(summary.memory * 100) / 100 + "%")
        .attr("x", (containerSize.width - rightTextWidth) * 0.6 * 0.75).attr("y", containerSize.height - bottomTextHeight + 15).attr("text-anchor", "middle");

    var rectLimit = containerSize.height - bottomTextHeight - 2 - 10;

    svg.append("rect").attr("fill", "url(#color1b_1)")
        .attr("width", 10).attr("height", rectLimit * (summary.cpu / 100) + 2)
        .attr("x", (containerSize.width - rightTextWidth) * 0.6 * 0.25 - 5).attr("y", rectLimit * (1 - summary.cpu / 100) + 10);

    svg.append("rect").attr("fill", "url(#color1b_2)")
        .attr("width", 10).attr("height", rectLimit * (summary.memory / 100) + 2)
        .attr("x", (containerSize.width - rightTextWidth) * 0.6 * 0.75 - 5).attr("y", rectLimit * (1 - summary.memory / 100) + 10);

    var x = d3.time.scale().range([0, (containerSize.width - rightTextWidth) * 0.3]);
    var y1 = d3.scale.linear().range([containerSize.height * 0.2, 0]),
        y2 = d3.scale.linear().range([containerSize.height * 0.2, 0]);

    x.domain(d3.extent(samples, function (d) { return d.time; }));
    y1.domain(d3.extent(samples, function (d) { return d.network; }));
    y2.domain(d3.extent(samples, function (d) { return d.disk; }));

    var line1 = d3.svg.line().x(function (d) { return x(d.time); }).y(function (d) { return y1(d.network); });
    var line2 = d3.svg.line().x(function (d) { return x(d.time); }).y(function (d) { return y2(d.disk); });

    var svg1 = svg.append("g").attr("transform", "translate(" + (containerSize.width - rightTextWidth) * 0.65 + "," + containerSize.height * 0.15 + ")");
    var svg2 = svg.append("g").attr("transform", "translate(" + (containerSize.width - rightTextWidth) * 0.65 + "," + containerSize.height * 0.65 + ")");

    svg1.append("path").datum(samples).attr("class", "line").style("stroke", "#18BEEF").attr("d", line1);
    svg2.append("path").datum(samples).attr("class", "line").style("stroke", "#7C81A8").attr("d", line2).style("fill","none");

    svg.append("text").attr("class", "title").text("N: " + Math.round(summary.network * 100) / 100 + "%").attr("x", (containerSize.width - rightTextWidth)).attr("y", containerSize.height * 0.4);
    svg.append("text").attr("class", "title").text("D: " + Math.round(summary.disk)).attr("x", (containerSize.width - rightTextWidth)).attr("y", containerSize.height * 0.75);
  }
}

export default buildVisualization;
