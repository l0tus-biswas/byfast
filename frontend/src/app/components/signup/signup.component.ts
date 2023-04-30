import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  query = '';
  data: any = [];
  status: any = [];
  errMsg!: string;
  onRegisterSuccess: boolean = false;

  constructor(private _userService: UserService, private spinner: NgxSpinnerService, private _toast: NgToastService) {

  }
  ngOnInit() {
  }
  
  signupUserFunc(form: NgForm) {
    console.log(form.value);
    this.spinner.show();

    this._userService.registerUser(form.value.firstName, form.value.lastName, form.value.emailAdderss, form.value.password).subscribe(
      res => {
        setTimeout(() => {
          this.spinner.hide();
        }, 1000);
        this.status = res;
        console.log(this.status[0].success);
        if (this.status[0].success == true) {
          this._toast.success({ detail: "REGISTRATION SUCCESS", summary: 'Please Sign In Now', position: 'br' });
          setTimeout(function () {
            window.location.href = 'signin'
          }, 2000);
          // this.onRegisterSuccess == true;
        }
        if (this.status[0].success == false) {
          this._toast.warning({ detail: "REGISTRATION FAILED", summary: this.status[0].message, position: 'br' });
          setTimeout(function () {
            window.location.reload();
          }, 2000);
        }
      },
      err => {
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
        }, 1000);
        this._toast.warning({ detail: "FAILED", summary: 'Please try after sometime', position: 'br' });
      }, () => console.log("Add New Event method excuted successfully"))
  }
}
