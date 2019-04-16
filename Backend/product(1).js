const mongoose = require('mongoose');


const jmmnSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    deviceid: Number,
    usage: Number,
    description: String,
    mdnsName: String,
    dhcpHostname: String,
    mac: String,
    ip: String,
    vlan: Number
    },

);

module.exports = mongoose.model('Meraki', jmmnSchema)
