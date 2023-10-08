import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-general-election',
  templateUrl: './general-election.component.html',
  styleUrls: ['./general-election.component.css']
})
export class GeneralElectionComponent implements OnInit{


  ngOnInit(): void {
    sessionStorage.setItem("currentRoute","/home/politics/parlelections");
  }

  states = [
    {name:"Andhra",capital:"Amaravati"},
    {name:"Arunachal",capital:"Amaravati"},
    {name:"Assam",capital:"Amaravati"}
    ]

}
