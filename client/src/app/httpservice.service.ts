import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http'
import { lastValueFrom, BehaviorSubject, Observable } from 'rxjs'
@Injectable({
  providedIn: 'root'
})
export class HttpserviceService {

  constructor(
    private http: HttpClient,
  ) { }

  async register(data: any) {
    return lastValueFrom(this.http.post<any>('http://localhost:3000/api/register', data,));
  }

  async login(data: any) {
    return lastValueFrom(this.http.post<any>('http://localhost:3000/api/login', data));
  }

  async getUsers() {
    return lastValueFrom(this.http.get<any>('http://localhost:3000/api/getUsers', { headers: new HttpHeaders({ 'authorization': localStorage.getItem('token') || '' }) }));
  }

  async addExerciseDetails(data: any) {
    return lastValueFrom(this.http.post<any>('http://localhost:3000/api/addExerciseDetails', data, { headers: new HttpHeaders({ 'authorization': localStorage.getItem('token') || '' }) }));
  }
  async getExerciseDetails() {
    return lastValueFrom(this.http.get<any>('http://localhost:3000/api/getExerciseDetails', { headers: new HttpHeaders({ 'authorization': localStorage.getItem('token') || '' }) }));
  }
}
