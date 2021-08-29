import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostListComponent } from './pages/post-list/post-list.component';
import { UserMenuComponent } from './pages/user-menu/user-menu.component';

const routes: Routes = [
  { path: 'users', component: UserMenuComponent },
  { path: 'posts', component: PostListComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
