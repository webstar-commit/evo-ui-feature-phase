function initGraph1(container, data) {
    container.html("");
    var containerSize = container.node().getBoundingClientRect();

    var margin = { top: 50, right: 20, bottom: 40, left: 20 },
        width = containerSize.width - margin.left - margin.right,
        height = containerSize.height - margin.top - margin.bottom;

    var x = d3.time.scale().range([0, width]);
    var y1 = d3.scale.linear().range([height, 0]),
        y2 = d3.scale.linear().range([height, 0]),
        y3 = d3.scale.linear().range([height, 0]),
        y4 = d3.scale.linear().range([height, 0]);

    var xFormat = d3.time.format("%I %p");
    x.tickFormat(xFormat);

    var xAxis = d3.svg.axis().scale(x).orient("bottom");

    var area1 = d3.svg.area().interpolate("basis").x(function (d) { return x(d.time); }).y0(height).y1(function (d) { return y1(d.cpu); });
    var area2 = d3.svg.area().interpolate("basis").x(function (d) { return x(d.time); }).y0(height).y1(function (d) { return y2(d.network); });
    var area3 = d3.svg.area().interpolate("basis").x(function (d) { return x(d.time); }).y0(height).y1(function (d) { return y3(d.disk); });
    var area4 = d3.svg.area().interpolate("basis").x(function (d) { return x(d.time); }).y0(height).y1(function (d) { return y4(d.memory); });

    var svgRoot = container.append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom);

    var colors = [["#4E5267", "#32366A"], ["#76B9E4", "#82CBE1"], ["#F09977", "#EE7B4F"], ["#EDEA53", "#EECB53"]];
    var defs = svgRoot.append("defs");

    colors.forEach(function (d, i) {
        var color = defs.append("linearGradient").attr("id", "color" + (i + 1)).attr("x1", "50%").attr("y1", "0%").attr("x2", "50%").attr("y2", "100%");
        color.append("stop").attr("offset", "0%").attr("stop-color", d[0]);
        color.append("stop").attr("offset", "100%").attr("stop-color", d[1]);
    });

    var clipRect = defs.append("clipPath").attr("id", "rectClip").append("rect").attr("width", 0).attr("height", height + margin.top + margin.bottom);

    var svg = svgRoot.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")").attr("clip-path", "url(#rectClip)");

    x.domain(d3.extent(data.days, function (d) { return d.time; }));
    y1.domain([0, d3.max(data.days, function (d) { return d.cpu; })]);
    y2.domain([0, d3.max(data.days, function (d) { return d.network; })]);
    y3.domain([0, d3.max(data.days, function (d) { return d.disk; })]);
    y4.domain([0, d3.max(data.days, function (d) { return d.memory; })]);

    var groups = [
        { avg: data.avg.cpu, color: "url(#color1)", opacity: 0.8, area: area1, key: "cpu" },
        { avg: data.avg.network, color: "url(#color2)", opacity: 0.7, area: area2, key: "network" },
        { avg: data.avg.disk, color: "url(#color3)", opacity: 0.7, area: area3, key: "disk" },
        { avg: data.avg.memory, color: "url(#color4)", opacity: 0.5, area: area4, key: "memory" }
    ];
    
    groups.sort(function(a1, a2) {
        return d3.descending(a1.avg, a2.avg);
    });

    groups.forEach(function(g) {
        svg.append("path").datum(data.days).attr("class", "area").attr("data-key", g.key).attr("data-o", g.opacity).style("fill", g.color).style("opacity", g.opacity).attr("d", g.area);
    });

    //svg.append("path").datum(data.days).attr("class", "area").style("fill", "url(#color1)").style("opacity", 0.8).attr("d", area1);
    //svg.append("path").datum(data.days).attr("class", "area").style("fill", "url(#color2)").style("opacity", 0.7).attr("d", area2);
    //svg.append("path").datum(data.days).attr("class", "area").style("fill", "url(#color3)").style("opacity", 0.7).attr("d", area3);
    //svg.append("path").datum(data.days).attr("class", "area").style("fill", "url(#color4)").style("opacity", 0.5).attr("d", area4);

    var svgY = svgRoot.append("g").attr("class", "y axis").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    for (var yTick = 0; yTick <= 100; yTick += 20) {
        var yTickPos = (yTick / 100 * height);
        svgY.append("line").attr("x1", 0).attr("y1", yTickPos).attr("x2", width).attr("y2", yTickPos);
        svgY.append("text").text((100 - yTick) + "%").attr("text-anchor", "end").attr("x", 40).attr("y", yTickPos + 4);
    }

    svgRoot.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(" + margin.left + "," + (height + margin.top + 5) + ")")
        .call(xAxis);

    var svgInfo = svgRoot.append("g").attr("class", "info")
        .attr("transform", "translate(" + (margin.left + width - 140) + ",0)");

    svgInfo.append("rect").attr("width", 140).attr("height", (height + margin.top));
    svgInfo.append("line").attr("x1", 0).attr("y1", 0).attr("x2", 0).attr("y2", (height + margin.top));

    var infoValues = [
        { title: "CPU Utilization", value: Math.round(data.avg.cpu * 1000) / 1000 + "%", key: "cpu" },
        { title: "Network Utilization", value: Math.round(data.avg.network * 1000) / 1000 + "%", key: "network" },
        { title: "Disk Utilization", value: Math.round(data.avg.disk), key: "disk" },
        { title: "Memory Utilization", value: Math.round(data.avg.memory * 1000) / 1000 + "%", key: "memory" }
    ];

    var blockHeight = (height + margin.top - 20) / infoValues.length;

    infoValues.forEach(function (d, i) {
        svgInfo.append("text").attr("class", "title").attr("x", 15).attr("y", 35 + i * blockHeight).text(d.title);
        svgInfo.append("text").attr("class", "value").attr("x", 35).attr("y", 68 + i * blockHeight).text(d.value);
        svgInfo.append("circle").datum(d.key)
            .attr("cx", 20).attr("cy", 60 + i * blockHeight).attr("r", 7).attr("fill", "url(#color" + (i + 1) + ")")
            .on("click", function(d1) {
                var relatedArea = svg.select(".area[data-key='" + d1 + "']");
                if (relatedArea.style("opacity") == 0) {
                    relatedArea.style("opacity", relatedArea.attr("data-o"));
                } else {
                    relatedArea.style("opacity", 0);
                }
            });
    });

    var hoverInfo = svgRoot.append("g").attr("transform", "translate(20,20)").attr("opacity", 0);
    hoverInfo.append("rect").attr("width", 180).attr("height", 80).style("fill", "#fff").style("fill-opacity", 0.7);
    var hoverTime = hoverInfo.append("text").attr("fill", "#f00").style("font-size", "11px").attr("y", 10).text("09 AM");

    var bisectTime = d3.bisector(function (d) { return d.time; }).left;
    svgRoot
        .on("mousemove", function() {
            var index = bisectTime(data.days, x.invert(d3.mouse(svgRoot.node())[0] - margin.left), 1) - 1;
            var d = data.days[index];
            hoverTime.text(xFormat(d.time));
            hoverTime.append("tspan").attr("x", 0).attr("dy", 15).text("- cpu: " + Math.round(d.cpu * 1000) / 1000 + "%");
            hoverTime.append("tspan").attr("x", 0).attr("dy", 15).text("- network: " + Math.round(d.network * 1000) / 1000 + "%");
            hoverTime.append("tspan").attr("x", 0).attr("dy", 15).text("- disk: " + Math.round(d.disk));
            hoverTime.append("tspan").attr("x", 0).attr("dy", 15).text("- memory: " + Math.round(d.memory * 1000) / 1000 + "%");
        })
        .on("mouseover", function () { hoverInfo.attr("opacity", 1); })
        .on("mouseout", function() { hoverInfo.attr("opacity", 0); });
    
    clipRect.transition().duration(2000).attr("width", width + margin.left + margin.right);
}

function initGraph1a(container, data) {
    container.html("");
    var containerSize = container.node().getBoundingClientRect();

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
    svgInfo.append("text").attr("class", "value").attr("x", width1 + 35).attr("y", height1 * 0.35).text(Math.round(data.avg.cpu * 1000) / 1000 + "%");
    svgInfo.append("circle").attr("cx", width1 + 25).attr("cy", height1 * 0.35 - 8).attr("r", 5).attr("fill", colors[0])
        .on("click", function () {
            if (svg1.select(".bar1").style("opacity") == 0) {
                svg1.selectAll(".bar1").style("opacity", 1);
            } else {
                svg1.selectAll(".bar1").style("opacity", 0);
            }
        });
    
    svgInfo.append("text").attr("class", "title").attr("x", width1 + 20).attr("y", height1 * 0.70).text("Memory Utilization");
    svgInfo.append("text").attr("class", "value").attr("x", width1 + 35).attr("y", height1 * 0.85).text(Math.round(data.avg.memory * 1000) / 1000 + "%");
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
    svgInfo.append("text").attr("class", "value").attr("x", 40).attr("y", height1 + height2 + 60).text(Math.round(data.avg.networkR * 1000) / 1000 + "%");
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
    svgInfo.append("text").attr("class", "value").attr("x", containerSize.width * 0.25 + 40).attr("y", height1 + height2 + 60).text(Math.round(data.avg.networkW * 1000) / 1000 + "%");
    svgInfo.append("circle").attr("cx", containerSize.width * 0.25 + 30).attr("cy", height1 + height2 + 52).attr("r", 5).attr("fill", colors[3])
        .on("click", function () {
            var relatedArea = svg2.select(".area2W");
            if (relatedArea.style("opacity") == 0) {
                relatedArea.style("opacity", 0.8);
            } else {
                relatedArea.style("opacity", 0);
            }
        });
    
    svgInfo.append("text").attr("class", "title").attr("x", containerSize.width/2 + 25).attr("y", height1 + height2 + 30).text("Read");
    svgInfo.append("text").attr("class", "value").attr("x", containerSize.width / 2 + 40).attr("y", height1 + height2 + 60).text(Math.round(data.avg.diskR));
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
    svgInfo.append("text").attr("class", "value").attr("x", containerSize.width * 0.75 + 40).attr("y", height1 + height2 + 60).text(Math.round(data.avg.diskW));
    svgInfo.append("circle").attr("cx", containerSize.width * 0.75 + 30).attr("cy", height1 + height2 + 52).attr("r", 5).attr("fill", colors[3])
        .on("click", function() {
            var relatedArea = svg3.select(".area3W");
            if (relatedArea.style("opacity") == 0) {
                relatedArea.style("opacity", 0.8);
            } else {
                relatedArea.style("opacity", 0);
            }
        });
    
    var cmargin1 = { top: 10, right: 40, bottom: 40, left: 70 },
        cwidth1 = width1 - cmargin1.left - cmargin1.right,
        cheight1 = height1 - cmargin1.top - cmargin1.bottom;
    
    var x1 = d3.time.scale().range([0, cwidth1]);
    var y1 = d3.scale.linear().range([cheight1, 0]);

    var xFormat = d3.time.format("%I %p");
    x1.tickFormat(xFormat);
    
    var xAxis1 = d3.svg.axis().scale(x1).orient("bottom");
    x1.domain(d3.extent(data.days, function (d) { return d.time; }));
    y1.domain([0, 100]);

    var svg1 = svgRoot.append("g").attr("transform", "translate(" + cmargin1.left + "," + cmargin1.top + ")");
    
    svg1.selectAll(".bar1").data(data.days).enter()
        .append("rect").attr("class", "bar1").attr("fill", "url(#color1a_1)").style("opacity", 1)
        .attr("x", function(d) { return x1(d.time) - 7; })
        .attr("y", function (d) { return y1(d.cpu); })
        .attr("width", 9)
        .attr("height", function (d) { return cheight1 - y1(d.cpu); });
    
    svg1.selectAll(".bar2").data(data.days).enter()
        .append("rect").attr("class", "bar2").attr("fill", "url(#color1a_2)").attr("opacity", 0.8)
        .attr("x", function (d) { return x1(d.time) - 2; })
        .attr("y", function (d) { return y1(d.memory); })
        .attr("width", 9)
        .attr("height", function (d) { return cheight1 - y1(d.memory); });
    
    svg1.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + (cheight1 + 5) + ")")
        .call(xAxis1);
    
    for (var yTick = 25; yTick <= 100; yTick += 25) {
        var yTickPos = (yTick / 100 * cheight1);
        svg1.append("line").attr("class", "line2").attr("x1", -50).attr("y1", yTickPos).attr("x2", cwidth1 + 20).attr("y2", yTickPos);
        svg1.append("text").attr("class", "line-text").text((100 - yTick) + "%").attr("text-anchor", "end").attr("x", -15).attr("y", yTickPos + 4);
    }
    
    var cmargin2 = { top: 60, right: 20, bottom: 40, left: 60 },
        cwidth2 = containerSize.width / 2 - cmargin2.left - cmargin2.right,
        cheight2 = height2 - cmargin2.top - cmargin2.bottom;
    
    var x2 = d3.time.scale().range([0, cwidth2]);
    var y2 = d3.scale.linear().range([cheight2, 0]), y3 = d3.scale.linear().range([cheight2, 0]);
    
    var area2R = d3.svg.area().interpolate("basis").x(function (d) { return x2(d.time); }).y0(cheight2).y1(function (d) { return y2(d.networkR); });
    var area2W = d3.svg.area().interpolate("basis").x(function (d) { return x2(d.time); }).y0(cheight2).y1(function (d) { return y2(d.networkW); });
    var area3R = d3.svg.area().interpolate("basis").x(function (d) { return x2(d.time); }).y0(cheight2).y1(function (d) { return y3(d.diskR); });
    var area3W = d3.svg.area().interpolate("basis").x(function (d) { return x2(d.time); }).y0(cheight2).y1(function (d) { return y3(d.diskW); });

    x2.tickFormat(xFormat);
    
    var xAxis2 = d3.svg.axis().scale(x2).orient("bottom").ticks(4);
    var yAxis2 = d3.svg.axis().scale(y2).orient("left").ticks(4).tickSize(-cwidth2),
        yAxis3 = d3.svg.axis().scale(y3).orient("left").ticks(4).tickSize(-cwidth2).tickFormat(d3.format("s"));

    x2.domain(d3.extent(data.days, function (d) { return d.time; }));
    y2.domain([0, d3.max(data.days, function (d) { return d.networkR > d.networkW ? d.networkR : d.networkW; })]);
    y3.domain([0, d3.max(data.days, function (d) { return d.diskR > d.diskW ? d.diskR : d.diskW; })]);

    var svg2 = svgRoot.append("g").attr("transform", "translate(" + cmargin2.left + "," + (height1 + cmargin2.top) + ")"),
        svg3 = svgRoot.append("g").attr("transform", "translate(" + (containerSize.width / 2 + cmargin2.left) + "," + (height1 + cmargin2.top) + ")");;
    
    svg2.append("path").datum(data.days).attr("class", "area area2R").style("fill", colors[2]).style("opacity", 0.8).attr("d", area2R);
    svg2.append("path").datum(data.days).attr("class", "area area2W").style("fill", colors[3]).style("opacity", 0.8).attr("d", area2W);
    
    svg3.append("path").datum(data.days).attr("class", "area area3R").style("fill", colors[2]).style("opacity", 0.8).attr("d", area3R);
    svg3.append("path").datum(data.days).attr("class", "area area3W").style("fill", colors[3]).style("opacity", 0.8).attr("d", area3W);
    
    svg2.append("g").attr("class", "x axis").attr("transform", "translate(0," + (cheight2 + 5) + ")").call(xAxis2);
    svg3.append("g").attr("class", "x axis").attr("transform", "translate(0," + (cheight2 + 5) + ")").call(xAxis2);
    
    svg2.append("g").attr("class", "y axis").call(yAxis2);
    svg3.append("g").attr("class", "y axis").call(yAxis3);

    svg2.selectAll(".y.axis .tick line").attr("x1", -40);
    svg3.selectAll(".y.axis .tick line").attr("x1", -40);
}

function initGraph1b(container, data, options) {

    var dataItem = null;
    if (options.appId != null && options.appId != "" && data != null && data.length > 0) {
        for (var i = 0; i < data.length; i++) {
            if (data[i].appId == options.appId) {
                
                dataItem = data[i];
                console.log(i)
                console.log(dataItem)
                break;
            }
        }
    }

    if (dataItem == null) return;
    
    container.html("");
    var containerSize = container.node().getBoundingClientRect();

    var rightTextWidth = 50, bottomTextHeight = 20;

    var svg = container.append("svg").attr("width", containerSize.width).attr("height", containerSize.height);
    
    var defs = svg.append("defs");

    var color1 = defs.append("linearGradient").attr("id", "color1b_1").attr("x1", "50%").attr("y1", "0%").attr("x2", "50%").attr("y2", "100%");
    color1.append("stop").attr("offset", "0%").attr("stop-color", "#47CBF2");
    color1.append("stop").attr("offset", "100%").attr("stop-color", "#70D6F6");

    var color2 = defs.append("linearGradient").attr("id", "color1b_2").attr("x1", "50%").attr("y1", "0%").attr("x2", "50%").attr("y2", "100%");
    color2.append("stop").attr("offset", "0%").attr("stop-color", "#FF6045");
    color2.append("stop").attr("offset", "100%").attr("stop-color", "#FFA075");

    svg.append("text").attr("class", "title").text("C: " + Math.round(dataItem.avg.cpu * 100) / 100 + "%")
        .attr("x", (containerSize.width - rightTextWidth) * 0.6 * 0.25).attr("y", containerSize.height - bottomTextHeight + 15).attr("text-anchor", "middle");
    svg.append("text").attr("class", "title").text("M: " + Math.round(dataItem.avg.memory * 100) / 100 + "%")
        .attr("x", (containerSize.width - rightTextWidth) * 0.6 * 0.75).attr("y", containerSize.height - bottomTextHeight + 15).attr("text-anchor", "middle");

    var rectLimit = containerSize.height - bottomTextHeight - 2 - 10;

    svg.append("rect").attr("fill", "url(#color1b_1)")
        .attr("width", 10).attr("height", rectLimit * (dataItem.avg.cpu / 100) + 2)
        .attr("x", (containerSize.width - rightTextWidth) * 0.6 * 0.25 - 5).attr("y", rectLimit * (1 - dataItem.avg.cpu / 100) + 10);
    
    svg.append("rect").attr("fill", "url(#color1b_2)")
        .attr("width", 10).attr("height", rectLimit * (dataItem.avg.memory / 100) + 2)
        .attr("x", (containerSize.width - rightTextWidth) * 0.6 * 0.75 - 5).attr("y", rectLimit * (1 - dataItem.avg.memory / 100) + 10);
    
    var x = d3.time.scale().range([0, (containerSize.width - rightTextWidth) * 0.3]);
    var y1 = d3.scale.linear().range([containerSize.height * 0.2, 0]),
        y2 = d3.scale.linear().range([containerSize.height * 0.2, 0]);

    x.domain(d3.extent(dataItem.days, function (d) { return d.time; }));
    y1.domain(d3.extent(dataItem.days, function (d) { return d.network; }));
    y2.domain(d3.extent(dataItem.days, function (d) { return d.disk; }));

    var line1 = d3.svg.line().x(function (d) { return x(d.time); }).y(function (d) { return y1(d.network); });
    var line2 = d3.svg.line().x(function (d) { return x(d.time); }).y(function (d) { return y2(d.disk); });
    
    var svg1 = svg.append("g").attr("transform", "translate(" + (containerSize.width - rightTextWidth) * 0.65 + "," + containerSize.height * 0.15 + ")");
    var svg2 = svg.append("g").attr("transform", "translate(" + (containerSize.width - rightTextWidth) * 0.65 + "," + containerSize.height * 0.65 + ")");
    
    svg1.append("path").datum(dataItem.days).attr("class", "line").style("stroke", "#18BEEF").attr("d", line1);
    svg2.append("path").datum(dataItem.days).attr("class", "line").style("stroke", "#7C81A8").attr("d", line2);

    svg.append("text").attr("class", "title").text("N: " + Math.round(dataItem.avg.network * 100) / 100 + "%").attr("x", (containerSize.width - rightTextWidth)).attr("y", containerSize.height * 0.4);
    svg.append("text").attr("class", "title").text("D: " + Math.round(dataItem.avg.disk)).attr("x", (containerSize.width - rightTextWidth)).attr("y", containerSize.height * 0.75);
}

function initGraph2(container, data, title) {
    container.html("");
    var containerSize = container.node().getBoundingClientRect();

    var margin = 20,
        radius = (containerSize.width > containerSize.height ? containerSize.height : containerSize.width) / 2 - margin;

    var arc = d3.svg.arc()
        .startAngle(function (d) { return d.startAngle; })
        .endAngle(function (d) { return d.endAngle; })
        .innerRadius(function (d) { return radius * 0.77; })
        .outerRadius(function (d) { return radius * 0.77 + 5; });

    var svg = container.append("svg")
        .attr("width", (radius + margin) * 2)
        .attr("height", (radius + margin) * 2)
        .append("g").attr("opacity", 0)
        .attr("transform", "translate(" + (margin + radius) + "," + (margin + radius) + ")");

    var iconSize = 13;
    var icons = [
        '<g opacity="0.4" fill="#FF7551" transform="translate(' + (-iconSize / 2) + ',' + (-iconSize / 2 - radius + 15) + ')"> <path d="M7,2.00063302 C3.98695238,2.00063302 2.14285714,3.04834658 2.14285714,3.61872347 C2.14285714,4.18910035 3.98695238,5.23681392 7,5.23681392 C10.0130476,5.23681392 11.8571429,4.18910035 11.8571429,3.61872347 C11.8571429,3.04834658 10.0130476,2.00063302 7,2.00063302 M7,6.85490437 C3.78133333,6.85490437 0.523809524,5.74327623 0.523809524,3.61872347 C0.523809524,1.49417071 3.78133333,0.382542565 7,0.382542565 C10.2186667,0.382542565 13.4761905,1.49417071 13.4761905,3.61872347 C13.4761905,5.74327623 10.2186667,6.85490437 7,6.85490437" /> <path d="M7,10.0910853 C3.78133333,10.0910853 0.523809524,8.97945714 0.523809524,6.85490437 L0.523809524,3.61872347 C0.523809524,3.17132146 0.885666667,2.80967824 1.33333333,2.80967824 C1.781,2.80967824 2.14285714,3.17132146 2.14285714,3.61872347 L2.14285714,6.85490437 C2.14285714,7.42528126 3.98695238,8.47299483 7,8.47299483 C10.0130476,8.47299483 11.8571429,7.42528126 11.8571429,6.85490437 L11.8571429,3.61872347 C11.8571429,3.17132146 12.219,2.80967824 12.6666667,2.80967824 C13.1143333,2.80967824 13.4761905,3.17132146 13.4761905,3.61872347 L13.4761905,6.85490437 C13.4761905,8.97945714 10.2186667,10.0910853 7,10.0910853" /> <path d="M7,13.3272662 C3.78133333,13.3272662 0.523809524,12.215638 0.523809524,10.0910853 L0.523809524,6.85490437 C0.523809524,6.40750236 0.885666667,6.04585915 1.33333333,6.04585915 C1.781,6.04585915 2.14285714,6.40750236 2.14285714,6.85490437 L2.14285714,10.0910853 C2.14285714,10.6614622 3.98695238,11.7091757 7,11.7091757 C10.0130476,11.7091757 11.8571429,10.6614622 11.8571429,10.0910853 L11.8571429,6.85490437 C11.8571429,6.40750236 12.219,6.04585915 12.6666667,6.04585915 C13.1143333,6.04585915 13.4761905,6.40750236 13.4761905,6.85490437 L13.4761905,10.0910853 C13.4761905,12.215638 10.2186667,13.3272662 7,13.3272662" /> </g>',
        '<g opacity="0.4" fill="#777CA4" transform="translate(' + (-iconSize / 2) + ',' + (-iconSize / 2 - 142 - radius + 15) + ')"> <path d="M8.00451963,144.680898 L5.5759482,144.680898 C5.12909106,144.680898 4.76642439,144.318446 4.76642439,143.871853 C4.76642439,143.42526 5.12909106,143.062808 5.5759482,143.062808 L8.00451963,143.062808 C8.45137678,143.062808 8.81404344,143.42526 8.81404344,143.871853 C8.81404344,144.318446 8.45137678,144.680898 8.00451963,144.680898" id="Fill-1" transform="translate(6.790234, 143.871853) rotate(-90.000000) translate(-6.790234, -143.871853) "/><path d="M8.00228739,153.584423 L5.57371596,153.584423 C5.12685882,153.584423 4.76419215,153.221971 4.76419215,152.775378 C4.76419215,152.328785 5.12685882,151.966333 5.57371596,151.966333 L8.00228739,151.966333 C8.44914454,151.966333 8.8118112,152.328785 8.8118112,152.775378 C8.8118112,153.221971 8.44914454,153.584423 8.00228739,153.584423" id="Fill-3" transform="translate(6.788002, 152.775378) rotate(-90.000000) translate(-6.788002, -152.775378) "/><path d="M2.33875038,150.347345 C1.89189324,150.347345 1.52922657,149.984892 1.52922657,149.538299 L1.52922657,147.111164 C1.52922657,146.664571 1.89189324,146.302119 2.33875038,146.302119 C2.78560752,146.302119 3.14827419,146.664571 3.14827419,147.111164 L3.14827419,149.538299 C3.14827419,149.984892 2.78560752,150.347345 2.33875038,150.347345" id="Fill-5" transform="translate(2.338750, 148.324732) rotate(-90.000000) translate(-2.338750, -148.324732) "/><path d="M10.8364953,146.266565 C10.6292572,146.266565 10.4220191,146.187279 10.264162,146.030324 L9.08144769,144.849118 C8.76492388,144.532781 8.76492388,144.020656 9.08063817,143.704319 C9.39716198,143.387982 9.90959055,143.388791 10.2261144,143.704319 L11.4088286,144.884716 C11.7253525,145.201053 11.7253525,145.713178 11.4096382,146.029515 C11.2509715,146.187279 11.0437334,146.266565 10.8364953,146.266565" id="Fill-7" transform="translate(10.245138, 144.866967) rotate(-90.000000) translate(-10.245138, -144.866967) "/><path d="M3.92374589,153.180671 C3.7165078,153.180671 3.5092697,153.101384 3.35060303,152.943621 L2.1695078,151.762415 C1.85379351,151.446078 1.85379351,150.933952 2.17031732,150.618425 C2.48684113,150.302897 2.9992697,150.302088 3.31579351,150.618425 L4.49688875,151.799631 C4.81260303,152.115967 4.81260303,152.628093 4.49607923,152.94443 C4.33822208,153.101384 4.13098399,153.180671 3.92374589,153.180671" id="Fill-9" transform="translate(3.333198, 151.781073) rotate(-90.000000) translate(-3.333198, -151.781073) "/><path d="M6.7891178,145.89648 C6.14149875,145.89648 5.52949875,146.148902 5.06564161,146.607631 C4.6131178,147.064741 4.36054637,147.676379 4.36054637,148.323616 C4.36054637,148.971661 4.6131178,149.583299 5.07130827,150.045264 C5.98849875,150.950585 7.58326066,150.956249 8.51259399,150.0396 C8.9651178,149.581681 9.21768923,148.970043 9.21768923,148.323616 C9.21768923,147.677997 8.9651178,147.06555 8.50530827,146.600349 C8.04873685,146.148902 7.43673685,145.89648 6.7891178,145.89648 M6.7891178,152.368842 C5.71326066,152.368842 4.69730827,151.950565 3.92745113,151.190872 C3.16083208,150.416616 2.74149875,149.400455 2.74149875,148.323616 C2.74149875,147.247585 3.16083208,146.232234 3.92097494,145.463641 C4.69649875,144.697475 5.71245113,144.278389 6.7891178,144.278389 C7.86578446,144.278389 8.88173685,144.697475 9.65078446,145.457168 C10.418213,146.233852 10.8367368,147.249203 10.8367368,148.323616 C10.8367368,149.398837 10.418213,150.414188 9.65807018,151.18359 C8.88092732,151.950565 7.86497494,152.368842 6.7891178,152.368842" id="Fill-11" transform="translate(6.789118, 148.323616) rotate(-90.000000) translate(-6.789118, -148.323616) "/><path d="M9.65285752,153.178938 C9.44561942,153.178938 9.23838133,153.099651 9.08052419,152.942697 C8.76400038,152.62636 8.76400038,152.114234 9.07971466,151.797898 L10.2608099,150.616692 C10.5773337,150.300355 11.0897623,150.301164 11.4062861,150.616692 C11.7228099,150.932219 11.7228099,151.444345 11.4070956,151.760681 L10.2260004,152.941888 C10.0673337,153.099651 9.86009561,153.178938 9.65285752,153.178938" id="Fill-13" transform="translate(10.243405, 151.779340) rotate(-90.000000) translate(-10.243405, -151.779340) "/><path d="M2.74362481,146.268268 C2.53638672,146.268268 2.32914862,146.188981 2.17048195,146.031218 C1.85476767,145.714881 1.85476767,145.202755 2.17129148,144.886419 L3.35400576,143.706022 C3.67052957,143.390494 4.18295814,143.389685 4.49867243,143.706022 C4.81519624,144.022358 4.81519624,144.534484 4.49867243,144.850821 L3.31595814,146.032027 C3.158101,146.188981 2.95086291,146.268268 2.74362481,146.268268" id="Fill-15" transform="translate(3.334931, 144.868670) rotate(-90.000000) translate(-3.334931, -144.868670) "/><path d="M11.2394852,150.345112 C10.7926281,150.345112 10.4299614,149.98266 10.4299614,149.536067 L10.4299614,147.108932 C10.4299614,146.662339 10.7926281,146.299886 11.2394852,146.299886 C11.6863424,146.299886 12.049009,146.662339 12.049009,147.108932 L12.049009,149.536067 C12.049009,149.98266 11.6863424,150.345112 11.2394852,150.345112" id="Fill-17" transform="translate(11.239485, 148.322499) rotate(-90.000000) translate(-11.239485, -148.322499) "/> </g>',
        '<g opacity="0.4" fill="#4FB1E2" transform="translate(' + (-iconSize / 2 - 186) + ',' + (-iconSize / 2 - 130 - radius + 15) + ')"><path d="M187.666667,134.055909 L190.095238,134.055909 L190.095238,131.628774 L187.666667,131.628774 L187.666667,134.055909 Z M190.904762,135.674 L186.857143,135.674 C186.410286,135.674 186.047619,135.312357 186.047619,134.864955 L186.047619,130.819728 C186.047619,130.372326 186.410286,130.010683 186.857143,130.010683 L190.904762,130.010683 C191.351619,130.010683 191.714286,130.372326 191.714286,130.819728 L191.714286,134.864955 C191.714286,135.312357 191.351619,135.674 190.904762,135.674 L190.904762,135.674 Z" id="Fill-1"/><path d="M194.952381,134.055909 L197.380952,134.055909 L197.380952,131.628774 L194.952381,131.628774 L194.952381,134.055909 Z M198.190476,135.674 L194.142857,135.674 C193.696,135.674 193.333333,135.312357 193.333333,134.864955 L193.333333,130.819728 C193.333333,130.372326 193.696,130.010683 194.142857,130.010683 L198.190476,130.010683 C198.637333,130.010683 199,130.372326 199,130.819728 L199,134.864955 C199,135.312357 198.637333,135.674 198.190476,135.674 L198.190476,135.674 Z" id="Fill-3"/><path d="M187.666667,141.337316 L190.095238,141.337316 L190.095238,138.910181 L187.666667,138.910181 L187.666667,141.337316 Z M190.904762,142.955407 L186.857143,142.955407 C186.410286,142.955407 186.047619,142.593764 186.047619,142.146362 L186.047619,138.101136 C186.047619,137.653734 186.410286,137.29209 186.857143,137.29209 L190.904762,137.29209 C191.351619,137.29209 191.714286,137.653734 191.714286,138.101136 L191.714286,142.146362 C191.714286,142.593764 191.351619,142.955407 190.904762,142.955407 L190.904762,142.955407 Z" id="Fill-4"/><path d="M194.952381,141.337316 L197.380952,141.337316 L197.380952,138.910181 L194.952381,138.910181 L194.952381,141.337316 Z M198.190476,142.955407 L194.142857,142.955407 C193.696,142.955407 193.333333,142.593764 193.333333,142.146362 L193.333333,138.101136 C193.333333,137.653734 193.696,137.29209 194.142857,137.29209 L198.190476,137.29209 C198.637333,137.29209 199,137.653734 199,138.101136 L199,142.146362 C199,142.593764 198.637333,142.955407 198.190476,142.955407 L198.190476,142.955407 Z" id="Fill-5"/></g>'
    ];

    var totalLength = data[0].length + data[1].length + data[2].length;
    var angle = 360 / totalLength, angleRad = 2 * Math.PI / totalLength;
    var arcData = [], arcColors = ["#FF7551", "#4FB1E2", "#777CA4"];

    var di = 0;
    data.forEach(function (g, gi) {
        if (g.length == 0) return;

        if (g.length == totalLength) {
            arcData.push({ startAngle: 0, endAngle: 2 * Math.PI, fill: arcColors[gi] });
        } else if (g.length == 1) {
            arcData.push({ startAngle: (di - 0.3) * angleRad, endAngle: (di + 0.3) * angleRad, fill: arcColors[gi] });
        } else {
            arcData.push({ startAngle: di * angleRad, endAngle: (di + g.length - 1) * angleRad, fill: arcColors[gi] });
        }

        g.forEach(function (d) {
            svg.append("g").datum(d).attr("transform", "rotate(" + (angle * di) + " 0,0)").html(icons[gi])
                .append("rect").attr("width", 14).attr("height", 14)
                .attr("x", -7).attr("y", (-7 - radius + 15)).style("cursor", "pointer").style("fill", "transparent")
                .append("title").text(d.appName);

            svg.append("g").attr("transform", "rotate(" + (angle * di) + " 0,0)")
                .append("text").attr("text-anchor", "middle").attr("x", 0).attr("y", (-radius * 0.65)).text(d.appCount)
                .style("font-size", "10px").style("opacity", 0.8);
            
            svg.append("g").attr("transform", "rotate(" + (angle * di) + " 0,0)")
                .append("text").attr("text-anchor", "middle").attr("x", 0).attr("y", (-radius)).text(d.appName.toUpperCase().substring(0, 1))
                .style("font-size", "10px").style("opacity", 0.8);

            di++;
        });
    });

    svg.selectAll(".arc").data(arcData).enter()
        .append("path").attr("class", "arc").attr("d", arc).style("fill", function (d) { return d.fill; });

    if (title != null) {
        svg.append("text").attr("text-anchor", "middle").attr("x", 0).attr("y", 4).style("font-size", "12px").text(title);
    }

    svg.transition().duration(1000).attr("opacity", 1);
}

function initGraph3(container, data, options) {

    var dataItem = null;
    if (options.appId != null && options.appId != "" && data != null && data.length > 0) {
        for (var i = 0; i < data.length; i++) {
            if (data[i].appId == options.appId) {
                dataItem = data[i];
                break;
            }
        }
    }

    if (dataItem == null) return;
    
    var width = 280, height = 350, margin = {top: 20, left: 30, bottom: 60, right: 40};

    var svg = container.append("svg").attr("width", 0).attr("height", 0).attr("opacity", 0);

    svg.append("defs").html(
        '<filter id="f1" x="-50%" y="-50%" width="200%" height="200%" filterUnits="objectBoundingBox">' +
            '<feOffset dx="0" dy="19" in="SourceAlpha" result="shadowOffsetOuter1"/>' +
            '<feGaussianBlur stdDeviation="19" in="shadowOffsetOuter1" result="shadowBlurOuter1"/>' +
            '<feColorMatrix values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.3 0" type="matrix" in="shadowBlurOuter1" result="shadowMatrixOuter1"/>' +
            '<feOffset dx="0" dy="15" in="SourceAlpha" result="shadowOffsetOuter2"/>' +
            '<feGaussianBlur stdDeviation="6" in="shadowOffsetOuter2" result="shadowBlurOuter2"/>' +
            '<feColorMatrix values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.22 0" type="matrix" in="shadowBlurOuter2" result="shadowMatrixOuter2"/>' +
            '<feMerge>' +
                '<feMergeNode in="shadowMatrixOuter1"/>' +
                '<feMergeNode in="shadowMatrixOuter2"/>' +
            '</feMerge>' +
        '</filter>' + 
        '<filter id="f2" x="0" y="0" width="200%" height="200%">' +
            '<feOffset result="offOut" in="SourceAlpha" dx="0" dy="8" />' +
            '<feGaussianBlur result="blurOut" in="offOut" stdDeviation="10" />' +
            '<feBlend in="SourceGraphic" in2="blurOut" mode="normal" />' +
        '</filter>');

    var points = margin.left + "," + margin.top + " " + (width - margin.right) + "," + margin.top + " " + (width - margin.right) + "," + (height - margin.bottom) + " " + margin.left + "," + (height - margin.bottom) + " " + margin.left + ",70 10,55 " + margin.left + ",40";
    svg.append("polygon").attr("points", points).attr("filter", "url(#f1)");
    svg.append("polygon").attr("points", points).style("fill", "#fff");

    svg.append("text").attr("class", "app-name").text(options.appName + " at " + Math.round(dataItem.avg.cpu * 1000) / 1000)
        .attr("x", margin.left + (width - margin.left - margin.right) / 2).attr("y", margin.top + 35).attr("text-anchor", "middle");
    
    svg.append("text").attr("class", "app-time").text("↑ Since Yesterday")
        .attr("x", margin.left + (width - margin.left - margin.right) / 2).attr("y", margin.top + 55).attr("text-anchor", "middle");

    var link = svg.append("a").attr("href", options.appLink);
    link.append("text").attr("class", "app-link").text("+ MORE DETAILS")
        .attr("x", margin.left + (width - margin.left - margin.right) / 2).attr("y", height - margin.bottom - 10).attr("text-anchor", "middle");
    
    var x = d3.time.scale().range([0, width - margin.left - margin.right]);
    var y = d3.scale.linear().range([height - margin.top - margin.bottom - 130, 0]);
    
    var yAxis = d3.svg.axis().scale(y).orient("left").ticks(5).tickFormat(d3.format(",.4f"));
    var line = d3.svg.line().interpolate("basis").x(function (d) { return x(d.time); }).y(function (d) { return y(d.cpu); });
    
    var chartSvg = svg.append("g").attr("transform", "translate(" + (margin.left) + ", " + (margin.top + 80) + ")");
    
    x.domain(d3.extent(dataItem.days, function (d) { return d.time; }));
    y.domain(d3.extent(dataItem.days, function (d) { return d.cpu; }));
    
    chartSvg.append("g").attr("class", "y axis").attr("transform", "translate(55,0)").call(yAxis);
    
    chartSvg.append("path").datum(dataItem.days).attr("class", "line").attr("d", line).attr("filter", "url(#f2)");
    
    container
        .on("mouseover", function () { svg.attr("width", width).attr("height", height).attr("opacity", 1); })
        .on("mouseout", function () { svg.attr("opacity", 0).attr("width", 0).attr("height", 0); });
}

function initGraph4(container, data) {
    container.html("");
    var containerSize = container.node().getBoundingClientRect();

    var margin = { top: 20, right: 20, bottom: 40, left: 170 },
        subMargin = {top: 20, bottom: 10},
        width = containerSize.width - margin.left - margin.right,
        height = (containerSize.height - margin.top - margin.bottom) / 4 - (subMargin.top + subMargin.bottom);

    var x = d3.time.scale().range([0, width]);
    var y1 = d3.scale.linear().range([height, 0]),
        y2 = d3.scale.linear().range([height, 0]),
        y3 = d3.scale.linear().range([height, 0]),
        y4 = d3.scale.linear().range([height, 0]);

    var xFormat = d3.time.format("%I %p");
    x.tickFormat(xFormat);

    var xAxis = d3.svg.axis().scale(x).orient("bottom");

    var area1 = d3.svg.area().x(function (d) { return x(d.t); }).y0(height).y1(function (d) { return y1(d.health); });
    var area2 = d3.svg.area().x(function (d) { return x(d.t); }).y0(height).y1(function (d) { return y2(d.errorCount); });
    var area3 = d3.svg.area().x(function (d) { return x(d.t); }).y0(height).y1(function (d) { return y3(d.errorDeviation); });
    var area4 = d3.svg.area().x(function (d) { return x(d.t); }).y0(height).y1(function (d) { return y4(d.responseTime); });
    
    var line1 = d3.svg.line().x(function (d) { return x(d.t); }).y(function (d) { return y1(d.health); });
    var line2 = d3.svg.line().x(function (d) { return x(d.t); }).y(function (d) { return y2(d.errorCount); });
    var line3 = d3.svg.line().x(function (d) { return x(d.t); }).y(function (d) { return y3(d.errorDeviation); });
    var line4 = d3.svg.line().x(function (d) { return x(d.t); }).y(function (d) { return y4(d.responseTime); });

    var svgRoot = container.append("svg").attr("width", containerSize.width).attr("height", containerSize.height);

    var colors = [["#4FB1E2", "#E7F3FB"], ["#777CA4", "#EAEBF1"], ["#FF7551", "#FDEDE6"], ["#FFB800", "#FDF9DD"]];
    var defs = svgRoot.append("defs");

    colors.forEach(function (d, i) {
        var color = defs.append("linearGradient").attr("id", "colorg4_" + (i + 1)).attr("x1", "50%").attr("y1", "0%").attr("x2", "50%").attr("y2", "100%");
        color.append("stop").attr("offset", "0%").attr("stop-color", d[1]);
        color.append("stop").attr("offset", "100%").attr("stop-color", "#FFFFFF");
    });

    var clipRect = defs.append("clipPath").attr("id", "rectClip").append("rect").attr("width", 0).attr("height", containerSize.height);

    var svg = svgRoot.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")").attr("clip-path", "url(#rectClip)");
    
    svgRoot.append("line").attr("class", "separator")
        .attr("x1", 0).attr("y1", (height + subMargin.top + subMargin.bottom) + margin.top).attr("x2", (width + margin.left)).attr("y2", (height + subMargin.top + subMargin.bottom) + margin.top);
    svgRoot.append("line").attr("class", "separator")
        .attr("x1", 0).attr("y1", (height + subMargin.top + subMargin.bottom) * 2 + margin.top).attr("x2", (width + margin.left)).attr("y2", (height + subMargin.top + subMargin.bottom) * 2 + margin.top);
    svgRoot.append("line").attr("class", "separator")
        .attr("x1", 0).attr("y1", (height + subMargin.top + subMargin.bottom) * 3 + margin.top).attr("x2", (width + margin.left)).attr("y2", (height + subMargin.top + subMargin.bottom) * 3 + margin.top);
    svgRoot.append("line").attr("class", "separator")
        .attr("x1", 0).attr("y1", (height + subMargin.top + subMargin.bottom) * 4 + margin.top).attr("x2", (width + margin.left)).attr("y2", (height + subMargin.top + subMargin.bottom) * 4 + margin.top);

    var svg1 = svg.append("g").attr("transform", "translate(0," + subMargin.top + ")");
    var svg2 = svg.append("g").attr("transform", "translate(0," + (subMargin.top * 2 + height + subMargin.bottom) + ")");
    var svg3 = svg.append("g").attr("transform", "translate(0," + (subMargin.top * 3 + height * 2 + subMargin.bottom * 2) + ")");
    var svg4 = svg.append("g").attr("transform", "translate(0," + (subMargin.top * 4 + height * 3 + subMargin.bottom * 3) + ")");

    x.domain(d3.extent(data.samples, function (d) { return d.t; }));
    y1.domain([0, d3.max(data.samples, function (d) { return d.health; })]);
    y2.domain([0, d3.max(data.samples, function (d) { return d.errorCount; })]);
    y3.domain([0, d3.max(data.samples, function (d) { return d.errorDeviation; })]);
    y4.domain([0, d3.max(data.samples, function (d) { return d.responseTime; })]);

    svg1.append("path").datum(data.samples).attr("class", "area").style("fill", "url(#colorg4_1)").attr("d", area1);
    svg2.append("path").datum(data.samples).attr("class", "area").style("fill", "url(#colorg4_2)").attr("d", area2);
    svg3.append("path").datum(data.samples).attr("class", "area").style("fill", "url(#colorg4_3)").attr("d", area3);
    svg4.append("path").datum(data.samples).attr("class", "area").style("fill", "url(#colorg4_4)").attr("d", area4);
    
    svg1.append("path").datum(data.samples).attr("class", "line").style("stroke", colors[0][0]).attr("d", line1);
    svg2.append("path").datum(data.samples).attr("class", "line").style("stroke", colors[1][0]).attr("d", line2);
    svg3.append("path").datum(data.samples).attr("class", "line").style("stroke", colors[2][0]).attr("d", line3);
    svg4.append("path").datum(data.samples).attr("class", "line").style("stroke", colors[3][0]).attr("d", line4);

    var dataDots = data.samples.slice(1, data.samples.length - 1);
    var lastDot = dataDots[dataDots.length - 1];

    svg1.selectAll("dot").data(dataDots).enter()
        .append("circle").attr("r", 3).style("stroke", colors[0][0]).style("stroke-width", 3).style("fill", "#FFFFFF")
        .attr("cx", function (d) { return x(d.t); }).attr("cy", function (d) { return y1(d.health); });
    svg2.selectAll("dot").data(dataDots).enter()
        .append("circle").attr("r", 3).style("stroke", colors[1][0]).style("stroke-width", 3).style("fill", "#FFFFFF")
        .attr("cx", function (d) { return x(d.t); }).attr("cy", function (d) { return y2(d.errorCount); });
    svg3.selectAll("dot").data(dataDots).enter()
        .append("circle").attr("r", 3).style("stroke", colors[2][0]).style("stroke-width", 3).style("fill", "#FFFFFF")
        .attr("cx", function (d) { return x(d.t); }).attr("cy", function (d) { return y3(d.errorDeviation); });
    svg4.selectAll("dot").data(dataDots).enter()
        .append("circle").attr("r", 3).style("stroke", colors[3][0]).style("stroke-width", 3).style("fill", "#FFFFFF")
        .attr("cx", function (d) { return x(d.t); }).attr("cy", function (d) { return y4(d.responseTime); });
    
    svg1.append("circle").attr("r", 6).style("stroke", colors[0][0]).style("stroke-width", 4).style("fill", "none").style("opacity", 0.4)
        .attr("cx", x(lastDot.t)).attr("cy", y1(lastDot.health));
    svg1.append("circle").attr("r", 10).style("stroke", colors[0][0]).style("stroke-width", 5).style("fill", "none").style("opacity", 0.1)
        .attr("cx", x(lastDot.t)).attr("cy", y1(lastDot.health));
    
    svg2.append("circle").attr("r", 6).style("stroke", colors[1][0]).style("stroke-width", 4).style("fill", "none").style("opacity", 0.4)
        .attr("cx", x(lastDot.t)).attr("cy", y2(lastDot.errorCount));
    svg2.append("circle").attr("r", 10).style("stroke", colors[1][0]).style("stroke-width", 5).style("fill", "none").style("opacity", 0.1)
        .attr("cx", x(lastDot.t)).attr("cy", y2(lastDot.errorCount));

    svg3.append("circle").attr("r", 6).style("stroke", colors[2][0]).style("stroke-width", 4).style("fill", "none").style("opacity", 0.4)
        .attr("cx", x(lastDot.t)).attr("cy", y3(lastDot.errorDeviation));
    svg3.append("circle").attr("r", 10).style("stroke", colors[2][0]).style("stroke-width", 5).style("fill", "none").style("opacity", 0.1)
        .attr("cx", x(lastDot.t)).attr("cy", y3(lastDot.errorDeviation));
    
    svg4.append("circle").attr("r", 6).style("stroke", colors[3][0]).style("stroke-width", 4).style("fill", "none").style("opacity", 0.4)
        .attr("cx", x(lastDot.t)).attr("cy", y4(lastDot.responseTime));
    svg4.append("circle").attr("r", 10).style("stroke", colors[3][0]).style("stroke-width", 5).style("fill", "none").style("opacity", 0.1)
        .attr("cx", x(lastDot.t)).attr("cy", y4(lastDot.responseTime));

    svgRoot.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(" + margin.left + "," + (containerSize.height - margin.bottom + 5) + ")")
        .call(xAxis);

    svgRoot.append("text").attr("class", "info-title").text("Reported Availability").attr("x", 20).attr("y", margin.top + 25);
    svgRoot.append("text").attr("class", "info-value").text(data.summary.health * 100 + "%").attr("x", 20).attr("y", margin.top + 55);
    svgRoot.append("text").attr("class", "info-title").text("Error Count").attr("x", 20).attr("y", margin.top + 25 + (height + subMargin.top + subMargin.bottom));
    svgRoot.append("text").attr("class", "info-value").text(data.summary.errorCount).attr("x", 20).attr("y", margin.top + 55 + (height + subMargin.top + subMargin.bottom));
    svgRoot.append("text").attr("class", "info-title").text("Deviation Errors").attr("x", 20).attr("y", margin.top + 25 + (height + subMargin.top + subMargin.bottom) * 2);
    svgRoot.append("text").attr("class", "info-value").text(data.summary.errorDeviation).attr("x", 20).attr("y", margin.top + 55 + (height + subMargin.top + subMargin.bottom) * 2);
    svgRoot.append("text").attr("class", "info-title").text("Sample Response Time").attr("x", 20).attr("y", margin.top + 25 + (height + subMargin.top + subMargin.bottom) * 3);
    svgRoot.append("text").attr("class", "info-value").text(data.summary.responseTime).attr("x", 20).attr("y", margin.top + 55 + (height + subMargin.top + subMargin.bottom) * 3);
    
    clipRect.transition().duration(2000).attr("width", width + margin.left + margin.right);
}