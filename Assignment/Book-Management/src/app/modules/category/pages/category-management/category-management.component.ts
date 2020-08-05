import { User } from './../../../../shared/auth.guard';
import { Component, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryService } from 'src/app/core/services/category.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { MessageDialogService } from 'src/app/shared/services/message-dialog.service';
import { DeleteConfirmDialog } from 'src/app/shared/components/delete-confirm-dialog/delete-confirm-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { debounceTime } from 'rxjs/operators';
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
  dataSource: Promise<[]> | null=null;
  searchFormControl = new FormControl();
  categoriesObs$: Observable<any>;
  user: User;
  constructor(private categoryService: CategoryService,
    private dialog: MatDialog,
    private messageDialogService: MessageDialogService,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("loginData")).user;
    this.categoriesObs$ = this.categoryService.getAllCategories();

    this.searchFormControl.valueChanges
      .pipe(debounceTime(1000))
      .subscribe(val => {
        this.categoryService.searchCategoryByName(val).subscribe(value => {
          this.dataSource = value;
        });
      })
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

  onDelete(id: number) {
    this.messageDialogService.changeMessage("category");
    const dialogRef = this.dialog.open(DeleteConfirmDialog);
    dialogRef.afterClosed()
      .subscribe(result => {
        if (result) {
          this.categoryService.deleteCategory(id).subscribe();
          this._snackBar.open("This category has been Deleted", "Ok", {
            duration: 5000,
          });
          this.categoriesObs$ = this.categoryService.getAllCategories();
        }
      })
  }
}
@Component({
  selector: 'dialog-content-example-dialog',
  template: `<h2> {{ data.id ? "Edit " : "Create " }} Category </h2>
              <div mat-dialog-content [formGroup]="categoryForm">
                <p>The Category Name Input!</p>
                <mat-form-field>
                  <mat-label>Category Name</mat-label>
                  <input matInput required [(ngModel)]="data.name" formControlName="name" autofocus>
                </mat-form-field>

                <p>The Category Description Input!</p>
                <mat-form-field>
                  <mat-label>Category Description</mat-label>
                  <input matInput [(ngModel)]="data.description" formControlName="description">
                </mat-form-field>
              </div>
              <div mat-dialog-actions>
                <button mat-button (click)="onNoClick()">Cancel</button>
                <button mat-button color="warn" [mat-dialog-close]="data" [disabled]="!categoryForm.valid || noChange">{{ data.id ? "Edit" : "Create" }}</button>
              </div>
            `
})
export class CategoryDialog implements OnInit{
  dataDefault = {
    name: "",
    description: ""
  };
  noChange: boolean;
  categoryForm: FormGroup = new FormGroup({name: new FormControl(Validators.required), description: new FormControl()});

  constructor(
    public dialogRef: MatDialogRef<CategoryDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  ngOnInit() {
    this.dataDefault.name = this.data.name;
    this.dataDefault.description = this.data.description;
    this.data.id ? this.categoryForm.valueChanges.subscribe( val => {
      this.noChange = false;
      if (val.name === this.dataDefault.name && val.description === this.dataDefault.description)
        this.noChange = true;
    }) : null;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
