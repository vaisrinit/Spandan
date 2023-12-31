import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements OnInit{
  ngOnInit(): void {
    sessionStorage.setItem("currentRoute","/home/tabs");
  }
  
  constructor(
    private router:Router
  ){

  }

  redirect(route:string){
    this.router.navigate(["home/"+route]);
  }
}
