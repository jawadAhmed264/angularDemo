import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs'
import { Department } from '../Models/department';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  url:string="http://localhost:50981/api/department/";
  constructor(private http:HttpClient) { }
  
  getList():Observable<Department[]>{
     return this.http.get<Department[]>(this.url);
  }

  get(Id:number):Observable<Department>{
     return this.http.get<Department>(this.url+Id);
  }
  add(dep:Department){
    return this.http.post(this.url,dep);
  }
  
  update(Id:number,dep:any){
    return this.http.put(this.url+Id,dep);
  }
  
  delete(Id:number){
    return this.http.delete(this.url+Id);
  }

}
