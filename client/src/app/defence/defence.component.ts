import { Component,OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { HttpserviceService } from '../httpservice.service';

@Component({
  selector: 'app-defence',
  templateUrl: './defence.component.html',
  styleUrls: ['./defence.component.css']
})
export class DefenceComponent implements OnInit{

  ngOnInit(): void {
    
  }

  constructor(
    private router:Router,
    private http: HttpserviceService
  ){

  }

  async redirectExercise(){
    let result = await this.http.getUsers();
    console.log(result);
    this.router.navigate(["home/defence/exercise"]);
  }
  redirectCurrentAffairs(){
    this.router.navigate(["home/defence"]);
  }
}
