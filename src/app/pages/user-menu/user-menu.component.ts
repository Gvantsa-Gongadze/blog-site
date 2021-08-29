import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { User } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit, OnDestroy {
  userList: User[] = [];

  filteredBy = '';
  userSub!: Subscription;

  constructor(
    public apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.getUserList();
  }
  getUserList(): void {
    this.userSub = this.apiService.getUserList().subscribe((res: any) => {
      this.userList = res;
    });
  }

  sortTable(property: string, additionalproperty?: string): void {
    this.userList.sort((a: any, b: any) => {
      if (additionalproperty) {
        return a[property][additionalproperty].localeCompare(b[property][additionalproperty]);
      } else {
        return a[property].localeCompare(b[property]);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.userSub){
      this.userSub.unsubscribe();
    }
  }
}
