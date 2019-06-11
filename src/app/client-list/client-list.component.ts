
import { Component, OnInit } from '@angular/core';
import { RestApiService } from "../shared/rest-api.service";
import { Clients } from '../shared/clients';
declare const blockClient1: any;
declare const allowClient1: any;
declare const blockClient: any;
declare const allowClient: any;
declare const getPolicy: any; 
declare const askForAPI: any;
declare const askForNetworkID: any; 
declare const getGroupPolicy: any; 


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



  ngOnInit() {
    this.loadPage(); 
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

 

  loadPage(){
    this.apiKey = askForAPI(); 
    this.loadClients();
    
   
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
    
   this.Client[index].policy =  await getPolicy(networkID, mac, apiKey, index);
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
   loadClients() {
    this.networkID = askForNetworkID();
    return this.restApi.getClients().subscribe((data: {}) => {
      this.Client = data; 
      var i = 0;
      for(i = 0; i<this.Client.length; i++){
        this.Client[i].show = true; 
        this.getManufactuer(this.Client[i].mac, i);
       this.getClientPolicy(this.networkID, this.Client[i].mac, this.apiKey, i);
        this.index += 1;
      }
    })
  }

  //we are passing in the client mac address to an open API and getting back the manufaturer from the OUI
  getManufactuer(mac : String, index : number){
    return this.restApi.checkMac(mac).subscribe((data: {result : {company : any}}) => {
      this.Client[index].manufactuer = data.result.company;  
    })
  }

}
