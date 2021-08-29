import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { ApiService } from 'src/app/services/api.service';
import { PostService } from 'src/app/services/post.service';
import { Post } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnDestroy {
  currantPost: Post[] = [];

  // pagination
  totalPages = 0;
  currentPage = 0;
  itemsPerPage = 8;

  getPostsSub!: Subscription;

  constructor(
    public postService: PostService,
    public spiService: ApiService
  ) { }

  ngOnInit(): void {
    this.getPostList();
  }

  getPostList(): void {
    if (!this.postService.posts?.length) {
      this.getPostsSub = this.spiService.getPostList().subscribe((res: any) => {
          this.postService.posts = res;
          this.getCurrantPosts();
      });
    } else {
      this.getCurrantPosts();
    }
  }

  prev(): void {
    this.currentPage--;
    this.getCurrantPosts();
  }
  next(): void {
    this.currentPage++;
    this.getCurrantPosts();
  }

  getCurrantPosts(): void {
    const posts = this.postService.posts;
    const from = this.currentPage  * this.itemsPerPage;
    const to = from + this.itemsPerPage;
    this.currantPost = posts?.slice(from, to);

    this.getTotalPages();
  }

  getTotalPages(): void {
    this.totalPages = Math.ceil(this.postService.posts.length / this.itemsPerPage);
  }

  ngOnDestroy(): void {
    if (this.getPostsSub){
      this.getPostsSub.unsubscribe();
    }
  }
}
