import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {User} from "../models/user";
import {catchError, map, Observable, of} from "rxjs";
import {Employee} from "../models/employee";
import {AuthResponse} from "../models/auth-response";
import * as string_decoder from "node:string_decoder";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authUrl = `${environment.authServerUrl}`;
  loggedIn: boolean = false;

  constructor(private _httpClient: HttpClient) {
  }

  login(user: User): Observable<AuthResponse> {
    return this._httpClient.post<AuthResponse>(this.authUrl + '/signin', user);
  }

  isLoggedIn(): Observable<boolean> {
    const token = localStorage.getItem('token');
    if (token) {
      return this.validateToken().pipe(
        map((res) => res.isValid),
        catchError((error) => {
          console.error('Token validation failed', error);
          return of(false); // Return false if validation fails
        })
      );
    } else {
      return of(false); // Return false if no token is present
    }
  }


  validateToken(): Observable<any> {
    const token = localStorage.getItem('token') || '';
    return this._httpClient.get<any>(`${this.authUrl}/validate-token`, {
      params: { token: token }
    });
  }



}
