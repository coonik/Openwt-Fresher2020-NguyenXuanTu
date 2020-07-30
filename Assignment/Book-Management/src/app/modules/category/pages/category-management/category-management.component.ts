import { Component, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryService } from 'src/app/core/services/category.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormControl, Validators, FormGroup } from '@angular/forms';
export interface DialogData {
  id?: number;
  name: string;
  description: string;
}

@Component({
  selector: 'app-category-management',
  templateUrl: './category-management.component.html',
  styleUrls: ['./category-management.component.css']
})
export class CategoryManagementComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'description', 'book', 'CRUD'];
  categoriesObs$: Observable<any>;
  constructor(private categoryService: CategoryService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.categoriesObs$ = this.categoryService.getAllCategories();
  }

  openDialog(id: number = null, name: string = "", description: string = "") {
    const dialogRef = this.dialog.open(CategoryDialog, {width: '250px', data: {
      id, name, description
    }});

    dialogRef.afterClosed().subscribe(result => {
      let kt = true;
      result ? id ? this.categoryService.updateCategory(id, result.name, result.description).subscribe() : this.categoryService.createCategory(result.name, result.description).subscribe() : kt = false;
      if (kt)
        this.categoriesObs$ = this.categoryService.getAllCategories();
    });
  }
}
@Component({
  selector: 'dialog-content-example-dialog',
  template: `<h2> {{ data.id ? "Edit " : "Create " }} Category </h2>
              <div mat-dialog-content [formGroup]="categoryForm">
                <p>The Category Name Input!</p>
                <mat-form-field>
                  <mat-label>Category Name</mat-label>
                  <input matInput [autofocus] required [(ngModel)]="data.name" formControlName="name">
                </mat-form-field>

                <p>The Category Description Input!</p>
                <mat-form-field>
                  <mat-label>Category Description</mat-label>
                  <input matInput [(ngModel)]="data.description" formControlName="description">
                </mat-form-field>
              </div>
              <div mat-dialog-actions>
                <button mat-button (click)="onNoClick()">Cancel</button>
                <button mat-button [mat-dialog-close]="data" [disabled]="!categoryForm.valid" cdkFocusInitial>{{ data.id ? "Edit" : "Create" }}</button>
              </div>
            `
})
export class CategoryDialog implements OnInit{
  categoryForm: FormGroup = new FormGroup({name: new FormControl(Validators.required), description: new FormControl()});

  constructor(
    public dialogRef: MatDialogRef<CategoryDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  ngOnInit() {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
