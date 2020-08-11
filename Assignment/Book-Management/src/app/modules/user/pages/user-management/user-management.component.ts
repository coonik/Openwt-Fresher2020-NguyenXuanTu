import { PageEvent } from '@angular/material/paginator';
import { DeleteConfirmDialog } from 'src/app/shared/components/delete-confirm-dialog/delete-confirm-dialog.component';
import { MessageDialogService } from 'src/app/shared/services/message-dialog.service';
import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/auth.guard';
import { UserService } from 'src/app/core/services/user.service';
import { debounceTime } from 'rxjs/operators';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  dataSource: Promise<[]> | null=null;
  searchFormControl = new FormControl();
  userObs$: Observable<any>;
  user: User;
  userData: any;
  totalItems: number;
  pageSize: number;
  pageNumber: number;
  sortBy: string;
  descending: boolean;
  displayedColumns: string[] = ['position', 'name', 'username', 'role', 'CRUD'];
  constructor(private userService: UserService,
    private dialog: MatDialog,
    private messageDialogService: MessageDialogService,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.descending = false;
    this.sortBy = "name";
    this.userObs$ = this.userService.getUserPagination();
    this.userObs$.subscribe(val => {
      localStorage.setItem("userData",JSON.stringify(val));
    });
    this.userObs$.subscribe(
      val => {
        this.totalItems = this.userService.totalItems;
      }
    )
    this.searchFormControl.valueChanges
      .pipe(debounceTime(1000))
      .subscribe(val => {
        this.userService.searchUserByName(val).subscribe(value => {
          this.dataSource = value;
        });
      })
  }

  openDialog(id: number = null, username: string = "", name: string = "", password: string = "", role: string = "") {
    const dialogRef = this.dialog.open(UserDialog, {width: '250px', data: {
      id, name, username, role, password
    }});

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userData = JSON.parse(localStorage.getItem("userData"));
        this.dataSource = this.userData;
      }
    });
  }

  onDelete(id: number) {
    this.messageDialogService.changeMessage("user");
    const dialogRef = this.dialog.open(DeleteConfirmDialog);
    dialogRef.afterClosed()
      .subscribe(result => {
        if (result) {
          this.userService.deleteUser(id).subscribe();
          this._snackBar.open("This user has been Deleted", "Ok", {
            duration: 5000,
          });
          this.dataSource = undefined;
          this.userObs$ = this.userService.getUserPagination();
        }
      })
  }

  sort(sortBy: string) {
    if (sortBy === this.sortBy) {
      this.descending = !this.descending;
    } else {
      this.sortBy = sortBy;
      this.descending = false;
    }
    this.userObs$ = this.userService.getUserPagination(this.pageSize, this.pageNumber, this.sortBy, this.descending);
  }

  pageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageNumber = event.pageIndex+1;
    this.userObs$ = this.userService.getUserPagination(this.pageSize, this.pageNumber, this.sortBy, this.descending);
  }
}

@Component({
  selector: 'dialog-content-example-dialog',
  template: `
              <div>
                <div class="overlay" *ngIf="loading">
                  <div class="center">
                    <mat-progress-spinner style="margin:0 auto;" diameter="80" mode="indeterminate" color="accent">
                    </mat-progress-spinner>
                  </div>
                </div>
                <h2> {{ data.id ? "Edit " : "Create " }} User </h2>
                <div mat-dialog-content [formGroup]="userForm">
                <div *ngIf="!data.id">
                  <p>The Username Input!</p>
                  <mat-form-field>
                    <mat-label>Username</mat-label>
                    <input matInput required [(ngModel)]="data.username" formControlName="username">
                  </mat-form-field>
                </div>

                  <p>The Name Input!</p>
                  <mat-form-field>
                    <mat-label>Name</mat-label>
                    <input matInput required [(ngModel)]="data.name" formControlName="name">
                  </mat-form-field>

                  <div *ngIf="!data.id">
                    <p>The Password Input!</p>
                    <mat-form-field>
                      <mat-label>Password</mat-label>
                      <input matInput required [(ngModel)]="data.password" formControlName="password">
                    </mat-form-field>
                  </div>

                  <mat-form-field appearance="fill">
                    <mat-label>Role</mat-label>
                    <mat-select disableRipple [(ngModel)]="data.role" (selectionChange)="onSelected($event)" formControlName="role">
                      <mat-option value="USER">User</mat-option>
                      <mat-option value="EDITOR">Editor</mat-option>
                    </mat-select>
                  </mat-form-field>
                </div>
                <div mat-dialog-actions>
                  <button mat-button (click)="onNoClick()">Cancel</button>
                  <button mat-button color="warn" (click)="sendRequest()" [disabled]="!userForm.valid || noChange">{{ data.id ? "Edit" : "Create" }}</button>
                </div>
              </div>
            `,
  styles: [`
  .center {
    position: absolute;
    top: 50%;
    left: 50%;
    -moz-transform: translateX(-50%) translateY(-50%);
    -webkit-transform: translateX(-50%) translateY(-50%);
    transform: translateX(-50%) translateY(-50%);
  }

  .overlay{
    height: 100%;
    width:100%;
    background-color:rgba(0, 0, 0, 0.286);
    z-index:    10;
    top:        0;
    left:       0;
    position:   absolute;
  }
  `]
})
export class UserDialog implements OnInit{
  dataDefault: any;
  noChange: boolean;
  userData: any;
  loading: boolean = false;
  userForm: FormGroup = this.data.id ? new FormGroup({
    name: new FormControl("",[Validators.required, Validators.minLength(6), Validators.maxLength(30)]),
    role: new FormControl("USER")
  }) : new FormGroup({
    username: new FormControl("",[Validators.required, Validators.minLength(6), Validators.maxLength(30)]),
    password: new FormControl("",[Validators.required, Validators.minLength(6), Validators.maxLength(30)]),
    name: new FormControl("",[Validators.required, Validators.minLength(6), Validators.maxLength(30)]),
    role: new FormControl()
  });

  constructor(
    public dialogRef: MatDialogRef<UserDialog>,
    @Inject(MAT_DIALOG_DATA) public data: User,
    private _snackBar: MatSnackBar,
    private userService: UserService) {}

  ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem("userData"));
    if (this.data.id) {
      this.dataDefault = {
        name: this.data.name,
        role: this.data.role
      };
      this.userForm.markAllAsTouched();
      this.userForm.valueChanges
        .pipe(debounceTime(300))
        .subscribe( val => {
          this.noChange = false;
          if (val.name === this.dataDefault.name && val.role === this.dataDefault.role)
            this.noChange = true;
          if (!this.userForm.valid) {
            let errorString = "";
            let nameError = this.userForm.get("name").errors;
            errorString = nameError?.required ? "Name is required" : nameError?.maxlength ? "Name is only allowed up to 30 characters" : nameError?.minlength ? "Name must be at least 6 characters" : "";
            this._snackBar.open(`${errorString}!`, "Ok", {
                duration: 5000,
              });
          }
        });
    } else {
      this.userForm.valueChanges
        .pipe(debounceTime(1000))
        .subscribe(val => {
          if (!this.userForm.valid && this.userForm.get("username").touched) {
            let errorString = "";
            let usernameError = this.userForm.get("username").errors;
            let nameError = this.userForm.get("name").errors;
            let passwordError = this.userForm.get("password").errors;
            errorString = usernameError?.required ? "Username is required" : usernameError?.maxlength ? "Username is only allowed up to 30 characters" : usernameError?.minlength ? "Username must be at least 6 characters" : "";
            errorString += errorString !== "" && nameError ? "; " : "";
            errorString += nameError?.required ? "Name is required" : nameError?.maxlength ? "Name is only allowed up to 30 characters" : nameError?.minlength ? "Name must be at least 6 characters" : "";
            errorString += errorString !== "" && passwordError ? "; " : "";
            errorString += passwordError?.required ? "Password is required" : passwordError?.maxlength ? "Password is only allowed up to 30 characters" : passwordError?.minlength ? "Password must be at least 6 characters" : "";
            this._snackBar.open(`${errorString}!`, "Ok", {
              duration: 5000,
            });
          }
        })
      this.data.role = "USER";
    };
  }

  sendRequest() {
    this.loading = true;
    this.data.id ? this.userService.updateUser(Number.parseInt(this.data.id), this.data).subscribe(val => {
      this.dialogRef.close(true);
      this.userData = this.userData.map(x => {
        if (x.id === this.data.id) {
          x = val
        }
        return x;
      });
      localStorage.setItem("userData", JSON.stringify(this.userData));
      this.loading = false;

      this._snackBar.open("User has been Update!", "Ok", {
        duration: 2000,
      });
    }, err => {
      this.loading = false;
      this._snackBar.open(err.error.message, "Ok", {
        duration: 2000,
      });
    }) : this.userService.createUser(this.data).subscribe(val => {
      this.dialogRef.close(true);
      this.userData.pop();
      this.userData = [val,...this.userData];
      localStorage.setItem("userData", JSON.stringify(this.userData));
      this.loading = false;

      this._snackBar.open("User has been Created!", "Ok", {
        duration: 2000,
      });
    }, err => {
      this.loading = false;
      this._snackBar.open(err.error.message, "Ok", {
        duration: 2000,
      });
    });
  }

  onSelected(event: any) {
    this.data.role = event.value;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
