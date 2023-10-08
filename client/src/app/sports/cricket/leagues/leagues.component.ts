import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpserviceService } from 'src/app/_services/httpservice.service';

@Component({
  selector: 'app-leagues',
  templateUrl: './leagues.component.html',
  styleUrls: ['./leagues.component.css']
})
export class LeaguesComponent implements OnInit{

  ngOnInit(): void {
    
  }

  constructor(
    private http: HttpserviceService,
    private router:Router
  ) {}

  redirect(route:any){
    this.router.navigate(["home/sports/cricket/leagues/"+route]);
  }
}
