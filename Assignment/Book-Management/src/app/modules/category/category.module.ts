
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CategoryRoutingModule } from "./category-routing.module"
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  imports: [
    CommonModule,
    CategoryRoutingModule,
    MatDialogModule
  ],
  declarations: [
  ]
})

export class CategoryModule {}
