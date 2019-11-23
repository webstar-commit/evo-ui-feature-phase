import React from 'react';
import * as d3 from 'd3';
import ReactFauxDOM from 'react-faux-dom';

const gaugeContainerSideLength = 40;
const gaugeTransform = 'translate(' + (gaugeContainerSideLength / 2) + ',' + (gaugeContainerSideLength / 2) + ')';
const gaugeInactiveColor = '#e8eef0';
const gaugeActiveColor = '#4fb1e2';
const gaugeTextColor = '#3b4f53';
const letterSpacing = '1.4';
const arcScale = d3.scale.linear().domain([0, 100]).range([0, Math.PI * 2]);
const sideScale = d3.scale.linear().domain([0, 100]).range([0, gaugeContainerSideLength]);
const fullArc = Math.PI * 2;
const fontSize = sideScale(30);
const fontFamily = 'San Francisco';

/**
 * An auxiliary component for D3 Gauge rendering.
 * @param props React component properties
 * @constructor
 */
const Gauge = (props) => {
  const svgElement = ReactFauxDOM.createElement('svg');
  const svg = d3.select(svgElement)
    .attr("width", gaugeContainerSideLength)
    .attr("height", gaugeContainerSideLength);

  const group = svg.append("g")
    .attr("transform", gaugeTransform);

  const arcActive = d3.svg.arc()
    .innerRadius(sideScale(40))
    .outerRadius(sideScale(48))
    .startAngle(0)
    .endAngle(arcScale(Math.ceil(props.value)));

  const arcInactive = d3.svg.arc()
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
    .style("opacity", 0.8);

  const text = group.selectAll("text")
    .data([Math.ceil(props.value)])
    .enter()
    .append("text");

  text.attr('text-anchor', 'middle')
    .attr("y", sideScale(10))
    .text(function (d) {
      return d + "%";
    })
    .attr("font-family", fontFamily)
    .attr("font-size", fontSize)
    .attr("fill", gaugeTextColor)
    .attr("font-weight", "regular")
    .attr("letter-spacing", letterSpacing);
  return svgElement.toReact();
};

export default Gauge;
