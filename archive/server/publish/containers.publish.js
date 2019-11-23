Meteor.publish("activeContainers", () => {
	return Containers.find({}, {
		limit: 10,
		sort: {
			ReadTime: -1
		}
	});
});

Meteor.publish("containerStats", () => {
	return ContainerStats.find({}, {
		limit: 20,
		sort: {
			read: -1
		}
	});
});


Meteor.publish("getMemoryAndCpuUsagePercentages", (LXCId, limit = 20) => {
	return ContainerStats.find({
		LXC_Id: LXCId
	}, {
		limit: limit
	}).map((stat) => {
		return {
			memory: Math.round(stat.memory_stats.usage / stat.memory_stats.limit * 100) / 100,
			cpu: Math.round(stat.cpu_stats.cpu_usage.percpu_usage[0] / stat.cpu_stats.cpu_usage.total_usage * 100) / 100,
			time: moment(stat.read).format('HH:mm:ss')
		};
	});

});
