import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { RestApiService } from '../shared/rest-api.service';
var ClientListComponent = /** @class */ (function () {
    function ClientListComponent(restApi) {
        this.restApi = restApi;
        this.Client = [];
        this.index = 0;
        this.apiKey = "";
        this.networkID = "";
    }
    ClientListComponent.prototype.ngOnInit = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadPage()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    //this is for the search bar
    ClientListComponent.prototype.onSubmit = function (event) {
        var i = 0;
        for (i = 0; i < this.Client.length; i++) {
            var clientToString = "";
            if (this.Client[i].id != null) {
                clientToString += this.Client[i].id.toLowerCase();
            }
            if (this.Client[i].mac != null) {
                clientToString += this.Client[i].mac.toLowerCase();
            }
            if (this.Client[i].manufactuer != null) {
                clientToString += this.Client[i].manufactuer.toLowerCase();
            }
            if (this.Client[i].mdnsName != null) {
                clientToString += this.Client[i].mdnsName.toLowerCase();
            }
            if (this.Client[i].dhcpHostname != null) {
                clientToString += this.Client[i].dhcpHostname.toLowerCase();
            }
            if (this.Client[i].ip != null) {
                clientToString += this.Client[i].ip.toLowerCase();
            }
            if (this.Client[i].policy != null) {
                clientToString += this.Client[i].policy.toLowerCase();
            }
            if (clientToString.includes(event.target.search.value.toLowerCase())) {
                this.Client[i].show = true;
            }
            else {
                this.Client[i].show = false;
            }
        }
    };
    ClientListComponent.prototype.loadPage = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.apiKey = askForAPI();
                //this.loadClients();
                // await this.newLoadClients(); 
                this.restartLoadClients();
                return [2 /*return*/];
            });
        });
    };
    ClientListComponent.prototype.blockClient = function (mac, index) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, blockClient(this.networkID, mac, this.apiKey)];
                    case 1:
                        _a.sent();
                        this.Client[index].policy = "Blocked";
                        return [2 /*return*/];
                }
            });
        });
    };
    ClientListComponent.prototype.allowClient = function (mac, index) {
        allowClient(this.networkID, mac, this.apiKey);
        this.Client[index].policy = "Normal";
    };
    ClientListComponent.prototype.getClientPolicy = function (networkID, mac, apiKey, index) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var tempPolicy, _a;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, getPolicy(networkID, mac, apiKey, index)];
                    case 1:
                        tempPolicy = _b.sent();
                        if (!(tempPolicy.type === "Group policy")) return [3 /*break*/, 3];
                        console.log("We found a group policy with mac of: " + mac);
                        _a = this.Client[index];
                        return [4 /*yield*/, getNameofPolicy(tempPolicy.groupPolicyId, networkID, apiKey)];
                    case 2:
                        _a.policy = _b.sent();
                        console.log("The policy found is: " + this.Client[index].policy);
                        return [3 /*break*/, 4];
                    case 3:
                        this.Client[index].policy = tempPolicy.type;
                        _b.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ClientListComponent.prototype.getPolicyHelper = function (networkID, mac, apiKey, index) {
        return getPolicy(networkID, mac, apiKey, index).pipe();
    };
    ClientListComponent.prototype.testAPI1 = function () {
        console.log("CLIENTS: ");
        console.log(this.Client);
        this.Client[this.index] = { id: "k0094kk", mac: "b8:c1:12:01:fb:d0", manufactuer: "Unknown", mdnsName: "Matts-Virus", dhcpHostname: "MattsVirus", ip: "192.168.1.244", vlan: "1", policy: "Blocked" };
    };
    // Get employees list
    ClientListComponent.prototype.restartLoadClients = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var tempClient, networkIDs, organizations, orgCount, networkCount, clientCount, devices, deviceCount, orgNum, tempNetworkIDs, tempNum, networkNum, tempDevices, tempNum, deviceNum, tempClients, tempNum, duplicate, x;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        tempClient = [];
                        networkIDs = [];
                        organizations = [];
                        orgCount = 0;
                        networkCount = 0;
                        clientCount = 0;
                        devices = [];
                        deviceCount = 0;
                        return [4 /*yield*/, getorgs(this.apiKey)];
                    case 1:
                        organizations = _a.sent();
                        orgNum = 0;
                        _a.label = 2;
                    case 2:
                        if (!(orgNum < organizations.length)) return [3 /*break*/, 5];
                        tempNetworkIDs = [];
                        return [4 /*yield*/, getNetworkIds(this.apiKey, organizations[orgNum].id)];
                    case 3:
                        tempNetworkIDs = _a.sent();
                        for (tempNum = 0; tempNum < tempNetworkIDs.length; tempNum++) {
                            networkIDs[networkCount] = tempNetworkIDs[tempNum];
                            networkCount++;
                        }
                        console.log("The network ID's downloaded are: " + JSON.stringify(networkIDs));
                        _a.label = 4;
                    case 4:
                        orgNum++;
                        return [3 /*break*/, 2];
                    case 5:
                        networkNum = 0;
                        _a.label = 6;
                    case 6:
                        if (!(networkNum < networkIDs.length)) return [3 /*break*/, 12];
                        console.log("Entering Network Segment: " + networkIDs[networkNum].id);
                        tempDevices = [];
                        return [4 /*yield*/, getDevices(networkIDs[networkNum].id, this.apiKey)];
                    case 7:
                        tempDevices = _a.sent();
                        for (tempNum = 0; tempNum < tempDevices.length; tempNum++) {
                            devices[deviceCount] = tempDevices[tempNum];
                            deviceCount++;
                        }
                        deviceNum = 0;
                        _a.label = 8;
                    case 8:
                        if (!(deviceNum < devices.length)) return [3 /*break*/, 11];
                        console.log("Entering Device Segment: " + devices[deviceNum].name);
                        tempClients = [];
                        return [4 /*yield*/, getClients(devices[deviceNum].serial, this.apiKey)];
                    case 9:
                        tempClients = _a.sent();
                        console.log("THe temp client size is: " + tempClients.length + " And the output is: " + JSON.stringify(tempClients));
                        for (tempNum = 0; tempNum < tempClients.length; tempNum++) {
                            console.log("Entering temp client with description of: " + tempClients[tempNum].description);
                            duplicate = true;
                            for (x = 0; x < clientCount; x++) {
                                if (this.Client[x].id === tempClients[tempNum].id) {
                                    duplicate = false;
                                    console.log('Duplicate found with x value of: ' + x + "and id of: " + this.Client[x].id);
                                }
                            }
                            if (duplicate == true) {
                                console.log("Duplicate not found with id number of: " + tempClients[tempNum].id);
                                this.Client[clientCount] = tempClients[tempNum];
                                this.Client[clientCount].show = true;
                                this.Client[clientCount].networkID = networkIDs[networkNum].id;
                                this.Client[clientCount].policies = getPolicyList(this.apiKey, networkIDs[networkNum].id); //import all possible policies to client object
                                //console.log("testing policy fetching " + getPolicyList(this.apiKey, networkIDs[networkNum].id));
                                //console.log("CHECKING IF IT WORKED: "+ this.Client[clientCount].policies );
                                this.getManufactuer(this.Client[clientCount].mac, clientCount);
                                this.getClientPolicy(this.Client[clientCount].networkID, this.Client[clientCount].mac, this.apiKey, clientCount);
                                clientCount++;
                            }
                        }
                        _a.label = 10;
                    case 10:
                        deviceNum++;
                        return [3 /*break*/, 8];
                    case 11:
                        networkNum++;
                        return [3 /*break*/, 6];
                    case 12: return [2 /*return*/];
                }
            });
        });
    };
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
    ClientListComponent.prototype.helper = function () {
    };
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
    ClientListComponent.prototype.getManufactuer = function (mac, index) {
        var _this = this;
        return this.restApi.checkMac(mac).subscribe(function (data) {
            _this.Client[index].manufactuer = data.result.company;
        });
    };
    ClientListComponent = tslib_1.__decorate([
        Component({
            selector: 'app-client-list',
            templateUrl: './client-list.component.html',
            styleUrls: ['./client-list.component.css'],
        }),
        tslib_1.__metadata("design:paramtypes", [RestApiService])
    ], ClientListComponent);
    return ClientListComponent;
}());
export { ClientListComponent };
//# sourceMappingURL=client-list.component.js.map