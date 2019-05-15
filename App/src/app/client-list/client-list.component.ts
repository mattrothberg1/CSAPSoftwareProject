
import { Component, OnInit } from '@angular/core';
import { RestApiService } from "../shared/rest-api.service";
import { Clients } from '../shared/clients';
declare const blockClient1: any;
declare const allowClient1: any;
declare const blockClient: any;
declare const allowClient: any;
declare const getPolicy: any; 
@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})




export class ClientListComponent implements OnInit {
  Client: any = [];
  selectedRow: string;
  index = 0;
  constructor(
    public restApi: RestApiService
  ) {
    
   }

   finalAllowClient(index){
     this.Client[index].policy = "Allowed";
   }
  
   finalBlockClient(index){
     this.Client[index].policy = "Blocked";
   }

  ngOnInit() {
    this.loadClients()
   
  }
  
  lastBlockClient(networkID, mac, apiKey, index){
    blockClient(networkID, mac, apiKey);

  }
  lastAllowClient(networkID, mac, apiKey, index){
    allowClient(networkID, mac, apiKey);
    
  }

  lastGetClientPolicy(networkID, mac, apiKey, index){
    this.Client[index].policy = getPolicy(networkID, mac, apiKey); 
  }

  testAPI1(){
    console.log("CLIENTS: ");
    console.log(this.Client);
    this.Client[this.index] = {id: "k0094kk", mac: "b8:c1:12:01:fb:d0", manufactuer: "Unknown", mdnsName: "Matts-Virus", dhcpHostname: "MattsVirus", ip: "192.168.1.244", vlan: "1", policy: "Blocked"};
  }
  // Get employees list
  loadClients() {
    return this.restApi.getClients().subscribe((data: {}) => {
      this.Client = data; 
      var i = 0;
      for(i = 0; i<this.Client.length; i++){
        //this.Client[i].policy = "Allowed";
       
        this.getManufactuer(this.Client[i].mac, i);
        this.lastGetClientPolicy("L_647955396387940893", this.Client[i].mac, "611a8ceeedb0c36716a5125c46cd7f3ba760d465", i);
        this.index += 1;
      }
      console.log(this.Client);
    })
  }

  getClientPolicy(mac : String) {
    console.log("getCLIENT");
    
    return this.restApi.getClientPolicy(mac).subscribe((data: {}) => {
      console.log(data);
      return data;
    })
  }
  
 

  blockClient(mac : String){
    console.log("Block Client: " + mac);
  
    return this.restApi.blockClient(mac).subscribe((data: {}) => {
      console.log(data);
      return data;
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

