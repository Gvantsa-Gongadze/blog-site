import { Injectable } from '@angular/core';
import { Post } from 'src/app/interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  public posts: Post[] = [];

  constructor() { }
}
