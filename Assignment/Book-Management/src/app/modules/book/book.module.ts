import { NgModule } from "@angular/core";
import { BookListComponent } from "./pages/book-list/book-list.component";
import { CommonModule } from "@angular/common";
import { BookRoutingModule } from "./book-routing.module";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "../../app-routing.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BookDetailComponent } from './components/book-detail/book-detail.component';

@NgModule({
  imports: [
    CommonModule,
    BookRoutingModule,
  ],
  declarations: [
    // BookListComponent,
    // BookDetailComponent
  ]
})

export class BookModule {}
