import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {User} from "../models/user";
import {Observable} from "rxjs";
import {Employee} from "../models/employee";
import {AuthResponse} from "../models/auth-response";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authUrl = `${environment.authServerUrl}`;

  constructor(private _httpClient: HttpClient) {
  }

  login(user: User): Observable<AuthResponse> {
    return this._httpClient.post<AuthResponse>(this.authUrl + '/signin', user);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }


}
