import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http'
import { lastValueFrom, BehaviorSubject, Observable } from 'rxjs'
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class HttpserviceService {
  domain = environment.domain;
  constructor(
    private http: HttpClient,
    public jwtHelper: JwtHelperService,
  ) { }

  loggedIn() {
    const token = this.jwtHelper.tokenGetter();
    if (!token) return false;
    return !this.jwtHelper.isTokenExpired();
  }

  logout() {
    sessionStorage.clear();
}

  async register(data: any) {
    return lastValueFrom(this.http.post<any>(this.domain+'/api/register', data,));
  }

  async login(data: any) {
    return lastValueFrom(this.http.post<any>(this.domain+'/api/login', data));
  }

  async getUsers() {
    return lastValueFrom(this.http.get<any>(this.domain+'/api/getUsers'));
  }

  async addExerciseDetails(data: any) {
    return lastValueFrom(this.http.post<any>(this.domain+'/api/addExerciseDetails', data));
  }
  async getExerciseDetails() {
    return lastValueFrom(this.http.get<any>(this.domain+'/api/getExerciseDetails'));
  }
  async addMatchOfficials(data: any) {
    return lastValueFrom(this.http.post<any>(this.domain+'/api/addMatchOfficials', data));
  }
  async getMatchOfficials() {
    return lastValueFrom(this.http.get<any>(this.domain+'/api/getMatchOfficials'));
  }
  async addVenueDetails(data: any) {
    return lastValueFrom(this.http.post<any>(this.domain+'/api/addVenueDetails', data));
  }
  
  async editVenueDetails(data: any) {
    return lastValueFrom(this.http.post<any>(this.domain+'/api/editVenueDetails', data));
  }
  async getVenueDetails() {
    return lastValueFrom(this.http.get<any>(this.domain+'/api/getVenueDetails'));
  }
  async addTeamDetails(data: any) {
    return lastValueFrom(this.http.post<any>(this.domain+'/api/addTeamDetails', data));
  }
  async getTeamDetails() {
    return lastValueFrom(this.http.get<any>(this.domain+'/api/getTeamDetails'));
  }
  async addLeagueDetails(data: any) {
    return lastValueFrom(this.http.post<any>(this.domain+'/api/addLeagueDetails', data));
  }
  async getLeagueDetails() {
    return lastValueFrom(this.http.get<any>(this.domain+'/api/getLeagueDetails'));
  }

  async addMatchSummary(data: any) {
    return lastValueFrom(this.http.post<any>(this.domain+'/api/addMatchSummary', data));
  }
  async getMatchSummary(data:any) {
    return lastValueFrom(this.http.post<any>(this.domain+'/api/getMatchSummary',data));
  }

  async getFixtureDetails(data: any) {
    return lastValueFrom(this.http.post<any>(this.domain+'/api/getFixtureDetails',data));
  }
  
  async getTeamsPlaying(data: any) {
    return lastValueFrom(this.http.post<any>(this.domain+'/api/getTeamsPlaying',data));
  }
  async getPlayersForMatch(data: any) {
    return lastValueFrom(this.http.post<any>(this.domain+'/api/getPlayersForMatch',data));
  }
  async addBattingDetails(data: any) {
    return lastValueFrom(this.http.post<any>(this.domain+'/api/addBattingDetails', data));
  }
  async addBowlingDetails(data: any) {
    return lastValueFrom(this.http.post<any>(this.domain+'/api/addBowlingDetails', data));
  }
  async getBattingSummary(data:any) {
    return lastValueFrom(this.http.post<any>(this.domain+'/api/getBattingSummary',data));
  }
  
  async getBowlingSummary(data:any) {
    return lastValueFrom(this.http.post<any>(this.domain+'/api/getBowlingSummary',data));
  }

  async getFixtures(data:any) {
    return lastValueFrom(this.http.post<any>(this.domain+'/api/getFixtures',data));
  }
}
