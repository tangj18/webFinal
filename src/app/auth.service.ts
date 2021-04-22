import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { JwtHelperService } from '@auth0/angular-jwt';

const helper = new JwtHelperService();

import {User} from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private http: HttpClient ) { }

  public getToken(): string {
    const userJson = localStorage.getItem('access_token');
    return userJson !== null ? JSON.stringify(userJson) : "";
  }

  public readToken(): any{
    const token = localStorage.getItem('access_token');
    
    return helper.decodeToken(token !== null ? JSON.stringify(localStorage.getItem('access_token')) : "") ;
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('access_token');


    if (token) {
      console.log('token exists');
      return true;
    } else {
      console.log('no token');
      return false;
    }
  }

  //https://murmuring-spire-39986.herokuapp.com/ 
  login(user: User): Observable<any> {
    // Attempt to login
    return this.http.post<any>('https://murmuring-spire-39986.herokuapp.com/api/login', user);
  }
}
