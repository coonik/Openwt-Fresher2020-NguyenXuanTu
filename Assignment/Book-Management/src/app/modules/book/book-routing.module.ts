import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookListComponent } from './pages/book-list/book-list.component';
import { BookEditComponent } from "./components/book-edit/book-edit.component";
import { BookDetailComponent } from "./components/book-detail/book-detail.component";

const routes: Routes = [
  {
    path: '',
    component: BookListComponent
  },
  {path: "create", component: BookEditComponent},
  {path: "edit", component: BookEditComponent},
  {path: "list", component: BookListComponent},
  {path: "detail", component: BookDetailComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookRoutingModule { }
