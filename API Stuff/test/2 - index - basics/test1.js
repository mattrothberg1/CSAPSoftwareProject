'use strict';
const MerakiDashboard = require('../../src/index');
const expect = require('chai').expect; //???
const MattsAPI = "611a8ceeedb0c36716a5125c46cd7f3ba760d465";
const mattNetworkID = "L_647955396387940893";
const chrisAPI = "314d5556e649ecfc77d1d08450daa571608be6d1";
const chrisOrg = "169102";
const chrisNetworkID = "N_600667600300592773";
var currentNetworkID = chrisNetworkID; //set the current network here
var currentAPI = chrisAPI; //set the current API key here
let dashboard = MerakiDashboard(currentAPI);
var devices = new Array();
var clients = new Array();
var lldpDevices = new Array();

//we are creating an array here that lists the serials of all the devices.
//we want to use this to pass into the 'list clients' function to get all the clients
//console.log(dashboard.devices.list(mattNetworkID));
dashboard.devices.list(currentNetworkID).then(function(result) { //this is parsing devices
  var arrayLength = result.length;
  for(var i = 0; i<arrayLength; i++){
    devices.push(result[i].serial);
    //console.log(result[i].serial) // "Some User token"
  }
  for(var x = 0; x < devices.length; x++){
    //console.log(devices[x]);
    /*
    dashboard.clients.list(devices[x], "86400").then(function(clients) {
      var arrayLength1 = clients.length;

      for(var i = 0; i<arrayLength1; i++){ //this is taking the clients attached to each device
        clients.push(clients[i].dhcpHostname);
        console.log(clients[i].dhcpHostname);
        //console.log(result[i].serial) // "Some User token"
      }
    })  .catch(function(e){
      console.log("Error: " + e);
    });*/
    dashboard.devices.lldpCdpInfo(currentNetworkID, devices[x], "86400").then(function(lldpDevices){
      var arrayLength1 = lldpDevices.length;
      console.log(lldpDevices.ports);
    }) .catch(function(e){
      console.log("Error: " + e);
    });

  }


})
//console.log(devices);
