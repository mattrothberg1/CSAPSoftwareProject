
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
    this.Client[48] = {id: "k0094kd", mac: "b8:c1:11:01:fb:d0", mdnsName: "Masons-Virus", dhcpHostname: "MasonsVirus", ip: "192.168.1.243", vlan: "1", policy: "Blocked"};
  }

  // Get employees list
  loadClients() {
    return this.restApi.getClients().subscribe((data: {}) => {
      this.Client = data; 
      for(var i = 0; i<this.Client.length; i++){
        this.Client[i].policy = "Allowed";
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

