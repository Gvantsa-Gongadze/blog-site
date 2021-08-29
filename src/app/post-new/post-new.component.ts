import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { ApiService } from 'src/app/services/api.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post-new',
  templateUrl: './post-new.component.html',
  styleUrls: ['./post-new.component.scss']
})
export class PostNewComponent implements OnInit, OnDestroy {
  public postInput = {title: '', body: '', userId: 11};

  postsSub!: Subscription;

  constructor(
    public postService: PostService,
    public apiService: ApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onAddNewPost(): void {
    this.postsSub = this.apiService.addPost(this.postInput).subscribe((res: any) => {
      this.postService.posts.push(res);
      this.router.navigate(['/posts']);
    });
  }

  ngOnDestroy(): void {
    if (this.postsSub){
      this.postsSub.unsubscribe();
    }
  }
}
