import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryManagementComponent } from './pages/category-management/category-management.component'
import { from } from 'rxjs';
const routes: Routes = [
  {
    path: '',
    component: CategoryManagementComponent
  },
  {path: "create", component: CategoryManagementComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
