import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { NgxSpinnerService } from 'ngx-spinner';
import { IUsers } from 'src/app/interface/users';
import { UserService } from 'src/app/services/user/user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  status: any;
  errMsg!: string;
  userDetails: IUsers[] = [];
  
  constructor(private http: HttpClient, private spinner: NgxSpinnerService, private _usrServices: UserService, private _toast: NgToastService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
  }

  loginUserFunc(form: NgForm) {

    console.log(form.value);
    this.spinner.show();
    this._usrServices.loginUser(form.value.emailAdderss, form.value.password).subscribe(
      res => {
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
        }, 1000);
        this.status = res;
        console.log(this.status);
        
        // this.onlogindeviceinfo();
        
        if (this.status.length >= 1) {
          this.userDetails = this.status;
          localStorage.setItem("_id", String(this.userDetails[0]._id));
          localStorage.setItem("firstName", String(this.userDetails[0].firstName));
          localStorage.setItem("lastName", String(this.userDetails[0].lastName));
          localStorage.setItem("emailAddress", String(this.userDetails[0].emailAddress));
          localStorage.setItem("isVerified", String(this.userDetails[0].isVerified));
          this._toast.success({ detail: "LOGIN SUCCESS", summary: 'Redirecting to home page', position: 'br' });

          setTimeout(() => {
            this.router.navigate(["/welcome"]);
          }, 2000);

        }
        else {
          this._toast.warning({ detail: "WRONG CREDINTIALS", summary: 'Unable to login', position: 'br' });
          setTimeout(function () {
            window.location.reload();
          }, 2000);
        }
      },
      err => {
        this._toast.warning({ detail: " FAILED", summary: 'Please try after sometime', position: 'br' });
      }, () => console.log("Login method excuted successfully"))
  }
}
