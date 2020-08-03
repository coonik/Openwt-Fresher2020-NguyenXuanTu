import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AuthorEditComponent } from './pages/author-edit/author-edit.component';
import { AuthorRoutingModule } from "./author-routing.module";

@NgModule({
  imports: [
    CommonModule,
    AuthorRoutingModule
  ],
  declarations: [AuthorEditComponent]
})

export class AuthorModule {}
