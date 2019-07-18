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
//----------------------------------------------------------------------------------------------
 // Calls the main function that loads the page  
 //------------------------------------------------------------------
  async ngOnInit() {
    await this.loadPage(); 
  }
  
  policyOptions(networkid){
    getPolicyList(networkid, this.apiKey, 1);
  }

  changePolicy(event: any, mac, networkID, index){
    var ID = event.target.Policy.value.toLowerCase(); 
    console.log(setPolicy(ID, mac, networkID, this.apiKey));
    this.getClientPolicy(networkID, mac, this.apiKey, index);
    var obj = this.Client; 
    this.Client = obj;

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
      this.Client[index].policy = await getNameofPolicy(tempPolicy.groupPolicyId, networkID, apiKey);
    }
    else{
      this.Client[index].policy = tempPolicy.type; 
    }
  }

  getPolicyHelper(networkID, mac, apiKey, index){
    return getPolicy(networkID, mac, apiKey, index).pipe();
  }

  testAPI1(){
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
    }

    for(var networkNum = 0; networkNum < networkIDs.length; networkNum++){
      var tempDevices: any = []; 
      tempDevices = await getDevices(networkIDs[networkNum].id, this.apiKey); 
      for(var tempNum = 0; tempNum < tempDevices.length; tempNum++){
        devices[deviceCount] = tempDevices[tempNum];
        deviceCount++;
      }
    for(var deviceNum = 0; deviceNum < devices.length; deviceNum++){
      var tempClients: any = []; 
      tempClients = await getClients(devices[deviceNum].serial, this.apiKey);
           for(var tempNum = 0; tempNum < tempClients.length; tempNum++ ){
      
        var duplicate = true; 
        for(var x = 0; x < clientCount; x++){
          if(this.Client[x].id === tempClients[tempNum].id){
            duplicate = false; 
          }
        }
        if(duplicate == true){
          this.Client[clientCount] = tempClients[tempNum]; 
          this.Client[clientCount].show = true; 
          this.Client[clientCount].networkID = networkIDs[networkNum].id;
         this.getManufactuer(this.Client[clientCount].mac, clientCount);
          this.getClientPolicy(this.Client[clientCount].networkID, this.Client[clientCount].mac, this.apiKey, clientCount);
          clientCount++; 
        }
      } 
    }
  }
  }

  //we are passing in the client mac address to an open API and getting back the manufaturer from the OUI
  getManufactuer(mac : String, index : number){
    return this.restApi.checkMac(mac).subscribe((data: {result : {company : any}}) => {
      this.Client[index].manufactuer = data.result.company;  
    })
  }

}

