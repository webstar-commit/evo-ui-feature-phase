Containers = new Mongo.Collection('containers');
ContainerStats = new Mongo.Collection('container_stats');

NetworkSchema = new SimpleSchema({
    "MacAddress": {
        type: String
    },
    "IPAddress": {
        type: String
    }
});
ContainerSchema = new SimpleSchema({
    "app": {
        type: String
    },
    "network": {
        type: NetworkSchema
    },
    "lxc_id": {
        type: String
    }
});

ContainerStatsChema = new SimpleSchema({
    "read": {
        type: Date
    },
    "cpu_stats": {
        type: {
            "cpu_usage": {
                "total_usage": Number,
                "percpu_usage": [
                Number
            ]
            },
            "system_cpu_usage": Number
        }
    },
    "memory_stats": {
        type: {
            "usage": Number,
            "max_usage": Number,
            "limit": Number
        }
    },
    "Host_DNS": {
        type: String
    },
    "Host_IP": {
        type: String
    },
    "LXC_Id": {
        type: String
    }
});

Containers.attachSchema(ContainerSchema);
//ContainerStats.attachSchema(ContainerStatsChema);