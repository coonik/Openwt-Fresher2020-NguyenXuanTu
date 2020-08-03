import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AuthorRoutingModule } from "./author-routing.module";
import { AlifeFileToBase64Module } from 'alife-file-to-base64';

@NgModule({
  imports: [
    CommonModule,
    AuthorRoutingModule,
    AlifeFileToBase64Module
  ]
})

export class AuthorModule {}
