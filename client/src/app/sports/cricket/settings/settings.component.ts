import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit{

  ngOnInit(): void {
    sessionStorage.setItem("currentRoute","/home/sports/cricket");
  }

  constructor(
    private router:Router
  )
  {}
  redirect(route:string){
    this.router.navigate(["home/sports/cricket/settings/"+route]);
  }
}
