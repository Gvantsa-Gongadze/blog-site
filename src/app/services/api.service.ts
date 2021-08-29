import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User, Post } from 'src/app/interfaces/interfaces';

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

  // post apis
  getPostList(): Observable<Post[]>{
    return this.httpClient.get(`https://jsonplaceholder.typicode.com/posts`) as Observable<Post[]>;
  }
  getPost(id: number): Observable<Post>{
    return this.httpClient.get(`https://jsonplaceholder.typicode.com/posts/${id}`) as Observable<Post>;
  }
  addPost(postInput: {title: string, body: string, userId: number}): Observable<Post>{
    return this.httpClient.post(`https://jsonplaceholder.typicode.com/posts`, postInput) as Observable<Post>;
  }
  updatePost(id: number, postInput: {id: number; title: string, body: string, userId: number}): Observable<Post>{
    return this.httpClient.put(`https://jsonplaceholder.typicode.com/posts/${id}`, postInput) as Observable<Post>;
  }
  deletePost(id: number): Observable<{}>{
    return this.httpClient.delete(`https://jsonplaceholder.typicode.com/posts/${id}`) as Observable<{}>;
  }
  getPostComments(id: number): Observable<Comment[]> {
    return this.httpClient.get(`https://jsonplaceholder.typicode.com/comments?postId=${id}`) as Observable<Comment[]>;
  }
}
