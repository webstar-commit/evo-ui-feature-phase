var chart;
/*
 * Function to draw the gauge
 */
function generateChart(options) {
    $('#chart').highcharts({
        chart: {
            type: 'area'
        },

        title: {
            text: options.title
        },

        credits: {
            enabled: false
        },

        xAxis: {
            type: 'string',
            title: {
                text: 'Time'
            }
        },

        yAxis: {
            title: {
                text: 'Percentage (%)'
            }
        },

        tooltip: {
            pointFormat: '{series.name} was <b>{point.y:,.0f}%</b>'
        },

        plotOptions: {
            area: {
                marker: {
                    enabled: false,
                    symbol: 'circle',
                    radius: 2,
                    states: {
                        hover: {
                            enabled: true
                        }
                    }
                }
            }
        },

        series: options.series
    });
}

Template.ContainerDetails.helpers({
    container() {
        var lxcId = FlowRouter.getParam('lxcId');
        return Containers.findOne({
            lxc_id: lxcId
        });
    }
});

Template.ContainerDetails.rendered = function () {
    var lxcId = FlowRouter.getParam('lxcId');
    Tracker.autorun(function () {
        var data = ContainerStats.find({}).fetch();

        data = _.map(data, (stat) => {
            return {
                memoryUsage: Math.round(stat.memory_stats.usage / stat.memory_stats.max_usage * 100),
                cpuUsage: Math.round(stat.cpu_stats.cpu_usage.percpu_usage[0] / stat.cpu_stats.cpu_usage.total_usage * 100),
                readTime: moment(stat.read).format('HH:mm:ss')
            };
        });

        var cpuData = _.map(data, (item) => {
            return [item.readTime, item.cpuUsage]
        });

        var memoryData = _.map(data, (item) => {
            return [item.readTime, item.memoryUsage]
        });

        var options = {
            title: 'CPU and Memory Usage',
            series: [{
                name: 'CPU Usage',
                data: cpuData
        }, {
                name: 'Memory Usage',
                data: memoryData
        }]
        };
        generateChart(options);
    });
}