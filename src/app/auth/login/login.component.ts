import { Component, OnInit } from '@angular/core';
import AuthService from '../auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { error } from 'util';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup
  constructor(private authService: AuthService,
              private fb:FormBuilder,
              private router:Router) {

                this.loginForm=this.fb.group({
                  name:['', Validators.required],
                  password:['', Validators.required]
                });
               }

  ngOnInit() {
  }

  onLogin(): void{
    this.authService.login(this.loginForm.value.name, this.loginForm.value.password).subscribe((user)=>{
      console.log('LOGIN SUCCESS');
      console.log(user);
      if (user.role=="admin")
      { }
      
      this.router.navigateByUrl('users/list');

    },() =>{
      console.error(error);

    });
  }

}
