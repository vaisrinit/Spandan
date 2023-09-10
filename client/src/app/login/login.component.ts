import { Component,OnInit } from '@angular/core';
import { Form, FormBuilder,FormControl, FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpserviceService } from '../_services/httpservice.service';
import { ReusableService } from '../_services/reusable.service';
import { AuthGuard } from '../_guards/auth.guard';


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
  returnUrl!: string;
  constructor(
    private router: Router,
    private fb:FormBuilder,
    private http: HttpserviceService,
    private reusable:ReusableService,
    private authGuard:AuthGuard
  ){  }

  ngOnInit(): void {
    if (this.authGuard.redirectUrl){
			this.returnUrl = this.authGuard.redirectUrl;
			this.authGuard.redirectUrl = undefined;
		} else {
			if(this.http.loggedIn()){
				this.navigation();
			}
		}
  }

  home(){
    this.router.navigate(['home']);
  }

  private navigation() {
		let lastVisitedURL = sessionStorage.getItem("currentRoute");
		switch (lastVisitedURL) {
			case "home" :
				this.router.navigate(['home']);
			break
			case "home/defence":
				this.router.navigate(['home/defence']);
			break;
			default:
				console.log("inside home");
				this.router.navigate(['home']);
		}
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
      // localStorage.setItem("token",result.rows[0].token);
      this.reusable.storeSessionData(result.rows[0].token);
      this.home();
      if (this.returnUrl){
				console.log("successfully logged in");
				this.router.navigate([this.returnUrl]);
			} else {
				console.log("successfully logged in");
				this.navigation();
			}
    }
  }
}
