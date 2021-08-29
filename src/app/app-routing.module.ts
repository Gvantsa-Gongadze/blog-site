import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostDetailsComponent } from './pages/post-details/post-details.component';
import { PostListComponent } from './pages/post-list/post-list.component';
import { UserDetailsComponent } from './pages/user-details/user-details.component';
import { UserMenuComponent } from './pages/user-menu/user-menu.component';

const routes: Routes = [
  { path: 'users', component: UserMenuComponent },
  { path: 'user/:id', component: UserDetailsComponent },
  { path: 'posts', component: PostListComponent },
  { path: 'post/:id', component: PostDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
