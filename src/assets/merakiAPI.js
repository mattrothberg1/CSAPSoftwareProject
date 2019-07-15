 function getNameofPolicy(groupPolicyId, network_id, apiKey){
  
  return new Promise(resolve => {
    var data = null;

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    
    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        console.log(this.responseText);
        var obj = JSON.parse(this.responseText);
        for(var x = 0; x < obj.length; x++){
          console.log("PRINTING POLICY NUMBER: " + x + " AND THE INFO IS: " + obj[x].groupPolicyId + " AND WE ARE SEARCHING FOR: " + groupPolicyId);
          if(obj[x].groupPolicyId === groupPolicyId){
            console.log("GROUP POLICY FOUND IS: " + obj[x].name);
            resolve(obj[x].name); 
          }
        }
        
      }
    });

    xhr.open("GET", "https://api.meraki.com/api/v0/networks/" + network_id + "/groupPolicies");
    xhr.setRequestHeader("X-Cisco-Meraki-API-Key", apiKey);
    xhr.setRequestHeader("User-Agent", "PostmanRuntime/7.15.0");
    xhr.setRequestHeader("Accept", "*/*");
    xhr.setRequestHeader("Cache-Control", "no-cache");
    xhr.setRequestHeader("Postman-Token", "1ed85d26-fb27-4556-af77-54b1a84e3f13,3832de1c-4c28-4ee7-bc6a-0566b748707f");
    xhr.setRequestHeader("accept-encoding", "gzip, deflate");
    xhr.setRequestHeader("referer", "https://api.meraki.com/api/v0/networks/" + network_id + "/groupPolicies");
    xhr.setRequestHeader("Connection", "keep-alive");
    xhr.setRequestHeader("cache-control", "no-cache");
    
    xhr.send(data);
  });
 }
 //----------------------------------------------------------------------------------------------
function setPolicy(groupPolicyId, client_mac, network_id, apiKey){

    var data = null;

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === 4) {
    console.log(this.responseText);
  }
});

xhr.open("PUT", "https://api.meraki.com/api/v0/networks/" + network_id + "/clients/" + client_mac + "/policy?devicePolicy=group&groupPolicyId=" + groupPolicyId + "&timespan=2592000");
xhr.setRequestHeader("X-Cisco-Meraki-API-Key", apiKey);
xhr.setRequestHeader("Content-Type", "application/json");
xhr.setRequestHeader("User-Agent", "PostmanRuntime/7.15.0");
xhr.setRequestHeader("Accept", "*/*");
xhr.setRequestHeader("Cache-Control", "no-cache");
xhr.setRequestHeader("Postman-Token", "474f9f18-3fd9-4a80-a99e-0349a22930f0,6d954a9e-f727-47a3-a556-ece46d7f5526");
xhr.setRequestHeader("accept-encoding", "gzip, deflate");
xhr.setRequestHeader("content-length", "");
xhr.setRequestHeader("referer", "https://api.meraki.com/api/v0/networks/" + network_id + "/clients/" + client_mac + "/policy?devicePolicy=group&groupPolicyId=" + groupPolicyId+ " &timespan=2592000");
xhr.setRequestHeader("Connection", "keep-alive");
xhr.setRequestHeader("cache-control", "no-cache");

xhr.send(data);

}

//----------------------------------------------------------------------------------------------
 // get Policy List grabs the list of all the policies from Meraki with the specific networdID and API Key 
 //------------------------------------------------------------------
 function getPolicyList (networkID, apiKey, i){
  var data = null;

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === 4) {
    var obj = JSON.parse(this.responseText);
    var text = "";
    for(var x = 0; x < obj.length; x++){
      text += "Group Policy ID (copy this into text box): ";
      text += obj[x].groupPolicyId; 
      text += "\nGroup Policy Name: "; 
      text += obj[x].name;
      text +="\n---------------\n"; 

    }
    alert(text);
  }
});

xhr.open("GET", "https://api.meraki.com/api/v0/networks/"+networkID+"/groupPolicies");
xhr.setRequestHeader("X-Cisco-Meraki-API-Key", apiKey);
xhr.setRequestHeader("User-Agent", "PostmanRuntime/7.15.0");
xhr.setRequestHeader("Accept", "*/*");
xhr.setRequestHeader("Cache-Control", "no-cache");
xhr.setRequestHeader("Postman-Token", "3600c45b-53bf-4d26-aedd-2cf3e7925b38,3e4cfac0-0640-4822-9db6-208aa57f44a1");
xhr.setRequestHeader("accept-encoding", "gzip, deflate");
xhr.setRequestHeader("referer", "https://api.meraki.com/api/v0/networks/"+networkID+"/groupPolicies");
xhr.setRequestHeader("Connection", "keep-alive");
xhr.setRequestHeader("cache-control", "no-cache");

xhr.send(data);
}
 //------------------------------------------------------------------


 async function getPolicy(network_id, clientMAC, apiKey, index){ 
 
  return new Promise(resolve => {
    setTimeout(function() {
      console.log("HELLO");

   var data = null;

   var xhr = new XMLHttpRequest();
   xhr.withCredentials = true;
   
   xhr.addEventListener("readystatechange", function () {
     if (this.readyState === 4) {
       console.log(this.response);
       var obj = JSON.parse(this.responseText);
        resolve(obj);
     }
   });
   
   xhr.open("GET", "https://api.meraki.com/api/v0/networks/" + network_id + "/clients/" + clientMAC + "/policy?timespan=84000");
   xhr.setRequestHeader("X-Cisco-Meraki-API-Key", apiKey);
   xhr.setRequestHeader("cache-control", "no-cache");
   xhr.setRequestHeader("Postman-Token", "42d71a55-73d8-4b7b-91f2-15ccbf9f3565");
   
   xhr.send(data);
   },index*500);
 
   console.log('got the policy for client mac address of: ' + clientMAC);

  });


}

function getClients(deviceID, apiKey){

  return new Promise(resolve => {
    var data = null; 

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    
    xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
      console.log(this.response);
      var obj = JSON.parse(this.responseText);
      resolve(obj); 
    }
    });
    
    xhr.open("GET", "https://api.meraki.com/api/v0/devices/" + deviceID + "/clients?timespan=86400");
    xhr.setRequestHeader("X-Cisco-Meraki-API-Key", apiKey);
    xhr.setRequestHeader("User-Agent", "PostmanRuntime/7.11.0");
    xhr.setRequestHeader("Accept", "*/*");
    xhr.setRequestHeader("Cache-Control", "no-cache");
    xhr.setRequestHeader("Postman-Token", "ba568848-cd02-495e-8a8d-0d48a39bc800,3f247166-1d05-4e62-b116-bfeaccd06f25");
    xhr.setRequestHeader("accept-encoding", "gzip, deflate");
    xhr.setRequestHeader("referer", "https://api.meraki.com/api/v0/devices/" + deviceID + "/clients?timespan=86400");
    xhr.setRequestHeader("Connection", "keep-alive");
    xhr.setRequestHeader("cache-control", "no-cache");
    
    xhr.send(data);
  });

  
}

function getDevices(network_id, apiKey){
  return new Promise(resolve => {
    var data = null;

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    
    xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
      var response = JSON.parse(this.responseText);
          resolve(response);
    }
    });
    
    xhr.open("GET", "https://api.meraki.com/api/v0/networks/" + network_id + "/devices");
    xhr.setRequestHeader("X-Cisco-Meraki-API-Key", apiKey);
    xhr.setRequestHeader("User-Agent", "PostmanRuntime/7.11.0");
    xhr.setRequestHeader("Accept", "*/*");
    xhr.setRequestHeader("Cache-Control", "no-cache");
    xhr.setRequestHeader("Postman-Token", "8d4aa7a9-a6ae-49a2-9ce2-486f87124736,e5f7899b-1b6b-4070-9d46-749df3019012");
    xhr.setRequestHeader("accept-encoding", "gzip, deflate");
    xhr.setRequestHeader("referer", "https://api.meraki.com/api/v0/networks/" + network_id + "/devices");
    xhr.setRequestHeader("Connection", "keep-alive");
    xhr.setRequestHeader("cache-control", "no-cache");
    
    xhr.send(data);
  });
}

function getGroupPolicy(network_id, apiKey, oldClient){ 
  client = oldClient; 
  console.log("CLIENTS!!");
  console.log(client[0].mac);
  console.log(client[1].mac);
  console.log(client[2].mac);

for(var i = 0; i < client.length; i++){
client[i].policy = timeout(network_id, apiKey, client[i].mac, i); 
}
console.log('The loop is done!');
return client; 
}

function timeout(network_id, apiKey, mac, i){
 
  setTimeout(function() {
    console.log("MAC: " + mac);
 var data = null;

 var xhr = new XMLHttpRequest();
 xhr.withCredentials = true;
 
 xhr.addEventListener("readystatechange", function () {
   if (this.readyState === 4) {
     console.log(this.response);
    return this.responseText;  
   }
 });
 
 xhr.open("GET", "https://api.meraki.com/api/v0/networks/" + network_id + "/clients/" + mac + "/policy?timespan=84000");
 xhr.setRequestHeader("X-Cisco-Meraki-API-Key", apiKey);
 xhr.setRequestHeader("cache-control", "no-cache");
 xhr.setRequestHeader("Postman-Token", "42d71a55-73d8-4b7b-91f2-15ccbf9f3565");
 
 xhr.send(data);
 },i*500);
}



function blockClient(network_id, clientMAC, apiKey) {
  return new Promise(resolve => {
    var data = null;
  
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    
    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        console.log(this.responseText);
        resolve(this.responseText);
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
  });


 
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

  function askForAPI(){
    var apiKey  = prompt("Please enter your Meraki API Key", "611a8ceeedb0c36716a5125c46cd7f3ba760d465");
    while(apiKey == null || apiKey == ""){
      var apiKey  = prompt("Please enter your Meraki API Key", "611a8ceeedb0c36716a5125c46cd7f3ba760d465");
    }
    return apiKey; 
  }


function policyBox(){
var policybox = prompt("HeLLO");
return policybox;
}



  function askForNetworkID(){
    var networkID  = prompt("Please enter your Meraki Network ID", "L_647955396387940893");
    while(networkID == null || networkID == ""){
      var networkID  = prompt("Please enter your Meraki Network ID", "L_647955396387940893");
    }
    return networkID; 
  }

function getNetworkIds(apiKey, orgID){
  console.log("Asking for network ID");
  return new Promise(resolve => {
          var data = null;

      var xhr = new XMLHttpRequest();
      xhr.withCredentials = true;

      xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
          console.log(this.responseText);
          var response = JSON.parse(this.responseText);
          resolve(response);
        }
      });

      xhr.open("GET", "https://api.meraki.com/api/v0/organizations/" + orgID + "/networks");
      xhr.setRequestHeader("X-Cisco-Meraki-API-Key", apiKey);
      xhr.setRequestHeader("User-Agent", "PostmanRuntime/7.11.0");
      xhr.setRequestHeader("Accept", "*/*");
      xhr.setRequestHeader("Cache-Control", "no-cache");
      xhr.setRequestHeader("Postman-Token", "2596631b-1b19-44b9-8487-eb2186f1221a,65227e35-e8e5-48b3-b375-0924bc5ec98c");
      xhr.setRequestHeader("accept-encoding", "gzip, deflate");
      xhr.setRequestHeader("referer", "https://api.meraki.com/api/v0/organizations/" + orgID + "/networks");
      xhr.setRequestHeader("Connection", "keep-alive");
      xhr.setRequestHeader("cache-control", "no-cache");

      xhr.send(data);
  });
}

  function getorgs(apiKey){
 
    return new Promise(resolve => {
            var data = null;

      var xhr = new XMLHttpRequest();
      xhr.withCredentials = true;

      xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
          console.log(this.responseText);   
           var response = JSON.parse(this.responseText);
          resolve(response);
        }
      });

      xhr.open("GET", "https://api.meraki.com/api/v0/organizations");
      xhr.setRequestHeader("X-Cisco-Meraki-API-Key", apiKey);
      xhr.setRequestHeader("User-Agent", "PostmanRuntime/7.11.0");
      xhr.setRequestHeader("Accept", "*/*");
      xhr.setRequestHeader("Cache-Control", "no-cache");
      xhr.setRequestHeader("Postman-Token", "c6f65ef7-f1fc-4353-951c-40417d702873,d3837598-d580-4c4b-91bc-32ed2847db5e");
      xhr.setRequestHeader("accept-encoding", "gzip, deflate");
      xhr.setRequestHeader("referer", "https://api.meraki.com/api/v0/organizations");
      xhr.setRequestHeader("Connection", "keep-alive");
      xhr.setRequestHeader("cache-control", "no-cache");
     
      xhr.send(data);
      
    });

  }
  