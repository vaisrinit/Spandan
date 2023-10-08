import { Component,OnInit } from '@angular/core';
import { Form, FormBuilder,FormControl, FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpserviceService } from '../_services/httpservice.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  form = this.fb.group({
    email: new FormControl(null,Validators.compose([
      Validators.required,
      Validators.email
    ])),
    name: new FormControl(null,Validators.compose([
      Validators.required
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

  login(){
    this.router.navigate(['login']);
  }

  async register(){
    let param = {
      email:this.form.value.email,
      name:this.form.value.name,
      password:this.form.value.password
    };
    let result = await this.http.register(param);
    if(result.success){
      this.login();
    }
  }
}
