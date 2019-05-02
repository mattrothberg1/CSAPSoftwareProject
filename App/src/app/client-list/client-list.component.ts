
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

  


  ngOnInit() {
    this.loadClients()
   
  }
  
  testAPI(){
    return "HELLO";
  }

  // Get employees list
  loadClients() {
    return this.restApi.getClients().subscribe((data: {}) => {
      this.Client = data;
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

