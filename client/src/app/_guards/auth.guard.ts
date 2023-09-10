import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpserviceService } from '../_services/httpservice.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  redirectUrl!: any;
  constructor(
        private router: Router,
        private http: HttpserviceService
  ){

  }
  canActivate(router: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if(this.http.loggedIn()){
        return true;
    } else {
        this.redirectUrl = state.url;
        this.router.navigate(['/login']);
        return false;
    }
}
  
}
