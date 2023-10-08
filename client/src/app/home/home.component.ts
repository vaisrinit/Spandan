import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpserviceService } from '../_services/httpservice.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  public href: string = "";

  ngOnInit(): void {
    this.href = this.router.url
    sessionStorage.setItem("currentRoute","/home");
  }
  constructor(
    private router:Router,
    private http:HttpserviceService
  ){
    
  }

  redirectDefence(){
    this.router.navigate(['/home/defence']);
  }

  logout()
  {
    this.http.logout();
    this.router.navigate(['login'])
  }
}
