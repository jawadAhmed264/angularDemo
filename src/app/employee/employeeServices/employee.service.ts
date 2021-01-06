import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../Models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  url:string="http://localhost:50981/api/employee/";
  //reqHeader = new HttpHeaders({ 'Authorization': 'bearer '+localStorage.getItem("userToken") });
  constructor(private http:HttpClient) { }
  
  getList():Observable<Employee[]>{
    return this.http.get<Employee[]>(this.url);
  }

  get(Id:number):Observable<Employee>{
     return this.http.get<Employee>(this.url+Id);
  }
  add(emp:any){
    return this.http.post(this.url,emp);
  }
  
  update(Id:number,emp:any){
    return this.http.put(this.url+Id,emp);
  }
  
  delete(Id:number){
    return this.http.delete(this.url+Id);
  }
}
