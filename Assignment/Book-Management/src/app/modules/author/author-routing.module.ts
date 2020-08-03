import { AuthorManagementComponent } from './pages/author-management/author-management.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthorEditComponent } from './pages/author-edit/author-edit.component';

const routes: Routes = [
  {
    path: '',
    component: AuthorManagementComponent
  },
  {path: "create", component: AuthorEditComponent},
  {path: "edit", component: AuthorEditComponent},
  {path: "list", component: AuthorManagementComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthorRoutingModule { }
