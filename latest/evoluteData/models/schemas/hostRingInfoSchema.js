"use strict";
const mongoose = require('mongoose');

const hostRingInfoSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId
  },
  hostRingId: {
    type: String
  },
  hostRingName: {
    type: String
  }
});
console.log("Host Ring Info Schema Loaded")
module.exports = hostRingInfoSchema;
