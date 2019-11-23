const mongoose = require('mongoose');

const containerStatSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId
  },
  read: {
    type: Date
  },
  network: {
    type: Object
  },
  precpu_stats: [{
    cpu_usage: [{
      total_usage: {
        type: String
      },
      percpu_usage: [{
        type: String
      }],
      usage_in_kernelmode: {
        type: String
      },
      usage_in_usermode: {
        type: String
      },
      system_cpu_usage: {
        type: String
      },
      throttling_data: [{
        periods: {
          type: Number
        },
        throttled_periods: {
          type: Number
        },
        throttled_time: {
          type: Date
        }
      }]
    }]

  }],
  cpu_stats: [{
    cpu_usage: [{
      total_usage: {
        type: String
      },
      percpu_usage: [{
        type: String
      }],
      usage_in_kernelmode: {
        type: String
      },
      usage_in_usermode: {
        type: String
      },
      system_cpu_usage: {
        type: String
      },
      throttling_data: [{
        periods: {
          type: Number
        },
        throttled_periods: {
          type: Number
        },
        throttled_time: {
          type: Date
        }
      }]
    }]

  }],
  memory_stats: [{
    usage: {
      type: Number
    },
    max_usage: {
      type: Number
    },
    stats: [{
      active_anon: Number,
      active_file: Number,
      cache: Number,
      hierarchical_memory_limit: {
        type: String
      },
      hierarchical_memsw_limit: {
        type: String
      },
      inactive_anon: Number,
      inactive_file: Number,
      mapped_file: Number,
      pgfault: Number,
      pgmajfault: Number,
      pgpgin: Number,
      pgpgout: Number,
      rss: Number,
      rss_huge: Number,
      swap: Number,
      total_active_anon: Number,
      total_active_file: Number,
      total_cache: Number,
      total_inactive_anon: Number,
      total_inactive_file: Number,
      total_mapped_file: Number,
      total_pgfault: Number,
      total_pgmajfault: Number,
      total_pgpgin: Number,
      total_pgpgout: Number,
      total_rss: Number,
      total_rss_huge: Number,
      total_swap: 0,
      total_unevictable: Number,
      unevictable: Number
    }],
    failcnt: Number,
    limit: {
      type: String
    }
  }],
  blkio_stats: [{
    io_service_bytes_recursive: [{
      major: Number,
      minor: Number,
      op: String,
      value: Number
    }],
    io_serviced_recursive: [{
      major: Number,
      minor: Number,
      op: String,
      value: Number
    }],
    io_queue_recursive: {
      type: Array
    },
    io_service_time_recursive: {
      type: Array
    },
    io_wait_time_recursive: {
      type: Array
    },
    io_merged_recursive: {
      type: Array
    },
    io_time_recursive: {
      type: Array
    },
    sectors_recursive: {
      type: Array
    }
  }],
  host: {
    node: String,
    address: String
  },
  container: {
    id: String,
    name: String,
    image: String,
    command: String
  },
  lxc_id: {
    type: String
  }
});

module.exports = containerStatSchema;
