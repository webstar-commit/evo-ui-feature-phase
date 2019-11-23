Meteor.methods({
    getHostList() {
        return Containers.aggregate([
            { $group : { _id : {DNSName: "$DNSName" }, containers: { $push: "$Image" } } }
        ]);
        
        return Containers.group(
            {
                key: {DNSName: 1, "Image" : 1},
                cond: {},
                reduce: function(curr, result){},
                initial: {}
             
            })       
        
        let containers = Containers.find({}, {limit: 100}).fetch();        
        return _.groupBy(containers, (c)=> c.DNSName);
    },
    getHostSummary (hostName) {
        let containers = Containers.find({DNSName: hostName}).fetch();
        return {name: hostName, totalContainers: containers.length, ipAddress: containers[0].IPAddress, status: containers[0].Status};       
        
    },
    getHost(hostName) {
        let containers = Containers.find({DNSName: hostName}).fetch();
        return {name: hostName, totalContainers: containers.length, ipAddress: containers[0].IPAddress, status: containers[0].Status, containers: containers};               
    },	
    getHostPerformance(hostName) {
        let stat = ContainerStats.findOne({Host_DNS: hostName});
        let  cpuUsage = Math.round(stat.cpu_stats.cpu_usage.percpu_usage[0] / stat.cpu_stats.cpu_usage.total_usage * 100) / 100;
        let  memoryUsage = Math.round(stat.memory_stats.usage / stat.memory_stats.limit * 100) / 100;
        return {name: hostName, cpuUsage: cpuUsage, memoryUsage: memoryUsage};               
    }
})