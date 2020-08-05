import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UserRoutingModule } from "./user-routing.module";
import { UserManagementComponent } from './pages/user-management/user-management.component'

@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})

export class UserModule {}
