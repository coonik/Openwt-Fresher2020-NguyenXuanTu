import { AuthGuard } from './../../shared/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { UserManagementComponent } from './pages/user-management/user-management.component';

const routes: Routes = [
  {
    path: '', canActivate: [AuthGuard],
    component: UserManagementComponent
  },
  {path: "auth", component: LoginComponent},
  {path: "logout", component: LoginComponent},
  {path: "profile", canActivate: [AuthGuard], component: ProfileComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
