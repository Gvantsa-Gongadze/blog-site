import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { User, Post } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit, OnDestroy {
  id = 0;
  postList: Post[] = [];
  userPostList: Post[] = [];

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

  routeSub!: Subscription;
  getPostsSub!: Subscription;
  getUserSub!: Subscription;

  constructor(
    private route: ActivatedRoute,
    public spiService: ApiService
  ) { }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.id = Number(params.id);
    });

    this.getUser();
    this.getPostList();
  }
  getUserPosts(): void {
    if (this.postList.length > 0) {
      this.userPostList = this.postList.filter((post: Post) => post.userId === this.id);
      console.log(this.userPostList);
    }
  }
  getPostList(): void {
    this.getPostsSub = this.spiService.getPostList().subscribe((res: any) => {
      this.postList = res;
      this.getUserPosts();
    });
  }
  getUser(): void {
    this.getUserSub = this.spiService.getUser(this.id).subscribe((res: any) => {
      this.user = res;
    });
  }

  ngOnDestroy(): void {
    if (this.routeSub){
      this.routeSub.unsubscribe();
    }
    if (this.getPostsSub){
      this.getPostsSub.unsubscribe();
    }
    if (this.getUserSub){
      this.getUserSub.unsubscribe();
    }
  }
}
