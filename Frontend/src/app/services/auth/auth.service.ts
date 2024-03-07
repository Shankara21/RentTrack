import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/app/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() { }

  public userLoggedIn: any;

  // Set user data after login
  setUserLoggedIn(user: any) {
    this.userLoggedIn = user;
  }

  // Get user data
  getUserLoggedIn() {
    return this.userLoggedIn;
  }

  // SetToken
  SetToken(token: string) {
    // this.cookieService.delete(environment.token);
    // this.cookieService.set(environment.token, token, 8 / 24);
    localStorage.setItem(environment.token, token);
  }
  // GetToken
  public GetToken() {
    return localStorage.getItem(environment.token);
  }

  // DeleteToken
  DeleteToken() {
    localStorage.removeItem(environment.token);
  }

  // GetPayload -> JWT Token
  GetPayload() {
    const token = this.GetToken();
    if (token) {
      const payload = token.split('.')[1];
      return JSON.parse(atob(payload));
    } else {
      return null;
    }
  }
}
