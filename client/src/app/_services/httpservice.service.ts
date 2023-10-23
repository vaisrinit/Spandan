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
//user apis
  async register(data: any) {
    return lastValueFrom(this.http.post<any>(this.domain+'/users/register', data,));
  }
  async login(data: any) {
    return lastValueFrom(this.http.post<any>(this.domain+'/users/login', data));
  }
  async getUsers() {
    return lastValueFrom(this.http.get<any>(this.domain+'/users/getUsers'));
  }


//defence apis
  async addExerciseDetails(data: any) {
    return lastValueFrom(this.http.post<any>(this.domain+'/defence/addExerciseDetails', data));
  }
  async getExerciseDetails() {
    return lastValueFrom(this.http.get<any>(this.domain+'/defence/getExerciseDetails'));
  }

  
  //sports apis
  async addMatchOfficials(data: any) {
    return lastValueFrom(this.http.post<any>(this.domain+'/sports/addMatchOfficials', data));
  }
  async getMatchOfficials() {
    return lastValueFrom(this.http.get<any>(this.domain+'/sports/getMatchOfficials'));
  }
  async addVenueDetails(data: any) {
    return lastValueFrom(this.http.post<any>(this.domain+'/sports/addVenueDetails', data));
  }
  async editVenueDetails(data: any) {
    return lastValueFrom(this.http.post<any>(this.domain+'/sports/editVenueDetails', data));
  }
  async getVenueDetails() {
    return lastValueFrom(this.http.get<any>(this.domain+'/sports/getVenueDetails'));
  }
  async addTeamDetails(data: any) {
    return lastValueFrom(this.http.post<any>(this.domain+'/sports/addTeamDetails', data));
  }
  async getTeamDetails() {
    return lastValueFrom(this.http.get<any>(this.domain+'/sports/getTeamDetails'));
  }
  async addLeagueDetails(data: any) {
    return lastValueFrom(this.http.post<any>(this.domain+'/sports/addLeagueDetails', data));
  }
  async getLeagueDetails() {
    return lastValueFrom(this.http.get<any>(this.domain+'/sports/getLeagueDetails'));
  }
  async addMatchSummary(data: any) {
    return lastValueFrom(this.http.post<any>(this.domain+'/sports/addMatchSummary', data));
  }
  async getMatchSummary(data:any) {
    return lastValueFrom(this.http.post<any>(this.domain+'/sports/getMatchSummary',data));
  }
  async getFixtureDetails(data: any) {
    return lastValueFrom(this.http.post<any>(this.domain+'/sports/getFixtureDetails',data));
  }
  async getTeamsPlaying(data: any) {
    return lastValueFrom(this.http.post<any>(this.domain+'/sports/getTeamsPlaying',data));
  }
  async getPlayersForMatch(data: any) {
    return lastValueFrom(this.http.post<any>(this.domain+'/sports/getPlayersForMatch',data));
  }
  async addBattingDetails(data: any) {
    return lastValueFrom(this.http.post<any>(this.domain+'/sports/addBattingDetails', data));
  }
  async addBowlingDetails(data: any) {
    return lastValueFrom(this.http.post<any>(this.domain+'/sports/addBowlingDetails', data));
  }
  async getBattingSummary(data:any) {
    return lastValueFrom(this.http.post<any>(this.domain+'/sports/getBattingSummary',data));
  }
  async getBowlingSummary(data:any) {
    return lastValueFrom(this.http.post<any>(this.domain+'/sports/getBowlingSummary',data));
  }
  async getFixtures(data:any) {
    return lastValueFrom(this.http.post<any>(this.domain+'/sports/getFixtures',data));
  }
}
