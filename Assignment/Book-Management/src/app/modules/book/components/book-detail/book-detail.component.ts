import { Component, OnInit } from '@angular/core';
import { BookService, bookDb } from '../../../../core/services/book.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthorService } from '../../../../core/services/author.service';
import { CategoryService } from '../../../../core/services/category.service';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import { DeleteConfirmDialog } from 'src/app/shared/components/delete-confirm-dialog/delete-confirm-dialog.component';
import { MessageDialogService } from '../../../../shared/services/message-dialog.service'

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  bookObs$: Observable<any>;
  authorObs$: Observable<any>;
  categoryObs$: Observable<any>;
  onEditMode: boolean = false;
  onCreateMode: boolean = false;
  bookId: number;
  bookData: any;
  changeImage: boolean;
  noChange: boolean;
  cover: string;
  image: any;
  user: object;
  bookDetailForm: FormGroup = new FormGroup({
    name: new FormControl(),
    author: new FormControl(),
    publisher: new FormControl(),
    year: new FormControl(),
    categories: new FormControl(),
    price: new FormControl(),
    description: new FormControl(),
    cover: new FormControl()
  });

  constructor(private bookService: BookService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authorService: AuthorService,
    private categoryService: CategoryService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private messageDialogService: MessageDialogService) {}

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("loginData")).user;
    this.bookId = Number.parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    this.authorObs$ = this.authorService.getAllAuthor();
    this.categoryObs$ = this.categoryService.getAllCategories();

    this.checkValidForm();
    if (!this.bookId) {
      this.onCreateMode = true;
      this.setEditModeForm();
    } else {
      this.bookObs$ = this.bookService.getBook(this.bookId);
      this.bookObs$.subscribe(
        val => {
          this.bookData = val;
          this.cover = val.cover;
          this.setFormValue(val);
          this.bookDetailForm.disable();
        },
        err => {
          if (!this.onCreateMode)
            this.router.navigate(['../404']);
        }
      );
    }

    this.bookDetailForm.get("name").setValidators([Validators.required]);
    this.bookDetailForm.get("author").setValidators([Validators.required]);
    this.bookDetailForm.get("publisher").setValidators([Validators.required]);
    this.bookDetailForm.get("price").setValidators([Validators.min(0), Validators.required]);
    this.bookDetailForm.get("year").setValidators([Validators.min(1000), Validators.max(new Date().getFullYear())]);
    this.bookDetailForm.valueChanges.subscribe( val => {
      if (this.bookData) {
        this.noChange = false;

        let categoriesId: number[] = [];
        this.bookData.categories.forEach(val => {
          categoriesId.push(val.id)
        })

        if (val.name === this.bookData.name && this.bookData.price === val.price && this.bookData.year === val.year && this.bookData.author.id === val.author && this.bookData.publisher === val.publisher && JSON.stringify(categoriesId) === JSON.stringify(val.categories) && this.bookData.description === val.description && !this.changeImage)
          this.noChange = true;
      }
    })
  }

  setFormValue(val: any) {
    let categoriesId: number[] = [];
    val.categories.forEach(val => {
      categoriesId.push(val.id)
    })

    this.bookService.getAuthor(val.author.id);
    this.bookService.getCategories(categoriesId);
    this.bookDetailForm.setValue({
      name: val.name,
      author: val.author.id,
      publisher: val.publisher,
      year: val.year === 0 ? null : val.year,
      categories: categoriesId,
      price: val.price,
      description: val.description ? val.description : "None",
      cover: null
    });
  }

  setEditModeForm() {
    this.onEditMode = !this.onEditMode;

    if (!(this.onEditMode || this.onCreateMode)) {
      this.bookDetailForm.disable();
      this.setFormValue(this.bookData);
    } else {
      this.bookDetailForm.enable();
    }

    this._snackBar.dismiss();
  }

  checkValidForm() {
    this.bookDetailForm.get('price').statusChanges.subscribe(val => {
      if (val === 'INVALID')
        this._snackBar.open("PRICE: Please enter a positive value and it is required!", "Ok", {
          duration: 5000,
        });
    });
    this.bookDetailForm.get('name').statusChanges.subscribe(val => {
      if (val === 'INVALID')
        this._snackBar.open("TITLE is required!", "Ok", {
          duration: 5000,
        });
    });
    this.bookDetailForm.get('author').statusChanges.subscribe(val => {
      if (val === 'INVALID')
        this._snackBar.open("AUTHOR is required!", "Ok", {
          duration: 5000,
        });
    });
    this.bookDetailForm.get('publisher').statusChanges.subscribe(val => {
      if (val === 'INVALID')
        this._snackBar.open("PUBLISHER is required!", "Ok", {
          duration: 5000,
        });
    });
  }

  onClickEdit() {
    this.setEditModeForm();
  }

  onClickCreate() {
    let data = this.bookDetailForm.value;
    console.log(data);


    let bookDb: bookDb = {
      bookName: data.name, price: data.price, year: data.year, authorId: data.author, publisher: data.publisher, cover: this.changeImage ? this.cover.split(";base64,")[1] : null, categoriesId: data.categories, description: data.description
    }
    this.bookService.createBook( bookDb ).subscribe( res => {
      this.router.navigate([`./book/${res["id"]}/detail`]);
    });
    this._snackBar.open("This book has been Created!", "Ok", {
      duration: 5000,
    });
  }

  onClickSave() {
    let data = this.bookDetailForm.value;
    let bookDb: bookDb = {
      bookName: data.name, price: data.price, year: data.year, authorId: data.author, publisher: data.publisher, cover: this.changeImage ? this.cover.split(";base64,")[1] : null, categoriesId: data.categories, description: data.description
    }
    this.bookService.updateBook(this.bookId, bookDb ).subscribe(val => {
      this.setFormValue(val);
    });
    this._snackBar.open("This book has been Edited!", "Ok", {
      duration: 5000,
    });
    this.setEditModeForm();
  }

  onClickDelete() {
    const dialogRef = this.dialog.open(DeleteConfirmDialog);
    this.messageDialogService.changeMessage("book");
    dialogRef.afterClosed()
      .subscribe(result => {
        if (result) {
          this.bookService.deleteBook(this.bookId).subscribe();
          this._snackBar.open("This book has been Deleted", "Ok", {
            duration: 5000,
          });
          this.router.navigate(['./book']);
        }
      })
  }

  onSelected(event: any) {
    let temp = event.value;
    if (Number.isInteger(temp)) {
      this.bookService.getAuthor(temp);
    } else {
      this.bookService.getCategories(temp);
    }
  }

  onFocusYearInput() {
    this.bookDetailForm.get("year").markAsUntouched();
  }

  onFocusOutYearInput() {
    let temp = this.bookDetailForm.controls["year"];
    if (temp.value === null || (temp.invalid && temp.touched &&temp.dirty)) {
      temp.setErrors(Validators.required);
      setTimeout(() => {
        temp.setValue(this.bookData.year);
      }, 2000);

      this._snackBar.open(`YEAR Valid in the range of 1000-${new Date().getFullYear()}!`, "Ok", {
        duration: 5000,
      });
    }
  }

  onFocusPriceInput() {
    this.bookDetailForm.get("price").markAsUntouched();
  }

  onFocusOutPriceInput() {
    let temp = this.bookDetailForm.controls["price"];
    if (temp.value === null || (temp.invalid && temp.touched &&temp.dirty)) {
      temp.setErrors(Validators.required);
      setTimeout(() => {
        temp.setValue(this.bookData.price);
      }, 2000);
      this._snackBar.open(`PRICE: Please enter a positive value and it is required!`, "Ok", {
        duration: 5000,
      });
    }
  }

  imageChange(event: any) {
    this.changeImage = false;
    var reader = new FileReader();
    let checkFile = event.target.files[0].size/1024/1000 < 10 && event.target.files[0].type.toString().slice(0,5) === "image";
    reader.onload = (event:any) => {
      this.cover = reader.result.toString();
    }
    if (checkFile) {
      this.changeImage = true;
      this.image = reader.readAsDataURL(event.target.files[0])
    } else {
      this._snackBar.open(`Image File Error: Please select an image file and size <10Mb`, "Ok", {
        duration: 5000,
      });;
    }
  }

}


