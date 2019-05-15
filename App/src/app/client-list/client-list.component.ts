
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
@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
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
  
  loadPage(){
    this.apiKey = askForAPI(); 
    this.loadClients();
  }

  blockClient(mac, index){
    blockClient(this.networkID, mac, this.apiKey);

  }
  allowClient(mac, index){
    allowClient(this.networkID, mac, this.apiKey);
  }

  getClientPolicy(networkID, mac, apiKey, index){
    this.Client[index].policy = getPolicy(this.networkID, mac, this.apiKey); 
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
        //this.Client[i].policy = "Allowed";
       
        this.getManufactuer(this.Client[i].mac, i);
        this.getClientPolicy(this.networkID, this.Client[i].mac, this.apiKey, i);
        this.index += 1;
      }
      console.log(this.Client);
    })
  }

  getManufactuer(mac : String, index : number){
    let manufactuer = "";
    return this.restApi.checkMac(mac).subscribe((data: {result : {company : any}}) => {
      console.log("MANU: ");
      //console.log(data.result.company);
      this.Client[index].manufactuer = data.result.company;
      console.log(this.Client[index].manufactuer);
    })
    return manufactuer; 
  }

}

