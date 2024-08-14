import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {Department, Job} from "../models/department";

@Injectable({
  providedIn: 'root'
})
export class CustomService {

  private apiUrl = `${environment.apiUrl}`;

  constructor(private _httpClient: HttpClient) {
  }

  getDepartments(): Observable<Department[]>{
    return this._httpClient.get<Department[]>(this.apiUrl+'/departments');
  }
  getJobs(): Observable<Job[]>{
    return this._httpClient.get<Job[]>(this.apiUrl + '/jobs');
  }




}
