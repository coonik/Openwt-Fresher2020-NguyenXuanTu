import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './modules/user/pages/login/login.component';
import { ProfileComponent } from './modules/user/pages/profile/profile.component';
import { CategoryManagementComponent } from './modules/category/pages/category-management/category-management.component';
import { AuthorManagementComponent } from './modules/author/pages/author-management/author-management.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileComponent,
    CategoryManagementComponent,
    AuthorManagementComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
