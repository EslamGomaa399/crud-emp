import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {Department, Job} from "../models/department";
import {Employee} from "../models/employee";

@Injectable({
  providedIn: 'root'
})
export class CustomService {

  private apiUrl = `${environment.empUrl}`;

  constructor(private _httpClient: HttpClient) {
  }

  getDepartments(): Observable<Department[]>{
    return this._httpClient.get<Department[]>(this.apiUrl+'/departments');
  }
  getJobs(): Observable<Job[]>{
    return this._httpClient.get<Job[]>(this.apiUrl + '/jobs');
  }

  getAllManagersNames(): Observable<string[]>{
    return this._httpClient.get<string[]>(this.apiUrl + '/managers/names');
  }

  addNewEmployee(employee: Employee): Observable<Employee> {
    return this._httpClient.post<Employee>(this.apiUrl + '/employees', employee);
  }

  getAllEmployees(): Observable<Employee[]> {
    return this._httpClient.get<Employee[]>(this.apiUrl + '/employees');
  }
  deleteEmployee(id:number): Observable<any> {
    return this._httpClient.get<any>(this.apiUrl + `/employees/delete/${id}`);
  }



}
