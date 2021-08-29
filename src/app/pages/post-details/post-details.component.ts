import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { PostService } from 'src/app/services/post.service';
import { User, Comment } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent implements OnInit {
  editMode = false;
  noDataFound = false;
  id = 0;
  post = {
    id: 0,
    userId: 0,
    title: '',
    body: ''
  };
  user: User = {
    id: 0,
    name: '',
    username: '',
    email: '',
    phone: '',
    company: {
      name: ''
    }
  };

  commentList: Comment[] = [];

  routeSub!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public postService: PostService,
    public apiService: ApiService,
  ) { }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.id = Number(params.id);
    });

    this.getPost();
    this.getPostComments();
  }
  getPost(): void {
    this.apiService.getPost(this.id).subscribe(
      (res: any) => {
        this.post = res;
        this.getUser();
      },
      (error: any) => {
        this.noDataFound = true;
      });
  }

  getPostComments(): void {
    this.apiService.getPostComments(this.id).subscribe((res: any) => {
      this.commentList = res;
    });
  }

  getUser(): void {
    this.apiService.getUser(this.post.userId).subscribe((res: any) => {
      this.user = res;
    });
  }

  onDeletePost(): void {
    this.apiService.deletePost(this.id).subscribe(() => {
      this.postService.posts = this.postService.posts?.filter(post => post.id !== this.id);
      this.router.navigate(['/posts']);
    });
  }

  onEditPost(): void {
    this.editMode = !this.editMode;
  }
  onSaveEditedPost(): void {
    this.apiService.updatePost(this.id, this.post).subscribe((res: any) => {
      const index = this.postService.posts.findIndex(post => post.id === this.id);

      this.postService.posts[index] = res;
      this.onEditPost();
    });
  }
  onCancelEditedPost(): void {
    this.onEditPost();
  }

}
