Meteor.startup(() => {
    if (Containers.find().count() === 0)
        Containers.insert({
            "app": "app",
            "network": {
                "MacAddress": "3e:8c:2c:12:57:36",
                "IPAddress": "192.168.7.140"
            },
            "lxc_id": "2e64be9bb3bf1dff6796666d173b2f4b7092a68f5b0dc4d96eed02c8a523512e"
        });
    if (Applications.find().count() === 0)
        Applications.insert({
            "app_info": {
                "image": "images.evolute.io:5000/app",
                "Command": "bash"
            },
            "app_id": "app"
        });
    if (ContainerStats.find().count() === 0)
        ContainerStats.insert({
            "read": new Date(),
            "network": {
                "rx_bytes": 0,
                "rx_packets": 0,
                "rx_errors": 0,
                "rx_dropped": 0,
                "tx_bytes": 0,
                "tx_packets": 0,
                "tx_errors": 0,
                "tx_dropped": 0
            },
            "precpu_stats": {
                "cpu_usage": {
                    "total_usage": 14013444846695,
                    "percpu_usage": [
                7854660132483,
                6158784714212
            ],
                    "usage_in_kernelmode": 5287090000000,
                    "usage_in_usermode": 3897270000000
                },
                "system_cpu_usage": 17262975860000000,
                "throttling_data": {
                    "periods": 0,
                    "throttled_periods": 0,
                    "throttled_time": 0
                }
            },
            "cpu_stats": {
                "cpu_usage": {
                    "total_usage": 14013445370098,
                    "percpu_usage": [
                7851660521288,
                6158784848810
            ],
                    "usage_in_kernelmode": 5287090000000,
                    "usage_in_usermode": 3897270000000
                },
                "system_cpu_usage": 17262977850000000,
                "throttling_data": {
                    "periods": 0,
                    "throttled_periods": 0,
                    "throttled_time": 0
                }
            },
            "memory_stats": {
                "usage": 1.83107e+009,
                "max_usage": 1.87249e+009,
                "stats": {
                    "active_anon": 7.10533e+007,
                    "active_file": 1.24097e+009,
                    "cache": 1.78001e+009,
                    "hierarchical_memory_limit": 9223372036854775807,
                    "hierarchical_memsw_limit": 9223372036854775807,
                    "inactive_anon": 0,
                    "inactive_file": 5.39046e+008,
                    "mapped_file": 1.2288e+007,
                    "pgfault": 1.9088e+009,
                    "pgmajfault": 217,
                    "pgpgin": 7.06075e+008,
                    "pgpgout": 7.05624e+008,
                    "rss": 7.10533e+007,
                    "rss_huge": 2.09715e+006,
                    "swap": 0,
                    "total_active_anon": 7.10533e+007,
                    "total_active_file": 1.24097e+009,
                    "total_cache": 1.78001e+009,
                    "total_inactive_anon": 0,
                    "total_inactive_file": 5.39046e+008,
                    "total_mapped_file": 1.2288e+007,
                    "total_pgfault": 1.9088e+009,
                    "total_pgmajfault": 217,
                    "total_pgpgin": 7.06075e+008,
                    "total_pgpgout": 7.05624e+008,
                    "total_rss": 7.10533e+007,
                    "total_rss_huge": 2.09715e+006,
                    "total_swap": 0,
                    "total_unevictable": 0,
                    "unevictable": 0
                },
                "failcnt": 0,
                "limit": 3706343424
            },
            "blkio_stats": {
                "io_service_bytes_recursive": [
                    {
                        "major": 202,
                        "minor": 0,
                        "op": "Read",
                        "value": 3.93216e+006
            },
                    {
                        "major": 202,
                        "minor": 0,
                        "op": "Write",
                        "value": 1.03264e+008
            },
                    {
                        "major": 202,
                        "minor": 0,
                        "op": "Sync",
                        "value": 1.03264e+008
            },
                    {
                        "major": 202,
                        "minor": 0,
                        "op": "Async",
                        "value": 3.93216e+006
            },
                    {
                        "major": 202,
                        "minor": 0,
                        "op": "Total",
                        "value": 1.07196e+008
            },
                    {
                        "major": 7,
                        "minor": 0,
                        "op": "Read",
                        "value": 278528
            },
                    {
                        "major": 7,
                        "minor": 0,
                        "op": "Write",
                        "value": 1.6384e+006
            },
                    {
                        "major": 7,
                        "minor": 0,
                        "op": "Sync",
                        "value": 548864
            },
                    {
                        "major": 7,
                        "minor": 0,
                        "op": "Async",
                        "value": 1.36806e+006
            },
                    {
                        "major": 7,
                        "minor": 0,
                        "op": "Total",
                        "value": 1.91693e+006
            },
                    {
                        "major": 253,
                        "minor": 0,
                        "op": "Read",
                        "value": 278528
            },
                    {
                        "major": 253,
                        "minor": 0,
                        "op": "Write",
                        "value": 1.6384e+006
            },
                    {
                        "major": 253,
                        "minor": 0,
                        "op": "Sync",
                        "value": 548864
            },
                    {
                        "major": 253,
                        "minor": 0,
                        "op": "Async",
                        "value": 1.36806e+006
            },
                    {
                        "major": 253,
                        "minor": 0,
                        "op": "Total",
                        "value": 1.91693e+006
            },
                    {
                        "major": 253,
                        "minor": 1,
                        "op": "Read",
                        "value": 5.78888e+007
            },
                    {
                        "major": 253,
                        "minor": 1,
                        "op": "Write",
                        "value": 1.81862e+006
            },
                    {
                        "major": 253,
                        "minor": 1,
                        "op": "Sync",
                        "value": 589824
            },
                    {
                        "major": 253,
                        "minor": 1,
                        "op": "Async",
                        "value": 5.91176e+007
            },
                    {
                        "major": 253,
                        "minor": 1,
                        "op": "Total",
                        "value": 5.97074e+007
            }
        ],
                "io_serviced_recursive": [
                    {
                        "major": 202,
                        "minor": 0,
                        "op": "Read",
                        "value": 37
            },
                    {
                        "major": 202,
                        "minor": 0,
                        "op": "Write",
                        "value": 950
            },
                    {
                        "major": 202,
                        "minor": 0,
                        "op": "Sync",
                        "value": 950
            },
                    {
                        "major": 202,
                        "minor": 0,
                        "op": "Async",
                        "value": 37
            },
                    {
                        "major": 202,
                        "minor": 0,
                        "op": "Total",
                        "value": 987
            },
                    {
                        "major": 7,
                        "minor": 0,
                        "op": "Read",
                        "value": 52
            },
                    {
                        "major": 7,
                        "minor": 0,
                        "op": "Write",
                        "value": 399
            },
                    {
                        "major": 7,
                        "minor": 0,
                        "op": "Sync",
                        "value": 133
            },
                    {
                        "major": 7,
                        "minor": 0,
                        "op": "Async",
                        "value": 318
            },
                    {
                        "major": 7,
                        "minor": 0,
                        "op": "Total",
                        "value": 451
            },
                    {
                        "major": 253,
                        "minor": 0,
                        "op": "Read",
                        "value": 52
            },
                    {
                        "major": 253,
                        "minor": 0,
                        "op": "Write",
                        "value": 399
            },
                    {
                        "major": 253,
                        "minor": 0,
                        "op": "Sync",
                        "value": 133
            },
                    {
                        "major": 253,
                        "minor": 0,
                        "op": "Async",
                        "value": 318
            },
                    {
                        "major": 253,
                        "minor": 0,
                        "op": "Total",
                        "value": 451
            },
                    {
                        "major": 253,
                        "minor": 1,
                        "op": "Read",
                        "value": 3254
            },
                    {
                        "major": 253,
                        "minor": 1,
                        "op": "Write",
                        "value": 443
            },
                    {
                        "major": 253,
                        "minor": 1,
                        "op": "Sync",
                        "value": 143
            },
                    {
                        "major": 253,
                        "minor": 1,
                        "op": "Async",
                        "value": 3554
            },
                    {
                        "major": 253,
                        "minor": 1,
                        "op": "Total",
                        "value": 3697
            }
        ],
                "io_queue_recursive": [],
                "io_service_time_recursive": [],
                "io_wait_time_recursive": [],
                "io_merged_recursive": [],
                "io_time_recursive": [],
                "sectors_recursive": []
            },
            "Host_DNS": "evo61.evolute.io",
            "Host_IP": "52.88.125.156",
            "LXC_Id": "2e64be9bb3bf1dff6796666d173b2f4b7092a68f5b0dc4d96eed02c8a523512e"
        });
    ContainerStats.insert({
        "read": new Date(),
        "network": {
            "rx_bytes": 0,
            "rx_packets": 0,
            "rx_errors": 0,
            "rx_dropped": 0,
            "tx_bytes": 0,
            "tx_packets": 0,
            "tx_errors": 0,
            "tx_dropped": 0
        },
        "precpu_stats": {
            "cpu_usage": {
                "total_usage": 14013444846695,
                "percpu_usage": [
                7854660132483,
                6158784714212
            ],
                "usage_in_kernelmode": 5287090000000,
                "usage_in_usermode": 3897270000000
            },
            "system_cpu_usage": 17262975860000000,
            "throttling_data": {
                "periods": 0,
                "throttled_periods": 0,
                "throttled_time": 0
            }
        },
        "cpu_stats": {
            "cpu_usage": {
                "total_usage": 14013445370098,
                "percpu_usage": [
                7852660521288,
                6158784848810
            ],
                "usage_in_kernelmode": 5287090000000,
                "usage_in_usermode": 3897270000000
            },
            "system_cpu_usage": 17262977850000000,
            "throttling_data": {
                "periods": 0,
                "throttled_periods": 0,
                "throttled_time": 0
            }
        },
        "memory_stats": {
            "usage": 1.85107e+009,
            "max_usage": 1.87249e+009,
            "stats": {
                "active_anon": 7.10533e+007,
                "active_file": 1.24097e+009,
                "cache": 1.78001e+009,
                "hierarchical_memory_limit": 9223372036854775807,
                "hierarchical_memsw_limit": 9223372036854775807,
                "inactive_anon": 0,
                "inactive_file": 5.39046e+008,
                "mapped_file": 1.2288e+007,
                "pgfault": 1.9088e+009,
                "pgmajfault": 217,
                "pgpgin": 7.06075e+008,
                "pgpgout": 7.05624e+008,
                "rss": 7.10533e+007,
                "rss_huge": 2.09715e+006,
                "swap": 0,
                "total_active_anon": 7.10533e+007,
                "total_active_file": 1.24097e+009,
                "total_cache": 1.78001e+009,
                "total_inactive_anon": 0,
                "total_inactive_file": 5.39046e+008,
                "total_mapped_file": 1.2288e+007,
                "total_pgfault": 1.9088e+009,
                "total_pgmajfault": 217,
                "total_pgpgin": 7.06075e+008,
                "total_pgpgout": 7.05624e+008,
                "total_rss": 7.10533e+007,
                "total_rss_huge": 2.09715e+006,
                "total_swap": 0,
                "total_unevictable": 0,
                "unevictable": 0
            },
            "failcnt": 0,
            "limit": 3706343424
        },
        "blkio_stats": {
            "io_service_bytes_recursive": [
                {
                    "major": 202,
                    "minor": 0,
                    "op": "Read",
                    "value": 3.93216e+006
            },
                {
                    "major": 202,
                    "minor": 0,
                    "op": "Write",
                    "value": 1.03264e+008
            },
                {
                    "major": 202,
                    "minor": 0,
                    "op": "Sync",
                    "value": 1.03264e+008
            },
                {
                    "major": 202,
                    "minor": 0,
                    "op": "Async",
                    "value": 3.93216e+006
            },
                {
                    "major": 202,
                    "minor": 0,
                    "op": "Total",
                    "value": 1.07196e+008
            },
                {
                    "major": 7,
                    "minor": 0,
                    "op": "Read",
                    "value": 278528
            },
                {
                    "major": 7,
                    "minor": 0,
                    "op": "Write",
                    "value": 1.6384e+006
            },
                {
                    "major": 7,
                    "minor": 0,
                    "op": "Sync",
                    "value": 548864
            },
                {
                    "major": 7,
                    "minor": 0,
                    "op": "Async",
                    "value": 1.36806e+006
            },
                {
                    "major": 7,
                    "minor": 0,
                    "op": "Total",
                    "value": 1.91693e+006
            },
                {
                    "major": 253,
                    "minor": 0,
                    "op": "Read",
                    "value": 278528
            },
                {
                    "major": 253,
                    "minor": 0,
                    "op": "Write",
                    "value": 1.6384e+006
            },
                {
                    "major": 253,
                    "minor": 0,
                    "op": "Sync",
                    "value": 548864
            },
                {
                    "major": 253,
                    "minor": 0,
                    "op": "Async",
                    "value": 1.36806e+006
            },
                {
                    "major": 253,
                    "minor": 0,
                    "op": "Total",
                    "value": 1.91693e+006
            },
                {
                    "major": 253,
                    "minor": 1,
                    "op": "Read",
                    "value": 5.78888e+007
            },
                {
                    "major": 253,
                    "minor": 1,
                    "op": "Write",
                    "value": 1.81862e+006
            },
                {
                    "major": 253,
                    "minor": 1,
                    "op": "Sync",
                    "value": 589824
            },
                {
                    "major": 253,
                    "minor": 1,
                    "op": "Async",
                    "value": 5.91176e+007
            },
                {
                    "major": 253,
                    "minor": 1,
                    "op": "Total",
                    "value": 5.97074e+007
            }
        ],
            "io_serviced_recursive": [
                {
                    "major": 202,
                    "minor": 0,
                    "op": "Read",
                    "value": 37
            },
                {
                    "major": 202,
                    "minor": 0,
                    "op": "Write",
                    "value": 950
            },
                {
                    "major": 202,
                    "minor": 0,
                    "op": "Sync",
                    "value": 950
            },
                {
                    "major": 202,
                    "minor": 0,
                    "op": "Async",
                    "value": 37
            },
                {
                    "major": 202,
                    "minor": 0,
                    "op": "Total",
                    "value": 987
            },
                {
                    "major": 7,
                    "minor": 0,
                    "op": "Read",
                    "value": 52
            },
                {
                    "major": 7,
                    "minor": 0,
                    "op": "Write",
                    "value": 399
            },
                {
                    "major": 7,
                    "minor": 0,
                    "op": "Sync",
                    "value": 133
            },
                {
                    "major": 7,
                    "minor": 0,
                    "op": "Async",
                    "value": 318
            },
                {
                    "major": 7,
                    "minor": 0,
                    "op": "Total",
                    "value": 451
            },
                {
                    "major": 253,
                    "minor": 0,
                    "op": "Read",
                    "value": 52
            },
                {
                    "major": 253,
                    "minor": 0,
                    "op": "Write",
                    "value": 399
            },
                {
                    "major": 253,
                    "minor": 0,
                    "op": "Sync",
                    "value": 133
            },
                {
                    "major": 253,
                    "minor": 0,
                    "op": "Async",
                    "value": 318
            },
                {
                    "major": 253,
                    "minor": 0,
                    "op": "Total",
                    "value": 451
            },
                {
                    "major": 253,
                    "minor": 1,
                    "op": "Read",
                    "value": 3254
            },
                {
                    "major": 253,
                    "minor": 1,
                    "op": "Write",
                    "value": 443
            },
                {
                    "major": 253,
                    "minor": 1,
                    "op": "Sync",
                    "value": 143
            },
                {
                    "major": 253,
                    "minor": 1,
                    "op": "Async",
                    "value": 3554
            },
                {
                    "major": 253,
                    "minor": 1,
                    "op": "Total",
                    "value": 3697
            }
        ],
            "io_queue_recursive": [],
            "io_service_time_recursive": [],
            "io_wait_time_recursive": [],
            "io_merged_recursive": [],
            "io_time_recursive": [],
            "sectors_recursive": []
        },
        "Host_DNS": "evo61.evolute.io",
        "Host_IP": "52.88.125.156",
        "LXC_Id": "2e64be9bb3bf1dff6796666d173b2f4b7092a68f5b0dc4d96eed02c8a523512e"
    });
    ContainerStats.insert({
        "read": new Date(),
        "network": {
            "rx_bytes": 0,
            "rx_packets": 0,
            "rx_errors": 0,
            "rx_dropped": 0,
            "tx_bytes": 0,
            "tx_packets": 0,
            "tx_errors": 0,
            "tx_dropped": 0
        },
        "precpu_stats": {
            "cpu_usage": {
                "total_usage": 14013444846695,
                "percpu_usage": [
                7854660132483,
                6158784714212
            ],
                "usage_in_kernelmode": 5287090000000,
                "usage_in_usermode": 3897270000000
            },
            "system_cpu_usage": 17262975860000000,
            "throttling_data": {
                "periods": 0,
                "throttled_periods": 0,
                "throttled_time": 0
            }
        },
        "cpu_stats": {
            "cpu_usage": {
                "total_usage": 14013445370098,
                "percpu_usage": [
                7853660521288,
                6158784848810
            ],
                "usage_in_kernelmode": 5287090000000,
                "usage_in_usermode": 3897270000000
            },
            "system_cpu_usage": 17262977850000000,
            "throttling_data": {
                "periods": 0,
                "throttled_periods": 0,
                "throttled_time": 0
            }
        },
        "memory_stats": {
            "usage": 1.82107e+009,
            "max_usage": 1.87249e+009,
            "stats": {
                "active_anon": 7.10533e+007,
                "active_file": 1.24097e+009,
                "cache": 1.78001e+009,
                "hierarchical_memory_limit": 9223372036854775807,
                "hierarchical_memsw_limit": 9223372036854775807,
                "inactive_anon": 0,
                "inactive_file": 5.39046e+008,
                "mapped_file": 1.2288e+007,
                "pgfault": 1.9088e+009,
                "pgmajfault": 217,
                "pgpgin": 7.06075e+008,
                "pgpgout": 7.05624e+008,
                "rss": 7.10533e+007,
                "rss_huge": 2.09715e+006,
                "swap": 0,
                "total_active_anon": 7.10533e+007,
                "total_active_file": 1.24097e+009,
                "total_cache": 1.78001e+009,
                "total_inactive_anon": 0,
                "total_inactive_file": 5.39046e+008,
                "total_mapped_file": 1.2288e+007,
                "total_pgfault": 1.9088e+009,
                "total_pgmajfault": 217,
                "total_pgpgin": 7.06075e+008,
                "total_pgpgout": 7.05624e+008,
                "total_rss": 7.10533e+007,
                "total_rss_huge": 2.09715e+006,
                "total_swap": 0,
                "total_unevictable": 0,
                "unevictable": 0
            },
            "failcnt": 0,
            "limit": 3706343424
        },
        "blkio_stats": {
            "io_service_bytes_recursive": [
                {
                    "major": 202,
                    "minor": 0,
                    "op": "Read",
                    "value": 3.93216e+006
            },
                {
                    "major": 202,
                    "minor": 0,
                    "op": "Write",
                    "value": 1.03264e+008
            },
                {
                    "major": 202,
                    "minor": 0,
                    "op": "Sync",
                    "value": 1.03264e+008
            },
                {
                    "major": 202,
                    "minor": 0,
                    "op": "Async",
                    "value": 3.93216e+006
            },
                {
                    "major": 202,
                    "minor": 0,
                    "op": "Total",
                    "value": 1.07196e+008
            },
                {
                    "major": 7,
                    "minor": 0,
                    "op": "Read",
                    "value": 278528
            },
                {
                    "major": 7,
                    "minor": 0,
                    "op": "Write",
                    "value": 1.6384e+006
            },
                {
                    "major": 7,
                    "minor": 0,
                    "op": "Sync",
                    "value": 548864
            },
                {
                    "major": 7,
                    "minor": 0,
                    "op": "Async",
                    "value": 1.36806e+006
            },
                {
                    "major": 7,
                    "minor": 0,
                    "op": "Total",
                    "value": 1.91693e+006
            },
                {
                    "major": 253,
                    "minor": 0,
                    "op": "Read",
                    "value": 278528
            },
                {
                    "major": 253,
                    "minor": 0,
                    "op": "Write",
                    "value": 1.6384e+006
            },
                {
                    "major": 253,
                    "minor": 0,
                    "op": "Sync",
                    "value": 548864
            },
                {
                    "major": 253,
                    "minor": 0,
                    "op": "Async",
                    "value": 1.36806e+006
            },
                {
                    "major": 253,
                    "minor": 0,
                    "op": "Total",
                    "value": 1.91693e+006
            },
                {
                    "major": 253,
                    "minor": 1,
                    "op": "Read",
                    "value": 5.78888e+007
            },
                {
                    "major": 253,
                    "minor": 1,
                    "op": "Write",
                    "value": 1.81862e+006
            },
                {
                    "major": 253,
                    "minor": 1,
                    "op": "Sync",
                    "value": 589824
            },
                {
                    "major": 253,
                    "minor": 1,
                    "op": "Async",
                    "value": 5.91176e+007
            },
                {
                    "major": 253,
                    "minor": 1,
                    "op": "Total",
                    "value": 5.97074e+007
            }
        ],
            "io_serviced_recursive": [
                {
                    "major": 202,
                    "minor": 0,
                    "op": "Read",
                    "value": 37
            },
                {
                    "major": 202,
                    "minor": 0,
                    "op": "Write",
                    "value": 950
            },
                {
                    "major": 202,
                    "minor": 0,
                    "op": "Sync",
                    "value": 950
            },
                {
                    "major": 202,
                    "minor": 0,
                    "op": "Async",
                    "value": 37
            },
                {
                    "major": 202,
                    "minor": 0,
                    "op": "Total",
                    "value": 987
            },
                {
                    "major": 7,
                    "minor": 0,
                    "op": "Read",
                    "value": 52
            },
                {
                    "major": 7,
                    "minor": 0,
                    "op": "Write",
                    "value": 399
            },
                {
                    "major": 7,
                    "minor": 0,
                    "op": "Sync",
                    "value": 133
            },
                {
                    "major": 7,
                    "minor": 0,
                    "op": "Async",
                    "value": 318
            },
                {
                    "major": 7,
                    "minor": 0,
                    "op": "Total",
                    "value": 451
            },
                {
                    "major": 253,
                    "minor": 0,
                    "op": "Read",
                    "value": 52
            },
                {
                    "major": 253,
                    "minor": 0,
                    "op": "Write",
                    "value": 399
            },
                {
                    "major": 253,
                    "minor": 0,
                    "op": "Sync",
                    "value": 133
            },
                {
                    "major": 253,
                    "minor": 0,
                    "op": "Async",
                    "value": 318
            },
                {
                    "major": 253,
                    "minor": 0,
                    "op": "Total",
                    "value": 451
            },
                {
                    "major": 253,
                    "minor": 1,
                    "op": "Read",
                    "value": 3254
            },
                {
                    "major": 253,
                    "minor": 1,
                    "op": "Write",
                    "value": 443
            },
                {
                    "major": 253,
                    "minor": 1,
                    "op": "Sync",
                    "value": 143
            },
                {
                    "major": 253,
                    "minor": 1,
                    "op": "Async",
                    "value": 3554
            },
                {
                    "major": 253,
                    "minor": 1,
                    "op": "Total",
                    "value": 3697
            }
        ],
            "io_queue_recursive": [],
            "io_service_time_recursive": [],
            "io_wait_time_recursive": [],
            "io_merged_recursive": [],
            "io_time_recursive": [],
            "sectors_recursive": []
        },
        "Host_DNS": "evo61.evolute.io",
        "Host_IP": "52.88.125.156",
        "LXC_Id": "2e64be9bb3bf1dff6796666d173b2f4b7092a68f5b0dc4d96eed02c8a523512e"
    });
})