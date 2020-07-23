import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: "", redirectTo: "book", pathMatch: "full"},
  {path: "book", loadChildren: () => import('./modules/book/book.module').then(m=>m.BookModule)},
  {path: "user", loadChildren: () => import('./modules/user/user.module').then(m=>m.UserModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
