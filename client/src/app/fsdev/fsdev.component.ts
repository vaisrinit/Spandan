import { Component } from '@angular/core';

@Component({
  selector: 'app-fsdev',
  templateUrl: './fsdev.component.html',
  styleUrls: ['./fsdev.component.css']
})
export class FsdevComponent {

  title = "Full Stack DEvelopment";
  name="Raju";
  details = [
    {
      name:"Kumar",
      age:10,
      gender:"Male"
    },
    {
      name:"Kumari",
      age:12,
      gender:"Female"
    },
  ]
  is_display = false;
  openAlert(){
    alert("Hello")
  }
}
