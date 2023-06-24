import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http'
import {lastValueFrom,BehaviorSubject} from 'rxjs'
@Injectable({
  providedIn: 'root'
})
export class HttpserviceService {

  constructor(
    private http : HttpClient,
  ) { }

  async register(data:any){
    return lastValueFrom(this.http.post<any>('http://localhost:3000/api/register',data));
  }

  async login(data:any){
    return lastValueFrom(this.http.post<any>('http://localhost:3000/api/login',data));
  }
}
