import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements OnInit{
  ngOnInit(): void {

  }
  
  constructor(
    private router:Router
  ){

  }

  redirectDefence(){
    this.router.navigate(["home/defence"]);
  }
  redirectCurrentAffairs(){
    this.router.navigate(["home/defence"]);
  }
  redirectSports(){
    this.router.navigate(["home/sports"]);
  }
}
