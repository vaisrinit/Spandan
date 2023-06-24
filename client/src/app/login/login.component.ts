import { Component } from '@angular/core';
import { Form, FormBuilder,FormControl, FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpserviceService } from '../httpservice.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
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
    private http: HttpserviceService
  ){  }

  ngOnInit(): void {
    
  }

  home(){
    this.router.navigate(['home']);
  }

  async register(){
    // console.log(this.form.value);
    let param = {
      email:this.form.value.username,
      password:this.form.value.password
    };
    let result = await this.http.login(param);
    if(result.success){
      this.home();
    }
  }
}
