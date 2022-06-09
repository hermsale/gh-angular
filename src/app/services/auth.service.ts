import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { switchMap, tap } from 'rxjs/operators';

import { environment } from './../../environments/environment';
import { Auth } from './../models/auth.model';
import { User } from './../models/user.model';
import { TokenService } from './../services/token.service';
import { BehaviorSubject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${environment.API_URL}/api/auth`;

  private user = new BehaviorSubject<User | null>(null);

  // creamos un observable de user
  user$ = this.user.asObservable();

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) { }

  // solicitamos un token y lo guardamos
  login(email: string, password: string) {
    return this.http.post<Auth>(`${this.apiUrl}/login`, {email, password})
    .pipe(
      // guardamos el token en el localStorage
      tap(response => this.tokenService.saveToken(response.access_token))
    );
  }


// solicitamos un perfil y lo guardamos en un observable
  getProfile() {
    return this.http.get<User>(`${this.apiUrl}/profile`)
    .pipe(
      // de esta forma dejamos en el Observable user lo que llegue de la request, que lo contendra userProfile
      tap(userProfile => this.user.next(userProfile))
    );
  }

   // logiamos y traemos el perfil
   loginAndGet(email: string, password: string) {
    return this.login(email, password)
    .pipe(
      switchMap(() => this.getProfile()),
    )
  }

  // deslogiamos
  logout(){
    this.tokenService.removeToken();
  }

}
