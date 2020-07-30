import { Component, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryService } from 'src/app/core/services/category.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
export interface DialogData {
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

  openDialog() {
    const dialogRef = this.dialog.open(CategoryDialog, {width: '250px'});

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
@Component({
  selector: 'dialog-content-example-dialog',
  template: `<h2> ${ true ? "Edit " : "Create " } Category </h2>
              <div mat-dialog-content>
                <p>What's your favorite animal?</p>
                <mat-form-field>
                  <mat-label>Favorite Animal</mat-label>
                  <input matInput value="tu">
                </mat-form-field>
              </div>
              <div mat-dialog-actions>
                <button mat-button (click)="onNoClick()">Cancel</button>
                <button mat-button [mat-dialog-close]="" cdkFocusInitial>Ok</button>
              </div>
                `,
})
export class CategoryDialog {

  constructor(
    public dialogRef: MatDialogRef<CategoryDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
