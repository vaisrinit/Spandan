import { Component,OnInit } from '@angular/core';
import { Form, FormBuilder,FormControl, FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpserviceService } from '../httpservice.service';
import { ReusableService } from '../reusable.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  form = this.fb.group({
    username: new FormControl(null,Validators.compose([
      Validators.required,
      Validators.email
    ])),
    password: new FormControl(null,Validators.compose([
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(10)
    ])),
  })

  constructor(
    private router: Router,
    private fb:FormBuilder,
    private http: HttpserviceService,
    private reusable:ReusableService
  ){  }

  ngOnInit(): void {
    
  }

  home(){
    this.router.navigate(['home']);
  }

  async login(){
    console.log(this.form.value);
    let param:any = {
      email:this.form.value.username,
      password:this.form.value.password
    };
    // let result = await this.http.login(this.reusable.encrypt(Buffer.from(JSON.parse(param),"base64")));
    let result = await this.http.login(param);
    if(result.success){
      console.log(result);
      localStorage.setItem("token",result.rows[0].token);
      this.home();
    }
  }
}
