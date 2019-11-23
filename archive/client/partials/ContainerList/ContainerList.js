var chart;
/*
 * Function to draw the gauge
 */
function generateChart(label, value, element, title) {
    element.highcharts({
        chart: {
            type: 'solidgauge'
        },
        title: title,
        pane: {
            center: ['50%', '85%'],
            size: '140%',
            startAngle: -90,
            endAngle: 90,
            background: {
                backgroundColor: '#EEE',
                innerRadius: '60%',
                outerRadius: '100%',
                shape: 'arc'
            }
        },
        tooltip: {
            enabled: false
        },
        credits: {
            enabled: false
        },
        yAxis: {
            stops: [
                [0.1, '#55BF3B'], // green
                [0.5, '#DDDF0D'], // yellow
                [0.9, '#DF5353'] // red
            ],
            lineWidth: 0,
            minorTickInterval: null,
            tickPixelInterval: 400,
            tickWidth: 0,
            title: {
                y: -70
            },
            labels: {
                y: 16
            },
            min: 0,
            max: 100,
            title: {
                text: label
            }
        },
        plotOptions: {
            solidgauge: {
                dataLabels: {
                    y: 5,
                    borderWidth: 0,
                    useHTML: true
                }
            }
        },
        series: [{
            name: label,
            data: [value],
            dataLabels: {
                format: '<div style="text-align:center"><span style="font-size:25px;color:black">{y}</span><br/>' +
                    '<span style="font-size:12px;color:silver">%</span></div>'
            },
            tooltip: {
                valueSuffix: ' %'
            }
        }]
    });
}

Template.ContainerList.events({
    'click .sort-by-host': () => {
        Session.set('sortBy', 'host');
    },
    'click .sort-by-app': () => {
        Session.set('sortBy', 'app');
    }
});

Template.ContainerList.helpers({
    containers() {
        var sortOptions = {};
        if (Session.get('sortBy') === 'host')
            sortOptions = {
                "network.IPAddress": -1
            };
        if (Session.get('sortBy') === 'app')
            sortOptions = {
                "app": -1
            };
        return Containers.find({}, {
            sort: sortOptions
        });
    }
});

Template.ContainerListItem.onCreated(function () {
    this.subscribe('activeContainers');

});
Template.ContainerListItem.rendered = function () {

    var lxcId = this.data.lxc_id;
    Tracker.autorun(function () {
        let cpuElement = chart = $('#container-' + lxcId).find('.cpu-usage');
        let memoryElement = chart = $('#container-' + lxcId).find('.memory-usage');

        var containerStat = ContainerStats.findOne({
            LXC_Id: lxcId
        });
        if (!containerStat) return;

        const cpuUsage = Math.round(containerStat.cpu_stats.cpu_usage.percpu_usage[0] / containerStat.cpu_stats.cpu_usage.total_usage * 100);
        const memoryUsage = Math.round(containerStat.memory_stats.usage / containerStat.memory_stats.max_usage * 100);

        generateChart("CPU", cpuUsage, cpuElement, containerStat.Host_DNS);
        generateChart("Memory", memoryUsage, memoryElement, containerStat.Host_DNS);
    });
};