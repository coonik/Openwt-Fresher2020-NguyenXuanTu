import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AuthorEditComponent } from './pages/author-edit/author-edit.component';
import { AuthorRoutingModule } from "./author-routing.module";
import { AlifeFileToBase64Module } from 'alife-file-to-base64';

@NgModule({
  imports: [
    CommonModule,
    AuthorRoutingModule,
    AlifeFileToBase64Module
  ],
  declarations: [AuthorEditComponent]
})

export class AuthorModule {}
