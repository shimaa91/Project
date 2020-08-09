import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import  {AccountService}  from  '../Services/account.service';
import { ToastrService } from 'ngx-toastr';
import { TokenService } from '../SharedServices/token.service';
 import {Patterns} from '../SharedServices/pattern';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoading = false;  
  constructor( private activatedRoute: ActivatedRoute,private route: Router,
    private accountService:AccountService,private toastService:ToastrService,
    private tokenService:TokenService) { }

  ngOnInit(): void {
  }
  loginForm = new FormGroup({
    Email: new FormControl('',[Validators.required,Validators.pattern(Patterns.Email)]),
    Password: new FormControl('',Validators.required),
  });

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.log("loginForm");
    console.warn(this.loginForm.value);
    this.accountService.login(this.loginForm.value).subscribe(result=>{
      if(result.isSuccess)
      {
        this.toastService.success("تم تسجيل الدخول  بنجاح");
        this.tokenService.setToken(result.data);
        this.route.navigateByUrl('/home');
      }
      else
      {
        this.toastService.error("البريد الالكترونى  او  كلمة  السر  غير صحيح")
      }
      console.log(result);
    },error=>{
      console.log(error);
    });
  }
}
