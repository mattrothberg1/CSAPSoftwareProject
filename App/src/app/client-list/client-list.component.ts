
import { Component, OnInit } from '@angular/core';
import { RestApiService } from "../shared/rest-api.service";
import { Clients } from '../shared/clients';

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
  
  testAPI(){
    console.log("CLIENTS: ");
    console.log(this.Client);
    this.Client[43] = {id: "k0094kd", mac: "b8:c1:11:01:fb:d0", mdnsName: "Masons-Virus", dhcpHostname: "MasonsVirus", ip: "192.168.1.243", vlan: "1", policy: "Blocked"};
  }
  testAPI1(){
    console.log("CLIENTS: ");
    console.log(this.Client);
    this.Client[this.index] = {id: "k0094kk", mac: "b8:c1:12:01:fb:d0", mdnsName: "Matts-Virus", dhcpHostname: "MattsVirus", ip: "192.168.1.244", vlan: "1", policy: "Blocked"};
  }
  // Get employees list
  loadClients() {
    return this.restApi.getClients().subscribe((data: {}) => {
      this.Client = data; 
      var i = 0;
      for(i = 0; i<this.Client.length; i++){
        this.Client[i].policy = "Allowed";
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

}

