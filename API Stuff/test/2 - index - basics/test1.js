'use strict';
const MerakiDashboard = require('../../src/index');
const expect = require('chai').expect; //???
const MattsAPI = "611a8ceeedb0c36716a5125c46cd7f3ba760d465";
const tempNetID = "L_647955396387940893";
let dashboard = MerakiDashboard(MattsAPI);
var devices = new Array();
var clients = new Array();
var lldpDevices = new Array();
//we are creating an array here that lists the serials of all the devices.
//we want to use this to pass into the 'list clients' function to get all the clients
//console.log(dashboard.devices.list(tempNetID));
dashboard.devices.list(tempNetID).then(function(result) { //this is parsing devices
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
    dashboard.devices.lldpCdpInfo(tempNetID, devices[x], "86400").then(function(lldpDevices){
      var arrayLength1 = lldpDevices.length;
      console.log(lldpDevices.ports);
    }) .catch(function(e){
      console.log("Error: " + e);
    });

  }


})
//console.log(devices);
