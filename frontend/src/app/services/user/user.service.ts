import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user_api_url = "http://localhost:3000/user";

  constructor(private http: HttpClient) { }

  registerUser(firstName: string, lastName: string, emailAddress: string, password: string): Observable<boolean> {
    console.log(emailAddress, password);
    return this.http.post<boolean>(this.user_api_url + "/signup", {
      firstName: firstName,
      lastName: lastName,
      emailAddress: emailAddress,
      password: password
    }).pipe(catchError(this.errorHandler));
  }

  
  loginUser(emailAddress: string, password: string): Observable<boolean> {

    return this.http.post<any>(this.user_api_url + "/signin", {
      emailAddress: emailAddress,
      password: password
    }).pipe(catchError(this.errorHandler));
  }
  
  errorHandler(error: HttpErrorResponse) {
    console.error(error);
    return throwError(error.message || "Server Error");
  }
}
