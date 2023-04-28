import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { SendResetPasswordMailComponent } from './components/send-reset-password-mail/send-reset-password-mail.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'signin', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'reset-password', component: SendResetPasswordMailComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
