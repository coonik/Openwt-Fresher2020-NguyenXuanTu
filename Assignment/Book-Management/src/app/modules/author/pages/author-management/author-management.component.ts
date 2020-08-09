import { User } from './../../../../shared/auth.guard';
import { AuthorService } from './../../../../core/services/author.service';
import { Component, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { MessageDialogService } from 'src/app/shared/services/message-dialog.service';
import { DeleteConfirmDialog } from 'src/app/shared/components/delete-confirm-dialog/delete-confirm-dialog.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs/operators';
export interface DialogData {
  id?: number;
  name: string;
  website: string;
  birthday: string;
  cover: string;
}
@Component({
  selector: 'app-author-management',
  templateUrl: './author-management.component.html',
  styleUrls: ['./author-management.component.css']
})
export class AuthorManagementComponent implements OnInit {
  dataSource: Promise<[]> | null=null;
  searchFormControl = new FormControl();
  authorsObs$: Observable<any>;
  authorData: any;
  user: User;
  displayedColumns: string[] = ['position', 'name', 'website', 'birthday', 'books', 'CRUD'];

  constructor(private authorService: AuthorService,
    private dialog: MatDialog,
    private messageDialogService: MessageDialogService,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("loginData")).user;
    this.authorsObs$ = this.authorService.getAllAuthor();
    this.authorsObs$.subscribe(val => this.authorData = val);
    this.searchFormControl.valueChanges
      .pipe(debounceTime(1000))
      .subscribe(val => {
        this.authorService.searchAuthorByName(val).subscribe(value => {
          this.dataSource = value;
        });
      })
  }

  openDialog(id: number = null, name: string = "", website: string = "", birthday: string = null, cover: string) {
    const dialogRef = this.dialog.open(AuthorDialog, {width: '550px', data: {
      id, name, website: website === "None" ? null : website, birthday, cover
    }});

    dialogRef.afterClosed().subscribe(result => {
      result ? id ? this.authorService.updateAuthor(id, result.name, result.website, result.birthday, result.cover === cover ? null : result.cover).subscribe(val => {
        this.dataSource = this.authorData.map(x => {
          if (x.id === id) {
            x = val;
          }
          return x;
        });

        this._snackBar.open(`This author has been Update!`, "Ok", {
          duration: 2000,
        });
      }) : this.authorService.createAuthor(result.name, result.website, result.birthday, result.cover).subscribe(val => {
        this.authorData = [val,...this.authorData];
        this.dataSource = this.authorData;

        this._snackBar.open(`This author has been Create!`, "Ok", {
          duration: 5000,
        });
      }) : null;
    });
  }

  onDelete(id: number) {
    this.messageDialogService.changeMessage("category");
    const dialogRef = this.dialog.open(DeleteConfirmDialog);
    dialogRef.afterClosed()
      .subscribe(result => {
        if (result) {
          this.authorService.deleteAuthor(id).subscribe();
          this._snackBar.open("This author has been Deleted", "Ok", {
            duration: 5000,
          });
          this.dataSource = this.authorData.filter(x => x.id !== id);
          this.authorData = this.authorData.filter(x => x.id !== id);
        }
      })
  }
}

@Component({
  selector: 'dialog-content-example-dialog',
  template: `<h2> {{ data.id ? "Edit " : "Create " }} Author </h2>
              <div mat-dialog-content [formGroup]="authorForm">
                <div>
                  <p>The Author Name Input!</p>
                  <mat-form-field>
                    <mat-label>Author Name</mat-label>
                    <input matInput required [(ngModel)]="data.name" formControlName="name" autofocus>
                  </mat-form-field>
                  <picture>
                    <source media='(min-width:0px)' srcset="{{cover}}">
                    <img mat-card-image src="" alt="Photo of {{data.name}}">
                  </picture>
                </div>
                <div>
                  <p>The Author Website Input!</p>
                  <mat-form-field>
                    <mat-label>Author Website</mat-label>
                    <input matInput [(ngModel)]="data.website" formControlName="website">
                  </mat-form-field>
                  <p>The Author Birthday Input!</p>
                  <mat-form-field>
                    <mat-label>Author Birthday</mat-label>
                    <input matInput type="date" [(ngModel)]="data.birthday" formControlName="birthday">
                  </mat-form-field>

                  <input type="file" [(ngModel)]="image" id="file" name="file" class="inputfile" accept="image/x-png,image/gif,image/jpeg" (change)="imageChange($event)" formControlName="cover" />
                  <label for="file">Choose Cover</label>

                </div>
              </div>
              <div mat-dialog-actions>
                <button mat-button (click)="onNoClick()">Cancel</button>
                <button mat-button [mat-dialog-close]="data" [disabled]="!authorForm.valid || noChange">{{ data.id ? "Edit" : "Create" }}</button>
              </div>
            `,
  styles: ['.mat-form-field {width: 230px;}','.mat-dialog-content {display:flex}', 'img {width: 200px}',
          `.inputfile {
            width: 0.1px;
            height: 0.1px;
            opacity: 0;
            overflow: hidden;
            position: absolute;
            z-index: -1;
          }

          .inputfile + label {
            font-size: 1.25em;
            font-weight: 700;
            display: inline-block;
            cursor: pointer;
            padding: 5px;
            border-radius: 2px;
          }

          .inputfile:focus + label,
          .inputfile + label:hover {
              background-color: grey;
          }

          .mat-dialog-actions {
            display: flex;
            flex-direction: row-reverse;
          }
          `]
})
export class AuthorDialog implements OnInit{
  dataDefault = {
    name: "",
    website: "",
    birthday: null,
    cover: ""
  };
  cover: string;
  noChange: boolean;
  changeImage: boolean;
  image: any;
  authorForm: FormGroup = new FormGroup({name: new FormControl(Validators.required), website: new FormControl(), birthday: new FormControl("1990-01-01",Validators.required), cover: new FormControl()});

  constructor(
    public dialogRef: MatDialogRef<AuthorDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private _snackBar: MatSnackBar) {}

  ngOnInit() {
    this.changeImage = false;

    if (!this.data.website)
      this.data.website = "None";
    this.data.birthday = this.data.birthday ? this.data.birthday.slice(0,10) : "1990-01-01";
    this.dataDefault.name = this.data.name;
    this.dataDefault.website = this.data.website;
    this.dataDefault.birthday = this.data.birthday;
    this.dataDefault.cover = this.data.cover;
    this.dataDefault.birthday = this.dataDefault.birthday;
    this.cover = this.dataDefault.cover;

    //unfix
    this.data.id ? this.authorForm.valueChanges.subscribe( val => {
      this.noChange = false;
      if (val.name === this.dataDefault.name && val.website === this.dataDefault.website && val.birthday === this.dataDefault.birthday && !this.changeImage)
        this.noChange = true;
    }) : null;
  }

  imageChange(event: any) {
    var reader = new FileReader();
    let checkFile = event.target.files[0].size/1024/1000 < 10 && event.target.files[0].type.toString().slice(0,5) === "image";
    reader.onload = (event:any) => {
      this.cover = event.target.result;
      this.data.cover = reader.result.toString().split(";base64,")[1];
    }
    this.changeImage = true;
    checkFile ? this.image = reader.readAsDataURL(event.target.files[0]) :
    this._snackBar.open(`Image File Error: Please select an image file and size <10Mb`, "Ok", {
      duration: 5000,
    });;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
