import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import UsersService from '../../users/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private fb: FormBuilder,
              private usersService:UsersService,
              private router:Router) { }

  ngOnInit() {
    this.registerForm=this.fb.group({
      id: [''],
      name: ['', Validators.required],
      password: ['', [Validators.required, Validators.maxLength(7)]],
      email: ['', Validators.required],
      role: [],
      picture: ['https://picsum.photos/200/300', Validators.required]
     
      

    });
  }

  onRegister():void{
    this.usersService.getAllUsers().subscribe((users) =>{
      const name=this.registerForm.value.name.toLowerCase();
       if(users.find(n => n.name.toLowerCase()===name)){
         return;

       }
       this.usersService.addNewUser(this.registerForm.value).subscribe(() =>{
       
      this.router.navigateByUrl('auth/login');

      });

    });

  }

}

