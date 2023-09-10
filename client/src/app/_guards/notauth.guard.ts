import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpserviceService } from '../_services/httpservice.service';

@Injectable({
  providedIn: 'root'
})
export class NotauthGuard implements CanActivate {
  constructor(
        private router: Router,
        private http: HttpserviceService
  ){

  }
  canActivate() {
    if(this.http.loggedIn()){
        this.router.navigate(['/login']);
        return false;
    } else {
        return true;
    }
}
  
}
