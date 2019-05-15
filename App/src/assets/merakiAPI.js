function getPolicy(network_id, clientMAC, apiKey){ 
    var data = null;

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === 4) {
    console.log(this.response);
    return this.responseText; 
    
  }
});

xhr.open("GET", "https://api.meraki.com/api/v0/networks/" + network_id + "/clients/" + clientMAC + "/policy?timespan=84000");
xhr.setRequestHeader("X-Cisco-Meraki-API-Key", apiKey);
xhr.setRequestHeader("cache-control", "no-cache");
xhr.setRequestHeader("Postman-Token", "42d71a55-73d8-4b7b-91f2-15ccbf9f3565");

xhr.send(data);
}

function getClients(){
    var data = null;

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === 4) {
    console.log(this.responseText);
  }
});

xhr.open("GET", "https://api.meraki.com/api/v0/devices/Q2HW-CV5L-5FXH/clients?timespan=86400");
xhr.setRequestHeader("X-Cisco-Meraki-API-Key", "611a8ceeedb0c36716a5125c46cd7f3ba760d465");
xhr.setRequestHeader("User-Agent", "PostmanRuntime/7.11.0");
xhr.setRequestHeader("Accept", "*/*");
xhr.setRequestHeader("Cache-Control", "no-cache");
xhr.setRequestHeader("Postman-Token", "ba568848-cd02-495e-8a8d-0d48a39bc800,3f247166-1d05-4e62-b116-bfeaccd06f25");
xhr.setRequestHeader("accept-encoding", "gzip, deflate");
xhr.setRequestHeader("referer", "https://api.meraki.com/api/v0/devices/Q2HW-CV5L-5FXH/clients?timespan=86400");
xhr.setRequestHeader("Connection", "keep-alive");
xhr.setRequestHeader("cache-control", "no-cache");

xhr.send(data);
}

function getDevices(network_id, apiKey){
    var data = null;

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === 4) {
    console.log(this.responseText);
    return this.responseText; 
  }
});

xhr.open("GET", "https://api.meraki.com/api/v0/networks/" + network_id + "/devices");
xhr.setRequestHeader("X-Cisco-Meraki-API-Key", apiKey);
xhr.setRequestHeader("User-Agent", "PostmanRuntime/7.11.0");
xhr.setRequestHeader("Accept", "*/*");
xhr.setRequestHeader("Cache-Control", "no-cache");
xhr.setRequestHeader("Postman-Token", "8d4aa7a9-a6ae-49a2-9ce2-486f87124736,e5f7899b-1b6b-4070-9d46-749df3019012");
xhr.setRequestHeader("accept-encoding", "gzip, deflate");
xhr.setRequestHeader("referer", "https://api.meraki.com/api/v0/networks/L_647955396387940893/devices");
xhr.setRequestHeader("Connection", "keep-alive");
xhr.setRequestHeader("cache-control", "no-cache");

xhr.send(data);

}

function blockClient(network_id, clientMAC, apiKey) {
    var data = null;
  
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    
    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        console.log(this.responseText);
      }
    });
    
    xhr.open("PUT", "https://api.meraki.com/api/v0/networks/"+network_id + "/clients/" + clientMAC + "/policy?timespan=2592000&devicePolicy=Blocked");
    xhr.setRequestHeader("X-Cisco-Meraki-API-Key", apiKey);
    xhr.setRequestHeader("User-Agent", "PostmanRuntime/7.11.0");
    xhr.setRequestHeader("Accept", "*/*");
    xhr.setRequestHeader("Cache-Control", "no-cache");
    xhr.setRequestHeader("Postman-Token", "77b44c5c-2b1c-40d0-9e34-a8850b9a1e96,aff70c95-53d7-4630-8d69-137a2f2e5a19");
    xhr.setRequestHeader("accept-encoding", "gzip, deflate");
    xhr.setRequestHeader("content-length", "");
    xhr.setRequestHeader("referer", "https://api.meraki.com/api/v0/networks/"+network_id + "/clients/" + clientMAC + "/policy?timespan=2592000&devicePolicy=Blocked");
    xhr.setRequestHeader("Connection", "keep-alive");
    xhr.setRequestHeader("cache-control", "no-cache");
    
    xhr.send(data);
  }; 

  function allowClient(network_id, clientMAC, apiKey) {
    var data = null;
  
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    
    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        console.log(this.responseText);
      }
    });
    
    xhr.open("PUT", "https://api.meraki.com/api/v0/networks/"+network_id + "/clients/" + clientMAC + "/policy?timespan=2592000&devicePolicy=Normal");
    xhr.setRequestHeader("X-Cisco-Meraki-API-Key", apiKey);
    xhr.setRequestHeader("User-Agent", "PostmanRuntime/7.11.0");
    xhr.setRequestHeader("Accept", "*/*");
    xhr.setRequestHeader("Cache-Control", "no-cache");
    xhr.setRequestHeader("Postman-Token", "77b44c5c-2b1c-40d0-9e34-a8850b9a1e96,aff70c95-53d7-4630-8d69-137a2f2e5a19");
    xhr.setRequestHeader("accept-encoding", "gzip, deflate");
    xhr.setRequestHeader("content-length", "");
    xhr.setRequestHeader("referer", "https://api.meraki.com/api/v0/networks/"+network_id + "/clients/" + clientMAC + "/policy?timespan=2592000&devicePolicy=Normal");
    xhr.setRequestHeader("Connection", "keep-alive");
    xhr.setRequestHeader("cache-control", "no-cache");
    
    xhr.send(data);
  }; 

