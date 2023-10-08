import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-politics',
  templateUrl: './politics.component.html',
  styleUrls: ['./politics.component.css']
})
export class PoliticsComponent implements OnInit{

  constructor(
    private router:Router
  ){

  }
  ngOnInit(): void {
    sessionStorage.setItem("currentRoute","/home/politics/");
  }

  redirect(route:string){
    this.router.navigate(["home/politics/"+route]);
  }
}
