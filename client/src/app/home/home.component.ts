import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  public href: string = "";

  ngOnInit(): void {
    this.href = this.router.url
    console.log(this.href)
  }
  constructor(
    private router:Router
  ){
    
  }

  redirectDefence(){
    this.router.navigate(['/home/defence']);
  }
}
