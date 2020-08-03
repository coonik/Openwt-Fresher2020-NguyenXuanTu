import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';

const routes: Routes = [
  {path: "", redirectTo: "book", pathMatch: "full"},
  {path: "book", loadChildren: () => import('./modules/book/book.module').then( m => m.BookModule )},
  {path: "user", loadChildren: () => import('./modules/user/user.module').then( m => m.UserModule )},
  {path: "author", loadChildren: () => import('./modules/author/author.module').then( m=> m.AuthorModule )},
  {path: '404', component: NotFoundComponent},
  {path: '**', redirectTo: '/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
