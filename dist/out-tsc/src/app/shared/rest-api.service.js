import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
var RestApiService = /** @class */ (function () {
    function RestApiService(https) {
        this.https = https;
        this.apiURL = 'https://api.meraki.com/api/v0/devices/Q2HW-CV5L-5FXH/clients?timespan=86400';
        this.httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'X-Cisco-Meraki-API-Key': "611a8ceeedb0c36716a5125c46cd7f3ba760d465",
                'User-Agent': "PostmanRuntime/7.11.0",
                'Accept': "*/*",
                'Cache-Control': "no-cache",
                'Postman-Token': "a72abd03-e457-428b-b4cf-37e54fbdde02,1024b34e-1a94-4fd1-9581-1782eddc27d5",
                'accept-encoding': "gzip, deflate",
                'referer': "https://api.meraki.com/api/v0/devices/Q2HW-CV5L-5FXH/clients?timespan=86400",
                'Connection': "keep-alive",
                'cache-control': "no-cache"
            })
        };
        this.httpOptions2 = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'X-Cisco-Meraki-API-Key': "611a8ceeedb0c36716a5125c46cd7f3ba760d465",
                'User-Agent': "PostmanRuntime/7.11.0",
                'Accept': "*/*",
                'Cache-Control': "no-cache",
                'Postman-Token': "a72abd03-e457-428b-b4cf-37e54fbdde02,1024b34e-1a94-4fd1-9581-1782eddc27d5",
                'accept-encoding': "gzip, deflate",
                'referer': "https://api.meraki.com/api/v0/networks/L_647955396387940893/clients/b8:c1:11:01:fb:d0/policy?timespan=84000&=",
                'Connection': "keep-alive",
                'cache-control': "no-cache"
            })
        };
        this.httpOptions3 = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'X-Cisco-Meraki-API-Key': "611a8ceeedb0c36716a5125c46cd7f3ba760d465",
                'User-Agent': "PostmanRuntime/7.11.0",
                'Accept': "*/*",
                'Cache-Control': "no-cache",
                'Postman-Token': "a72abd03-e457-428b-b4cf-37e54fbdde02,1024b34e-1a94-4fd1-9581-1782eddc27d5",
                'accept-encoding': "gzip, deflate",
                'referer': "https://api.meraki.com/api/v0/networks/L_647955396387940893/clients/b8:c1:11:01:fb:d0/policy?timespan=2592000",
                'Connection': "keep-alive",
                'cache-control': "no-cache",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "X-Requested-With",
                "Access-Control-Allow-Methods": "GET, POST, PUT",
            }),
            body: {
                devicePolicy: "Blocked"
            }
        };
    }
    RestApiService.prototype.getClients = function () {
        console.log("HELLO");
        return this.https.get(this.apiURL, this.httpOptions).pipe(retry(1), catchError(this.handleError));
    };
    RestApiService.prototype.getClientPolicy = function (mac) {
        var apiURL2 = "https://api.meraki.com/api/v0/networks/L_647955396387940893/clients/" + mac + "/policy?timespan=84000&=";
        return this.https.get(apiURL2, this.httpOptions2).pipe(catchError(this.handleError));
    };
    RestApiService.prototype.blockClient = function (mac) {
        var apiURL3 = 'https://api.meraki.com/api/v0/networks/L_647955396387940893/clients/' + mac + '/policy?timespan=2592000';
        return this.https.put(apiURL3, this.httpOptions3).pipe(retry(1), catchError(this.handleError));
    };
    RestApiService.prototype.checkMac = function (mac) {
        var apiURL4 = "http://macvendors.co/api/" + mac;
        return this.https.get(apiURL4).pipe(retry(1), catchError(this.handleError));
    };
    // Error handling 
    RestApiService.prototype.handleError = function (error) {
        var errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            // Get client-side error
            errorMessage = error.error.message;
        }
        else {
            // Get server-side error
            errorMessage = "Error Code: " + error.status + "\nMessage: " + error.message;
        }
        //window.alert(errorMessage);
        return throwError(errorMessage);
    };
    RestApiService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], RestApiService);
    return RestApiService;
}());
export { RestApiService };
//# sourceMappingURL=rest-api.service.js.map