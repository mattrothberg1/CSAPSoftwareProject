'use strict';

const axios = require('axios');
const JSONbig = require('json-bigint');
const expect = require('chai').expect;
const databaseAPI = require('./databaseAPI');

//databaseAPI.getClients("N_600667600300592773", "314d5556e649ecfc77d1d08450daa571608be6d1");
//databaseAPI.blockClient("N_600667600300592773", "10:4f:a8:d6:ec:73", "314d5556e649ecfc77d1d08450daa571608be6d1");
//console.log(databaseAPI.getClientPolicy("N_600667600300592773", "10:4f:a8:d6:ec:73", "314d5556e649ecfc77d1d08450daa571608be6d1"));
//console.log(clientPolicy);
let block = {
    //"timespan" : "2592000",
    "devicePolicy": "Whitelisted",

};
/*
var http = require("https");

var options = {
  method: "PUT",
  hostname : "n67.meraki.com",
  path : "/api/v0/networks/N_600667600300592773/clients/10:4f:a8:d6:ec:73/policy?timespan=2592000&devicePolicy=Normal",
  headers: {
    "X-Cisco-Meraki-API-Key" : "314d5556e649ecfc77d1d08450daa571608be6d1",
    "cache-control" : "no-cache",
    "Postman-Token" : "9bdbe493-2b35-4675-b4bf-11fe299fc7a8"
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
*/

databaseAPI.blockClient("N_600667600300592773", "10:4f:a8:d6:ec:73", "314d5556e649ecfc77d1d08450daa571608be6d1");
databaseAPI.getClientPolicy("N_600667600300592773", "10:4f:a8:d6:ec:73", "314d5556e649ecfc77d1d08450daa571608be6d1").then(function(e){
  console.log("Client policy is: ");
  console.log(e.type); //E is what we're using
});
