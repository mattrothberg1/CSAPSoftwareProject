import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../shared/rest-api.service';
import { Clients } from '../shared/clients';
import { JsonPipe } from '@angular/common';

declare const blockClient1: any;
declare const allowClient1: any;
declare const blockClient: any;
declare const allowClient: any;
declare const getPolicy: any; 
declare const askForAPI: any;
declare const askForNetworkID: any; 
declare const getGroupPolicy: any; 
declare const getDevices: any; 
declare const getClients: any;
declare const getorgs: any;  
declare const getNetworkIds: any; 
declare const getNameofPolicy: any; 
declare const setPolicy: any;
declare const getPolicyList: any;
declare const policyDropdown: any;
declare const policyBox: any;



@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css'],
  
})



export class ClientListComponent implements OnInit {


  
  Client: any = [];
  
  selectedRow: string;
  index = 0;
  apiKey = ""; 
  networkID = "";
  constructor(
    public restApi: RestApiService
  ) {
    
   }
   



  async ngOnInit() {
    await this.loadPage(); 
  }
  
  policyOptions(networkid){
   // alert(networkid);
  
    getPolicyList(networkid, this.apiKey, 1);
  }

  changePolicy(event: any, mac, networkID){
    var ID = event.target.Policy.value.toLowerCase(); 
    console.log(setPolicy(ID, mac, networkID, this.apiKey));
    this.getClientPolicy(networkID, mac, this.apiKey, 1);

  }
  //this is for the search bar
  onSubmit(event: any) {
    var i = 0;
    for(i = 0; i<this.Client.length; i++){
      var clientToString = "";
      if(this.Client[i].id != null){
        clientToString += this.Client[i].id.toLowerCase();
      }
      if(this.Client[i].mac != null){
        clientToString += this.Client[i].mac.toLowerCase();
      }
      if(this.Client[i].manufactuer != null){
        clientToString += this.Client[i].manufactuer.toLowerCase();
      }
      if(this.Client[i].mdnsName != null){
        clientToString += this.Client[i].mdnsName.toLowerCase();
      }
      if(this.Client[i].dhcpHostname != null){
        clientToString += this.Client[i].dhcpHostname.toLowerCase();
      }
      if(this.Client[i].ip != null){
        clientToString += this.Client[i].ip.toLowerCase();
      }
      if(this.Client[i].policy != null){
        clientToString += this.Client[i].policy.toLowerCase();
      }
      if(clientToString.includes(event.target.search.value.toLowerCase()) ){
        this.Client[i].show = true;
      }
      else{
        this.Client[i].show = false;
      }
    }
 }
 



   async loadPage(){
    this.apiKey = askForAPI(); 

    //this.loadClients();
    // await this.newLoadClients(); 
    
    this.restartLoadClients();
    
  }

  async blockClient(mac, index){
   await blockClient(this.networkID, mac, this.apiKey);
   this.Client[index].policy = "Blocked";
   
  }
  allowClient(mac, index){
    allowClient(this.networkID, mac, this.apiKey);
    this.Client[index].policy = "Normal";
    
  }


  async getClientPolicy(networkID, mac, apiKey, index){
    
    var tempPolicy = await getPolicy(networkID, mac, apiKey, index);
    if(tempPolicy.type === "Group policy"){
      console.log("We found a group policy with mac of: " + mac);
      this.Client[index].policy = await getNameofPolicy(tempPolicy.groupPolicyId, networkID, apiKey);
      console.log("The policy found is: "+this.Client[index].policy);
    }
    else{
      this.Client[index].policy = tempPolicy.type; 
    }
  }

  getPolicyHelper(networkID, mac, apiKey, index){
    return getPolicy(networkID, mac, apiKey, index).pipe();
  }

  testAPI1(){
    console.log("CLIENTS: ");
    console.log(this.Client);
    this.Client[this.index] = {id: "k0094kk", mac: "b8:c1:12:01:fb:d0", manufactuer: "Unknown", mdnsName: "Matts-Virus", dhcpHostname: "MattsVirus", ip: "192.168.1.244", vlan: "1", policy: "Blocked"};
  }
  // Get employees list

  async restartLoadClients(){
    var tempClient: any = []; 
  var  networkIDs: any = []; 
  var organizations: any = []; 
  var orgCount = 0; 
  var networkCount = 0; 
  var clientCount = 0; 
  var devices: any = []; 
  var deviceCount = 0; 
  
    organizations = await getorgs(this.apiKey);
    for(var orgNum = 0; orgNum < organizations.length; orgNum++){
      var tempNetworkIDs: any = []; 
      tempNetworkIDs = await getNetworkIds(this.apiKey, organizations[orgNum].id);
      for(var tempNum = 0; tempNum < tempNetworkIDs.length; tempNum++){
        networkIDs[networkCount] = tempNetworkIDs[tempNum]; 
        networkCount++; 
      }
      console.log("The network ID's downloaded are: " + JSON.stringify(networkIDs));
    }

    for(var networkNum = 0; networkNum < networkIDs.length; networkNum++){
      console.log("Entering Network Segment: " + networkIDs[networkNum].id);
      var tempDevices: any = []; 
      tempDevices = await getDevices(networkIDs[networkNum].id, this.apiKey); 
      for(var tempNum = 0; tempNum < tempDevices.length; tempNum++){
        devices[deviceCount] = tempDevices[tempNum];
        deviceCount++;
      }
    //it's working up until here 
    //TODO: need to attach the network ID to the devices!! 
    for(var deviceNum = 0; deviceNum < devices.length; deviceNum++){
      console.log("Entering Device Segment: " + devices[deviceNum].name);
      var tempClients: any = []; 
      tempClients = await getClients(devices[deviceNum].serial, this.apiKey);
      console.log("THe temp client size is: " + tempClients.length + " And the output is: " + JSON.stringify(tempClients));
      for(var tempNum = 0; tempNum < tempClients.length; tempNum++ ){
        console.log("Entering temp client with description of: " + tempClients[tempNum].description);
        //first we check if this client exits already 
        var duplicate = true; 
        for(var x = 0; x < clientCount; x++){
          if(this.Client[x].id === tempClients[tempNum].id){
            duplicate = false; 
            console.log('Duplicate found with x value of: ' + x + "and id of: " + this.Client[x].id);
          }
        }
        if(duplicate == true){
          console.log("Duplicate not found with id number of: " + tempClients[tempNum].id);
          this.Client[clientCount] = tempClients[tempNum]; 
          this.Client[clientCount].show = true; 
          this.Client[clientCount].networkID = networkIDs[networkNum].id;
         
          //this.Client[clientCount].policies = await getPolicyList(this.apiKey, networkIDs[networkNum].id, clientCount).groupPolicyId; //import all possible policies to client object
          //this.Client[clientCount].policies = setPolicy(this.Client[clientCount].mac, networkIDs[networkNum].id, this.apiKey);
          
          this.getManufactuer(this.Client[clientCount].mac, clientCount);
          this.getClientPolicy(this.Client[clientCount].networkID, this.Client[clientCount].mac, this.apiKey, clientCount);
          clientCount++; 
        }
      } 
    }
  }
  }

/*
  async newLoadClients(){
    console.log("Helloo");
    this.organizations = await getorgs(this.apiKey); 
    for(var x = 0; x < this.organizations.length; x++){
      this.networkIDs = await getNetworkIds(this.apiKey, this.organizations[x].id);
      console.log("network ID 1: " + this.networkIDs[0].id);
    } //need to expand this to support multiple organizations later 
    for(var x = 0; x < this.networkIDs.length; x++){
      console.log("hello this is network: " + x  + "  :  " + this.networkIDs[x].id);
      this.devices = await getDevices(this.networkIDs[x].id, this.apiKey); 
      for(var i = 0; i < this.devices.length; i++){
        console.log("this device is: " + this.devices[i].serial);
        this.tempClient = await getClients(this.devices[i].serial, this.apiKey); 
        console.log("device is: " + this.devices[i].serial + "clients: " + JSON.stringify(this.tempClient)); 
        
          for(var z = 0; z < this.tempClient.length; z++){
            console.log("TempClient Number is: " + z + "The client is: " + JSON.stringify(this.tempClient[z]) );
            var trust = true; 
            console.log("NETWORK  right before error: " + x);
            this.tempClient.networkID = this.networkIDs[x].id; 
            this.tempClient.show = true; 
            console.log("Client length before " + this.Client.length);
            for(var j = 0; j < this.Client.length ; j++ ){
              if(this.Client[j].id === this.tempClient[z].id){
                trust = false; 
              }
            }
              if(trust == true){
                console.log("Entering tempClient into client");
                if(this.Client.length == 0){
                  this.Client[0] = this.tempClient[z]; 
                }else{
                  var clientNumber = this.Client.length+1;
                  this.Client[clientNumber] = this.tempClient[z]; 
                  this.Client[clientNumber].show = true; 
                  this.getManufactuer(this.Client[clientNumber].mac, i);
                  this.getClientPolicy(this.Client[clientNumber].networkID, this.Client[clientNumber].mac, this.apiKey, clientNumber);
                }
            }
            console.log("Client length after " + this.Client.length);
          }
          this.tempClient = []; 
        
      }
      
    }
    console.log("OUTPUTTING CLIENTS: " + this.Client);
    for(var i = 0; i < this.Client.length; i++){
      this.Client[i].show = true; 
      this.getManufactuer(this.Client[i].mac, i);
     this.getClientPolicy(this.Client[i].networkID, this.Client[i].mac, this.apiKey, i);
      this.index += 1;
      console.log(this.Client[i]);
    }
    
   
  }*/

  helper(){
    
  }
/*
   loadClients() {

    this.networkIDs = askForNetworkID();
    for(var x = 0; x < this.networkIDs.length; x++){
      //return this.restApi.getClients().subscribe((data: {}) => {
       this.restApi.getClients(this.networkIDs[x], this.apiKey).subscribe((data: {}) => {
        this.Client = data; 
      })
    }
    var i = 0;
    for(i = 0; i<this.Client.length; i++){
      this.Client[i].show = true; 
      this.getManufactuer(this.Client[i].mac, i);
     this.getClientPolicy(this.networkID, this.Client[i].mac, this.apiKey, i);
      this.index += 1;
    }
    
  }*/

  //we are passing in the client mac address to an open API and getting back the manufaturer from the OUI
  getManufactuer(mac : String, index : number){
    return this.restApi.checkMac(mac).subscribe((data: {result : {company : any}}) => {
      this.Client[index].manufactuer = data.result.company;  
    })
  }

}

