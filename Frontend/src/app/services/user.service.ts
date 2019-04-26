import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private serviceUrl = 'https://api.meraki.com/api/v0/devices/Q2HW-CV5L-5FXH/clients?timespan=86400?callback=JSON_CALLBACK';

  
  constructor(private http: HttpClient) { }

  getUser(): Observable<User[]> {
    let headers: HttpHeaders = new HttpHeaders();
    
    headers.append('X-Cisco-Meraki-API-Key', '611a8ceeedb0c36716a5125c46cd7f3ba760d465'),
    headers.append('Content-Type', 'application/json'),
    headers.append('User-Agent', 'PostmanRuntime/7.11.0'),
    headers.append('Accept', '*/*'),
    headers.append('Cache-Control', 'no-cache'),
    headers.append('Postman-Token', 'a72abd03-e457-428b-b4cf-37e54fbdde02,283803d4-eebd-4dbb-818f-91e41c7e53c4'),
    headers.append('accept-encoding', 'gzip, deflate'),
    headers.append('referer', 'https://api.meraki.com/api/v0/devices/Q2HW-CV5L-5FXH/clients?timespan=86400'),
    headers.append('Connection', 'keep-alive'),
    headers.append('cache-control', 'no-cache');
    
    

    return this.http.get<User[]>(this.serviceUrl, {headers});
  }
}
