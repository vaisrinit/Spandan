import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-playing11',
  templateUrl: './playing11.component.html',
  styleUrls: ['./playing11.component.css']
})
export class Playing11Component implements OnInit{

  @Input() league_id:any;

  ngOnInit(): void {
    console.log(this.league_id)
  }

}
