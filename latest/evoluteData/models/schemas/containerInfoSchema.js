const mongoose = require('mongoose');

const containerInfoSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'lxc_id'
  },
  lxc_id: {
    type: String
  },
  dns_name: {
    type: String
  },
  ip_addr: {
    type: String
  },
  ReadTime: {
    type: Date
  },
  Names: {
    type: Array,
    "assigned_name": []
  },
  Image: {
    type: String
  },
  Command: {
    type: String
  },
  Created: {
    type: Number
  },
  Ports: {
    type: Array,
    "port_numbers": []
  },
  Labels: {
    Labels: Object
  },
  Status: {
    type: String
  }
});

module.exports = containerInfoSchema;
