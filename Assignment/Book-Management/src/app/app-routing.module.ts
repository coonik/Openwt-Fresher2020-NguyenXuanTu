import { BookListComponent } from './modules/book/pages/book-list/book-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './modules/user/pages/login/login.component';
import { BookEditComponent } from './modules/book/components/book-edit/book-edit.component';


const routes: Routes = [
  {path: "", redirectTo: "book-list", pathMatch: "full"},
  {path: "book-edit", component: BookEditComponent},
  {path: "book-create", component: BookEditComponent},
  {path: "book-list", component: BookListComponent},
  {path: "auth", component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
