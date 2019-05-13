const expect = require('chai').expect;
const MerakiDashboard = require('../../src/index');

function blockClient1(network_id, clientMAC, apiKey, block) {
  var data = null;

  var xhr = new XMLHttpRequest();
  xhr.withCredentials = true;
  
  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
      console.log(this.responseText);
    }
  });
  
  xhr.open("PUT", "https://api.meraki.com/api/v0/networks/L_647955396387940893/clients/" + clientMAC + "/policy?timespan=2592000&devicePolicy=Blocked");
  xhr.setRequestHeader("X-Cisco-Meraki-API-Key", "611a8ceeedb0c36716a5125c46cd7f3ba760d465");
  xhr.setRequestHeader("User-Agent", "PostmanRuntime/7.11.0");
  xhr.setRequestHeader("Accept", "*/*");
  xhr.setRequestHeader("Cache-Control", "no-cache");
  xhr.setRequestHeader("Postman-Token", "77b44c5c-2b1c-40d0-9e34-a8850b9a1e96,aff70c95-53d7-4630-8d69-137a2f2e5a19");
  xhr.setRequestHeader("accept-encoding", "gzip, deflate");
  xhr.setRequestHeader("content-length", "");
  xhr.setRequestHeader("referer", "https://api.meraki.com/api/v0/networks/L_647955396387940893/clients/" + clientMAC + "/policy?timespan=2592000&devicePolicy=Blocked");
  xhr.setRequestHeader("Connection", "keep-alive");
  xhr.setRequestHeader("cache-control", "no-cache");
  
  xhr.send(data);
}; 
  
function allowClient1(network_id, clientMAC, apiKey, block) {
  var data = null;

  var xhr = new XMLHttpRequest();
  xhr.withCredentials = true;
  
  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
      console.log(this.responseText);
    }
  });
  
  xhr.open("PUT", "https://api.meraki.com/api/v0/networks/L_647955396387940893/clients/" + clientMAC + "/policy?timespan=2592000&devicePolicy=Normal");
  xhr.setRequestHeader("X-Cisco-Meraki-API-Key", "611a8ceeedb0c36716a5125c46cd7f3ba760d465");
  xhr.setRequestHeader("User-Agent", "PostmanRuntime/7.11.0");
  xhr.setRequestHeader("Accept", "*/*");
  xhr.setRequestHeader("Cache-Control", "no-cache");
  xhr.setRequestHeader("Postman-Token", "77b44c5c-2b1c-40d0-9e34-a8850b9a1e96,aff70c95-53d7-4630-8d69-137a2f2e5a19");
  xhr.setRequestHeader("accept-encoding", "gzip, deflate");
  xhr.setRequestHeader("content-length", "");
  xhr.setRequestHeader("referer", "https://api.meraki.com/api/v0/networks/L_647955396387940893/clients/" + clientMAC + "/policy?timespan=2592000&devicePolicy=Normal");
  xhr.setRequestHeader("Connection", "keep-alive");
  xhr.setRequestHeader("cache-control", "no-cache");
  
  xhr.send(data);
}; 

function blockClient (network_id, clientMAC, apiKey, test){

  var http = require("https");

  var options = {
    method: "PUT",
    hostname : "n67.meraki.com",
    path : "/api/v0/networks/"+network_id+"/clients/"+clientMAC+"/policy?timespan=2592000&devicePolicy=Blocked",
    headers: {
      "X-Cisco-Meraki-API-Key" : apiKey,
      "cache-control" : "no-cache",
    }
  };

  var req = http.request(options, function (res) {
    var chunks = [];

    res.on("data", function (chunk) {
      chunks.push(chunk);
    });

    res.on("end", function () {
      var body = Buffer.concat(chunks);
      console.log(body.toString());
    });
  });

  req.end();
}

module.exports = {
  test : function test(text){
    console.log(text);
  },

  getClients : function getClients(network_id,apiKey){
    let dashboard = MerakiDashboard(apiKey);
    var devices = new Array();
    var clients = new Array();
    var lldpDevices = new Array();
    dashboard.devices.list(network_id).then(function(result) { //this is parsing devices
      var arrayLength = result.length;
      for(var i = 0; i<arrayLength; i++){
        devices.push(result[i].serial);
      }
      for(var x = 0; x < devices.length; x++){
        dashboard.clients.list(devices[x], "86400").then(function(clients) {
          return clients;
          /*
          var arrayLength1 = clients.length;
          for(var i = 0; i<arrayLength1; i++){ //this is taking the clients attached to each device
            clients.push(clients[i]);
            
            console.log(clients[i].id);
            console.log("Description: "+clients[i].description);
            console.log("MAC Address: "+clients[i].mac);
            console.log("VLAN: "+clients[i].vlan);
            console.log("mdns name: "+clients[i].mdnsName);
            console.log("DHCP Hostname: "+clients[i].dhcpHostname);
            console.log("IP Address: "+clients[i].ip);
            console.log("-----------------");
            //console.log(result[i].serial) // "Some User token"
          }
          return clients;*/
        })  .catch(function(e){
          //console.log("Error: " + e);
        });
      }


    })
  },

  blockClient : function blockClient (network_id, clientMAC, apiKey){

    var http = require("https");

    var options = {
      method: "PUT",
      hostname : "n67.meraki.com",
      path : "/api/v0/networks/"+network_id+"/clients/"+clientMAC+"/policy?timespan=2592000&devicePolicy=Blocked",
      headers: {
        "X-Cisco-Meraki-API-Key" : apiKey,
        "cache-control" : "no-cache",
      }
    };

    var req = http.request(options, function (res) {
      var chunks = [];

      res.on("data", function (chunk) {
        chunks.push(chunk);
      });

      res.on("end", function () {
        var body = Buffer.concat(chunks);
        console.log(body.toString());
      });
    });

    req.end();
  },
  blockClient1 : (network_id, clientMAC, apiKey, block) => MerakiDashboard(apiKey).clients.updatePolicy(network_id, clientMAC, block)
  ,

  getClientPolicy : (network_id, clientMAC, apiKey) => MerakiDashboard(apiKey).clients.getPolicy(network_id, clientMAC, "86400"),

  allowClient : function allowClient (network_id, clientMAC, apiKey){

    var http = require("https");

    var options = {
      method: "PUT",
      hostname : "n67.meraki.com",
      path : "/api/v0/networks/"+network_id+"/clients/"+clientMAC+"/policy?timespan=2592000&devicePolicy=Normal",
      headers: {
        "X-Cisco-Meraki-API-Key" : apiKey,
        "cache-control" : "no-cache",
      }
    };

    var req = http.request(options, function (res) {
      var chunks = [];

      res.on("data", function (chunk) {
        chunks.push(chunk);
      });

      res.on("end", function () {
        var body = Buffer.concat(chunks);
        console.log(body.toString());
      });
    });

    req.end();
  },
};
