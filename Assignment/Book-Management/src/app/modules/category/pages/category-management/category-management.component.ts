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
  categoryData: any;
  searchFormControl = new FormControl();
  categoriesObs$: Observable<any>;
  user: User;
  loading: boolean = false;
  constructor(private categoryService: CategoryService,
    private dialog: MatDialog,
    private messageDialogService: MessageDialogService,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("loginData")).user;
    this.categoriesObs$ = this.categoryService.getAllCategories();
    this.categoriesObs$.subscribe(val => this.categoryData = val);
    this.searchFormControl.valueChanges
      .pipe(debounceTime(1000))
      .subscribe(val => {
        this.categoryService.searchCategoryByName(val).subscribe(value => {
          this.dataSource = value;
        });
      })
  }

  openDialog(id: number = null, name: string = "", description: string = "") {
    const dialogRef = this.dialog.open(CategoryDialog, {data: {
      id, name, description
    }});

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loading = true;
        id ? this.categoryService.updateCategory(id, result.name, result.description).subscribe(() => {
          this.dataSource = this.categoryData.map(x => {
            if (x.id === id) {
              x.name = result.name;
              x.description = result.description
            }
            return x;
          });
          this.loading = false;

          this._snackBar.open(`This category has been Updated!`, "Ok", {
            duration: 5000,
          });
        }) : this.categoryService.createCategory(result.name, result.description).subscribe((val) => {
          this.categoryData = [val,...this.categoryData];
          this.dataSource = this.categoryData;
          this.loading = false;

          this._snackBar.open(`This category has been Created!`, "Ok", {
            duration: 5000,
          });
        })
      };
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
          this.dataSource = this.categoryData.filter(x => x.id !== id);
          this.categoryData = this.categoryData.filter(x => x.id !== id);
        }
      })
  }
}
@Component({
  selector: 'dialog-content-example-dialog',
  template: `
            <div class="container">
              <h2> {{ data.id ? "Edit " : "Create " }} Category </h2>
              <div mat-dialog-content [formGroup]="categoryForm">
                <p>The Category Name Input!</p>
                <mat-form-field class="width-100">
                  <mat-label>Category Name</mat-label>
                  <input matInput required [(ngModel)]="data.name" formControlName="name" autofocus>
                </mat-form-field>

                <p>The Category Description Input!</p>
                <mat-form-field class="width-100 textarea" appearance="outline">
                  <mat-label>Category Description</mat-label>
                  <textarea matInput [(ngModel)]="data.description" formControlName="description"></textarea>
                </mat-form-field>
              </div>
              <div mat-dialog-actions>
                <button mat-button color="warn" [mat-dialog-close]="data" [disabled]="!categoryForm.valid || noChange">{{ data.id ? "Edit" : "Create" }}</button>
                <button mat-button (click)="onNoClick()">Cancel</button>
              </div>
            </div>
            `,
  styles: [`
    textarea {
      height: 190px;
      max-height: 190px;
    }
    .textarea {
      height: 249px;
    }
    .container {
      width: 30vw;
      height: 60vh;
    }
    .height-30 {
      height: 70%;
    }
    .ng-star-inserted {
      width: 80%;
      height: 100%;
    }
    .width-100 {
      width: 100%;
    }
    .mat-dialog-actions {
      flex-direction: row-reverse;
    }
  `]
})
export class CategoryDialog implements OnInit{
  dataDefault = {
    name: "",
    description: ""
  };
  noChange: boolean = true;
  categoryForm: FormGroup = new FormGroup({name: new FormControl(null,[Validators.required, Validators.minLength(6), Validators.maxLength(30)]), description: new FormControl("",[Validators.minLength(6), Validators.maxLength(100)])});

  constructor(
    public dialogRef: MatDialogRef<CategoryDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private _snackBar: MatSnackBar) {}

  ngOnInit() {
    this.dataDefault.name = this.data.name;
    this.dataDefault.description = this.data.description;
    this.categoryForm.valueChanges.pipe(debounceTime(200)).subscribe( val => {
      if (this.data.id) {
        this.noChange = true;
        if (val.name !== this.dataDefault.name || val.description !== this.dataDefault.description)
          this.noChange = false;
      } else {
        this.noChange = false;
      }

      if (!this.categoryForm.valid && this.categoryForm.get("name").touched) {
        let errorString = "";
        let nameError = this.categoryForm.get("name").errors;
        let descriptionError = this.categoryForm.get("description").errors;
        errorString = nameError?.required ? "Name is required" : nameError?.maxlength ? "Name is only allowed up to 30 characters" : nameError?.minlength ? "Name must be at least 6 characters" : "";
        errorString += errorString !== "" && descriptionError ? "; " : "";
        errorString += descriptionError?.maxlength ? "Description is only allowed up to 100 characters" : descriptionError?.minlength ? "Description must be at least 6 characters" : "";
        this._snackBar.open(`${errorString}!`, "Ok", {
          duration: 5000,
        });
      }
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
