import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  // user apis
  getUserList(): Observable<User[]>{
    return this.httpClient.get(`https://jsonplaceholder.typicode.com/users`) as Observable<User[]>;
  }
  getUser(id: number): Observable<User>{
    return this.httpClient.get(`https://jsonplaceholder.typicode.com/users/${id}`)as Observable<User>;
  }

}
