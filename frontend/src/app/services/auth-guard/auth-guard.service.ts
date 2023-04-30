import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {
  constructor(private _router: Router) { }

  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
   if (localStorage.getItem('fullName')==null && localStorage.getItem('_id')==null && localStorage.getItem('lastName')==null && localStorage.getItem('emailAddress')==null) {
      this._router.navigate(["/signin"]);
      return false;
    }
    return true;
  }
}
