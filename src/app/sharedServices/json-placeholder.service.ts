import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JsonPlaceholderService {

  constructor(private httpService: HttpClient) { }
  baseUrl: string = "https://jsonplaceholder.typicode.com";
  getPost(data): Observable<any> {
    let first = data.first;
    let rows = data.rows;
    return this.httpService.get(this.baseUrl + "/posts?_start=" + first + "&_limit=" + rows + "");
  }
}
