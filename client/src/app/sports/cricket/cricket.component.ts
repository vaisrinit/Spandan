import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cricket',
  templateUrl: './cricket.component.html',
  styleUrls: ['./cricket.component.css']
})
export class CricketComponent implements OnInit{
  ngOnInit(): void {
    sessionStorage.setItem("currentRoute","/home/sports/cricket");
  }

  constructor(
    private router:Router
  )
  {}
  redirect(route:string){
    this.router.navigate(["home/sports/cricket/"+route]);
  }
}
