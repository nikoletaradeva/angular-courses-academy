import { NgModule } from '@angular/core';
import { AuthComponent } from './auth.component';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import  {routes}  from './routes';


@NgModule({
  declarations: [AuthComponent, LoginComponent, RegisterComponent],
  imports: [
      ReactiveFormsModule,
      RouterModule.forChild(routes)
    
  ]
})
export class AuthModule { }