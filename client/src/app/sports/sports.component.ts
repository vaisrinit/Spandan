import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sports',
  templateUrl: './sports.component.html',
  styleUrls: ['./sports.component.css']
})
export class SportsComponent implements OnInit{
  ngOnInit(): void {
    sessionStorage.setItem("currentRoute","/home/sports/");
  }

  constructor(
    private router:Router
  )
  {}
  redirect(route:string){
    this.router.navigate(["home/sports/"+route]);
  }

}
