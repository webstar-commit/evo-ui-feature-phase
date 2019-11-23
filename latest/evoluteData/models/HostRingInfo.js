"use strict";
const mongoose = require('mongoose');
const hostRingInfoSchema = require('./schemas/hostRingInfoSchema');
const HostRingInfo = mongoose.model('hostRing_infos', hostRingInfoSchema,'hostRing_infos');
//const HostRingInfo = mongoose.model('hostRing_infos', hostRingInfoSchema);
module.exports = HostRingInfo;

console.log("Host Ring Info Model Loaded")