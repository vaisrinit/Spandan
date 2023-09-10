import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http'
import { lastValueFrom, BehaviorSubject, Observable } from 'rxjs'
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root'
})
export class HttpserviceService {

  constructor(
    private http: HttpClient,
    public jwtHelper: JwtHelperService,
  ) { }

  loggedIn() {
    const token = this.jwtHelper.tokenGetter();
    if (!token) return false;
    return !this.jwtHelper.isTokenExpired();
  }
  async register(data: any) {
    return lastValueFrom(this.http.post<any>('http://localhost:3000/api/register', data,));
  }

  async login(data: any) {
    return lastValueFrom(this.http.post<any>('http://localhost:3000/api/login', data));
  }

  async getUsers() {
    return lastValueFrom(this.http.get<any>('http://localhost:3000/api/getUsers'));
  }

  async addExerciseDetails(data: any) {
    return lastValueFrom(this.http.post<any>('http://localhost:3000/api/addExerciseDetails', data));
  }
  async getExerciseDetails() {
    return lastValueFrom(this.http.get<any>('http://localhost:3000/api/getExerciseDetails'));
  }
}
