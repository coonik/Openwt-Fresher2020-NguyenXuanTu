import { AuthorService } from './../../../../core/services/author.service';
import { Component, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { MessageDialogService } from 'src/app/shared/services/message-dialog.service';
import { DeleteConfirmDialog } from 'src/app/shared/components/delete-confirm-dialog/delete-confirm-dialog.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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
  authorsObs$: Observable<any>;
  displayedColumns: string[] = ['position', 'name', 'website', 'birthday', 'books', 'CRUD'];

  constructor(private authorService: AuthorService,
    private dialog: MatDialog,
    private messageDialogService: MessageDialogService,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.authorsObs$ = this.authorService.getAllAuthor();
  }

  openDialog(id: number = null, name: string = "", website: string = "", birthday: string = null, cover: string) {
    const dialogRef = this.dialog.open(AuthorDialog, {width: '550px', data: {
      id, name, website: website === "None" ? null : website, birthday, cover
    }});

    dialogRef.afterClosed().subscribe(result => {
      let kt = true;
      result ? id ? this.authorService.updateAuthor(id, result.name, result.website, result.birthday, result.cover).subscribe() : this.authorService.createAuthor(result.name, result.website, result.birthday, result.cover).subscribe() : kt = false;
      if (kt)
        this.authorsObs$ = this.authorService.getAllAuthor();
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
          this.authorsObs$ = this.authorService.getAllAuthor();
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
                    <input matInput type="datetime-local" [(ngModel)]="data.birthday" formControlName="birthday">
                  </mat-form-field>

                  <input type="file" id="file" name="file" class="inputfile" accept="image/x-png,image/gif,image/jpeg" (change)="imageChange($event)" />
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
  authorForm: FormGroup = new FormGroup({name: new FormControl(Validators.required), website: new FormControl(), birthday: new FormControl(), cover: new FormControl()});

  constructor(
    public dialogRef: MatDialogRef<AuthorDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  ngOnInit() {
    if (!this.data.website)
      this.data.website = "None";
    this.data.birthday = this.data.birthday?.slice(0,16);
    this.dataDefault.name = this.data.name;
    this.dataDefault.website = this.data.website;
    this.dataDefault.birthday = this.data.birthday;
    this.dataDefault.cover = this.data.cover;
    this.cover = this.dataDefault.cover;

    this.dataDefault.birthday = this.dataDefault.birthday;

    //unfix
    this.data.id ? this.authorForm.valueChanges.subscribe( val => {
      this.noChange = false;
      if (val.name === this.dataDefault.name && val.website === this.dataDefault.website && val.cover === this.dataDefault.cover && val.birthday === this.dataDefault.birthday)
        this.noChange = true;
    }) : null;
  }

  imageChange(event: any) {
    var reader = new FileReader();

    reader.onload = (event:any) => {
      this.cover = event.target.result;
      this.data.cover = reader.result.slice(22).toString();
      console.log(this.data.cover);

    }

    reader.readAsDataURL(event.target.files[0]);
    console.log(this.data.cover);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
