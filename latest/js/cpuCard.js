var gaugeContainerSideLength = 28;
var gaugeTransform = 'translate(' + (gaugeContainerSideLength/2) + ',' + (gaugeContainerSideLength/2) + ')';
var gaugeInactiveColor = '#e8eef0';
var gaugeActiveColor = '#4fb1e2';
var gaugeTextColor = '#3b4f53';
var letterSpacing = '1.40971704';
var arcScale = d3.scaleLinear().domain([0, 100]).range([0, Math.PI * 2]);
var sideScale = d3.scaleLinear().domain([0, 100]).range([0, gaugeContainerSideLength]);
var fullArc = Math.PI * 2;
var fontSize = sideScale(30);

d3.json("http://localhost:3000/api/container_stats/current/top5/cpu", function (error, data) {
  console.log('cpuCard: got CPU data', data);
  dataViz(data)
});

function dataViz(incomingData) {

  function buildGauge(gaugeIndex) {
    d3.select("#cpu")
      .select('.left' + (gaugeIndex+1) + ' h4')
      .html(incomingData[gaugeIndex].Names.toString().substring(0, 16));

    var canvas = d3.select("#cpu").select('.right' + (gaugeIndex+1)).append("svg")
      .attr("width", gaugeContainerSideLength)
      .attr("height", gaugeContainerSideLength);

    var group = canvas.append("g")
      .attr("transform", gaugeTransform);

    var arcActive = d3.arc()
      .innerRadius(sideScale(40))
      .outerRadius(sideScale(48))
      .startAngle(0)
      .endAngle(arcScale(Math.ceil(incomingData[gaugeIndex].percent)));

    var arcInactive = d3.arc()
      .innerRadius(sideScale(41))
      .outerRadius(sideScale(46))
      .startAngle(0)
      .endAngle(fullArc);

    group.append("path")
      .attr("d", arcInactive)
      .attr("fill", gaugeInactiveColor);

    group.append("path")
      .attr("d", arcActive)
      .attr("fill", gaugeActiveColor)
      .style("opacity", 0.800000012);

    var text = group.selectAll("text")
      .data([Math.ceil(incomingData[gaugeIndex].percent)])
      .enter()
      .append("text");

    var textLabels = text
      .attr('text-anchor', 'middle')
      .attr("y", sideScale(10))
      .text(function (d) {
          return d + "%";
      })
      .attr("font-family", "San Francisco")
      .attr("font-size", fontSize)
      .attr("fill", gaugeTextColor)
      .attr("font-weight", "regular")
      .attr("letter-spacing", letterSpacing);
  }

  [0, 1, 2, 3, 4].forEach(function (gaugeIndex) {
    buildGauge(gaugeIndex);
  });

  d3.select("#svgdataurl").remove();
}
