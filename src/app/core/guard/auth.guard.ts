import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {ClerkService} from "../service/clerk.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _clerkService: ClerkService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this._clerkService.load().then(async () => {
      await this._clerkService.load();

      let user = await this._clerkService.user;
      setTimeout(async () => {
        user = await this._clerkService.user;
      }, 100);

      if (user) {
        return true;
      } else {
        return this.router.navigateByUrl('/login').then(() => { return false; });
      }
    });
  }

}
