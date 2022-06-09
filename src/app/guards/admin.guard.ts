import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthService } from './../services/auth.service'

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService:AuthService
  ){

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.authService.user$
    .pipe(
      map(userProfile =>{ // transformamos la ruta del guard devolviendo un bool
        if(userProfile?.role==='admin'){ // corroboro si es admin el rol del user
            return true;
        }else{
          this.router.navigate(['/home']);
          return false;
        }

      })
    )
  }

}
