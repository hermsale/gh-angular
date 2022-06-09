import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { TokenService } from '../services/token.service';





@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private tokenService: TokenService,
    private router: Router,
    private authService:AuthService
  ) {}


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = this.tokenService.getToken();
    // if(!token){
    //   this.router.navigate(['/home']);
    //   return false;
    // }
    // return true;

    // de esta forma estamos vigilando el estado de user$
    return this.authService.user$
      .pipe(
        map(userProfile =>{ // transformamos la ruta del guard devolviendo un bool
          if(!userProfile){ // si no encuentra un userProfile
            this.router.navigate(['/home']); // aplicamos un redirect
              return false; // no permitimos entrar a la pagina
          }
          return true; // permite acceder
        })
      )
  }

}
