import { BookListComponent } from './modules/book/pages/book-list/book-list.component';
import { BookEditComponent } from './modules/book/components/book-edit/book-edit.component';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FooterComponent } from './shared/components/footer/footer.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './modules/user/pages/login/login.component';
import { ProfileComponent } from './modules/user/pages/profile/profile.component';
import { CategoryManagementComponent, CategoryDialog } from './modules/category/pages/category-management/category-management.component';
import { AuthorManagementComponent } from './modules/author/pages/author-management/author-management.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule, MatHeaderRowDef } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DataSource } from '@angular/cdk/table';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { BookDetailComponent } from './modules/book/components/book-detail/book-detail.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DeleteConfirmDialog } from './shared/components/delete-confirm-dialog/delete-confim-dialog.component'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileComponent,
    CategoryManagementComponent,
    AuthorManagementComponent,
    HeaderComponent,
    FooterComponent,
    BookListComponent,
    BookEditComponent,
    NotFoundComponent,
    BookDetailComponent,
    DeleteConfirmDialog,
    CategoryDialog
  ],
  entryComponents: [
    DeleteConfirmDialog,
    CategoryDialog
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDialogModule,
    MatSnackBarModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
