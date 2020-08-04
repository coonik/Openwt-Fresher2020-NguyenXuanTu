import { AuthGuard } from './shared/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';

const routes: Routes = [
  {path: "", redirectTo: "book", pathMatch: "full", canActivate: [AuthGuard]},
  {path: "book", canActivate: [AuthGuard], loadChildren: () => import('./modules/book/book.module').then(m=>m.BookModule)},
  {path: "category", canActivate: [AuthGuard], loadChildren: () => import('./modules/category/category.module').then(m=>m.CategoryModule)},
  {path: "user", loadChildren: () => import('./modules/user/user.module').then(m=>m.UserModule)},
  {path: "author", canActivate: [AuthGuard], loadChildren: () => import('./modules/author/author.module').then(m=>m.AuthorModule)},
  {path: '404', component: NotFoundComponent},
  {path: '**', redirectTo: '/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
