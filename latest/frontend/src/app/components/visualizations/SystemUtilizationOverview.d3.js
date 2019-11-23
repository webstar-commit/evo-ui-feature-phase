import * as d3 from "d3";

/**
 * Builds System Utilization Overview diagram
 * @param container
 * @param boundingClientRect
 * @param data
 */
function buildVisualization(container, boundingClientRect, data) {
  //container.html("");
  //var containerSize = container.node().getBoundingClientRect();
  var containerSize = boundingClientRect;

  var height3 = 90;
  var height1 = containerSize.height * 0.4, height2 = containerSize.height * 0.6 - height3;

  var width2 = 150;
  var width1 = containerSize.width - width2;

  var colors = ["#00B8EE", "#FF7551", "#00B8EE", "#777CA4"];

  var svgRoot = container.append("svg").attr("width", containerSize.width).attr("height", containerSize.height);

  var defs = svgRoot.append("defs");

  var color1 = defs.append("linearGradient").attr("id", "color1a_1").attr("x1", "50%").attr("y1", "0%").attr("x2", "50%").attr("y2", "100%");
  color1.append("stop").attr("offset", "0%").attr("stop-color", "#47CBF2");
  color1.append("stop").attr("offset", "100%").attr("stop-color", "#70D6F6");

  var color2 = defs.append("linearGradient").attr("id", "color1a_2").attr("x1", "50%").attr("y1", "0%").attr("x2", "50%").attr("y2", "100%");
  color2.append("stop").attr("offset", "0%").attr("stop-color", "#FF6045");
  color2.append("stop").attr("offset", "100%").attr("stop-color", "#FFA075");

  svgRoot.append("line").attr("class", "line1").attr("x1", 0).attr("y1", height1).attr("x2", containerSize.width).attr("y2", height1);
  svgRoot.append("line").attr("class", "line1").attr("x1", width1).attr("y1", 0).attr("x2", width1).attr("y2", height1);
  svgRoot.append("line").attr("class", "line1").attr("x1", width1).attr("y1", height1 / 2).attr("x2", containerSize.width).attr("y2", height1 / 2);

  svgRoot.append("line").attr("class", "line1").attr("x1", 0).attr("y1", height1 + height2).attr("x2", containerSize.width).attr("y2", height1 + height2);
  svgRoot.append("line").attr("class", "line1").attr("x1", containerSize.width / 2).attr("y1", height1).attr("x2", containerSize.width / 2).attr("y2", containerSize.height);
  svgRoot.append("line").attr("class", "line1").attr("x1", containerSize.width * 0.25).attr("y1", height1 + height2).attr("x2", containerSize.width * 0.25).attr("y2", containerSize.height);
  svgRoot.append("line").attr("class", "line1").attr("x1", containerSize.width * 0.75).attr("y1", height1 + height2).attr("x2", containerSize.width * 0.75).attr("y2", containerSize.height);

  var svgInfo = svgRoot.append("g").attr("class", "info");

  svgInfo.append("text").attr("class", "title").attr("x", width1 + 20).attr("y", height1 * 0.20).text("CPU Utilization");
    svgInfo.append("text").attr("class", "value").attr("x", width1 + 35).attr("y", height1 * 0.35).text(data.summary.cpu);
  svgInfo.append("circle").attr("cx", width1 + 25).attr("cy", height1 * 0.35 - 8).attr("r", 5).attr("fill", colors[0])
    .on("click", function () {
      if (svg1.select(".bar1").style("opacity") == 0) {
        svg1.selectAll(".bar1").style("opacity", 1);
      } else {
        svg1.selectAll(".bar1").style("opacity", 0);
      }
    });

  svgInfo.append("text").attr("class", "title").attr("x", width1 + 20).attr("y", height1 * 0.70).text("Memory Utilization");
  svgInfo.append("text").attr("class", "value").attr("x", width1 + 35).attr("y", height1 * 0.85).text(data.summary.memory);
  svgInfo.append("circle").attr("cx", width1 + 25).attr("cy", height1 * 0.85 - 8).attr("r", 5).attr("fill", colors[1])
    .on("click", function () {
      if (svg1.select(".bar2").style("opacity") == 0) {
        svg1.selectAll(".bar2").style("opacity", 0.8);
      } else {
        svg1.selectAll(".bar2").style("opacity", 0);
      }
    });

  svgInfo.append("text").attr("class", "title").attr("x", 20).attr("y", height1 + 30).text("Network Utilization");
  svgInfo.append("text").attr("class", "title").attr("x", containerSize.width / 2 + 20).attr("y", height1 + 30).text("Disk Utilization");

  svgInfo.append("text").attr("class", "title").attr("x", 25).attr("y", height1 + height2 + 30).text("Read");
  svgInfo.append("text").attr("class", "value").attr("x", 40).attr("y", height1 + height2 + 60).text(data.summary.networkRx);
  svgInfo.append("circle").attr("cx", 30).attr("cy", height1 + height2 + 52).attr("r", 5).attr("fill", colors[2])
    .on("click", function () {
      var relatedArea = svg2.select(".area2R");
      if (relatedArea.style("opacity") == 0) {
        relatedArea.style("opacity", 0.8);
      } else {
        relatedArea.style("opacity", 0);
      }
    });

  svgInfo.append("text").attr("class", "title").attr("x", containerSize.width * 0.25 + 25).attr("y", height1 + height2 + 30).text("Write");
  svgInfo.append("text").attr("class", "value").attr("x", containerSize.width * 0.25 + 40).attr("y", height1 + height2 + 60).text(data.summary.networkTx);
  svgInfo.append("circle").attr("cx", containerSize.width * 0.25 + 30).attr("cy", height1 + height2 + 52).attr("r", 5).attr("fill", colors[3])
    .on("click", function () {
      var relatedArea = svg2.select(".area2W");
      if (relatedArea.style("opacity") == 0) {
        relatedArea.style("opacity", 0.8);
      } else {
        relatedArea.style("opacity", 0);
      }
    });

  svgInfo.append("text").attr("class", "title").attr("x", containerSize.width / 2 + 25).attr("y", height1 + height2 + 30).text("Read");
svgInfo.append("text").attr("class", "value").attr("x", containerSize.width / 2 + 40).attr("y", height1 + height2 + 60).text(data.summary.blkioRead);
  svgInfo.append("circle").attr("cx", containerSize.width / 2 + 30).attr("cy", height1 + height2 + 52).attr("r", 5).attr("fill", colors[2])
    .on("click", function () {
      var relatedArea = svg3.select(".area3R");
      if (relatedArea.style("opacity") == 0) {
        relatedArea.style("opacity", 0.8);
      } else {
        relatedArea.style("opacity", 0);
      }
    });

  svgInfo.append("text").attr("class", "title").attr("x", containerSize.width * 0.75 + 25).attr("y", height1 + height2 + 30).text("Write");
  svgInfo.append("text").attr("class", "value").attr("x", containerSize.width * 0.75 + 40).attr("y", height1 + height2 + 60).text(data.summary.blkioWrite);
  svgInfo.append("circle").attr("cx", containerSize.width * 0.75 + 30).attr("cy", height1 + height2 + 52).attr("r", 5).attr("fill", colors[3])
    .on("click", function () {
      var relatedArea = svg3.select(".area3W");
      if (relatedArea.style("opacity") == 0) {
        relatedArea.style("opacity", 0.8);
      } else {
        relatedArea.style("opacity", 0);
      }
    });

  var cmargin1 = {top: 10, right: 40, bottom: 40, left: 70},
    cwidth1 = width1 - cmargin1.left - cmargin1.right,
    cheight1 = height1 - cmargin1.top - cmargin1.bottom;

  var x1 = d3.time.scale().range([0, cwidth1]);
  var y1 = d3.scale.linear().range([cheight1, 0]);

  var xFormat = d3.time.format("%I %p");
  x1.tickFormat(xFormat);

  var xAxis1 = d3.svg.axis().scale(x1).orient("bottom");
  x1.domain(d3.extent(data.samples, function (d) {
    return d.time;
  }));
  y1.domain([0, 100]);

  var svg1 = svgRoot.append("g").attr("transform", "translate(" + cmargin1.left + "," + cmargin1.top + ")");

  svg1.selectAll(".bar1").data(data.samples).enter()
    .append("rect").attr("class", "bar1").attr("fill", "url(#color1a_1)").style("opacity", 1)
    .attr("x", function (d) {
      return x1(d.time) - 7;
    })
    .attr("y", function (d) {
      return y1(d.cpu);
    })
    .attr("width", 9)
    .attr("height", function (d) {
      return cheight1 - y1(d.cpu);
    });

  svg1.selectAll(".bar2").data(data.samples).enter()
    .append("rect").attr("class", "bar2").attr("fill", "url(#color1a_2)").attr("opacity", 0.8)
    .attr("x", function (d) {
      return x1(d.time) - 2;
    })
    .attr("y", function (d) {
      return y1(d.memory);
    })
    .attr("width", 9)
    .attr("height", function (d) {
      return cheight1 - y1(d.memory);
    });

  svg1.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + (cheight1 + 5) + ")")
    .call(xAxis1);

  for (var yTick = 25; yTick <= 100; yTick += 25) {
    var yTickPos = (yTick / 100 * cheight1);
    svg1.append("line").attr("class", "line2").attr("x1", -50).attr("y1", yTickPos).attr("x2", cwidth1 + 20).attr("y2", yTickPos);
    svg1.append("text").attr("class", "line-text").text((100 - yTick) + "%").attr("text-anchor", "end").attr("x", -15).attr("y", yTickPos + 4);
  }

  var cmargin2 = {top: 60, right: 20, bottom: 40, left: 60},
    cwidth2 = containerSize.width / 2 - cmargin2.left - cmargin2.right,
    cheight2 = height2 - cmargin2.top - cmargin2.bottom;

  var x2 = d3.time.scale().range([0, cwidth2]);
  var y2 = d3.scale.linear().range([cheight2, 0]), y3 = d3.scale.linear().range([cheight2, 0]);

  var area2R = d3.svg.area().interpolate("basis").x(function (d) {
    return x2(d.time);
  }).y0(cheight2).y1(function (d) {
    return y2(d.networkR);
  });
  var area2W = d3.svg.area().interpolate("basis").x(function (d) {
    return x2(d.time);
  }).y0(cheight2).y1(function (d) {
    return y2(d.networkW);
  });
  var area3R = d3.svg.area().interpolate("basis").x(function (d) {
    return x2(d.time);
  }).y0(cheight2).y1(function (d) {
    return y3(d.diskR);
  });
  var area3W = d3.svg.area().interpolate("basis").x(function (d) {
    return x2(d.time);
  }).y0(cheight2).y1(function (d) {
    return y3(d.diskW);
  });

  x2.tickFormat(xFormat);

  var xAxis2 = d3.svg.axis().scale(x2).orient("bottom").ticks(4);
  var yAxis2 = d3.svg.axis().scale(y2).orient("left").ticks(4).tickSize(-cwidth2).tickFormat(d3.format("s")),
    yAxis3 = d3.svg.axis().scale(y3).orient("left").ticks(4).tickSize(-cwidth2).tickFormat(d3.format("s"));

  x2.domain(d3.extent(data.samples, function (d) {
    return d.time;
  }));
  y2.domain([0, d3.max(data.samples, function (d) {
    return d.networkR > d.networkW ? d.networkR : d.networkW;
  })]);
  y3.domain([0, d3.max(data.samples, function (d) {
    return d.diskR > d.diskW ? d.diskR : d.diskW;
  })]);

  var svg2 = svgRoot.append("g").attr("transform", "translate(" + cmargin2.left + "," + (height1 + cmargin2.top) + ")"),
    svg3 = svgRoot.append("g").attr("transform", "translate(" + (containerSize.width / 2 + cmargin2.left) + "," + (height1 + cmargin2.top) + ")");
  ;

  svg2.append("path").datum(data.samples).attr("class", "area area2R").style("fill", colors[2]).style("opacity", 0.8).attr("d", area2R);
  svg2.append("path").datum(data.samples).attr("class", "area area2W").style("fill", colors[3]).style("opacity", 0.8).attr("d", area2W);

  svg3.append("path").datum(data.samples).attr("class", "area area3R").style("fill", colors[2]).style("opacity", 0.8).attr("d", area3R);
  svg3.append("path").datum(data.samples).attr("class", "area area3W").style("fill", colors[3]).style("opacity", 0.8).attr("d", area3W);

  svg2.append("g").attr("class", "x axis").attr("transform", "translate(0," + (cheight2 + 5) + ")").call(xAxis2);
  svg3.append("g").attr("class", "x axis").attr("transform", "translate(0," + (cheight2 + 5) + ")").call(xAxis2);

  svg2.append("g").attr("class", "y axis").call(yAxis2);
  svg3.append("g").attr("class", "y axis").call(yAxis3);

  svg2.selectAll(".y.axis .tick line").attr("x1", -40);
  svg3.selectAll(".y.axis .tick line").attr("x1", -40);
}

export default buildVisualization;
