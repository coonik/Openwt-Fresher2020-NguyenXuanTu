import { Component, OnInit } from '@angular/core';
import { BookService } from '../../../../core/services/book.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthorService } from '../../../../core/services/author.service';
import { CategoryService } from '../../../../core/services/category.service';

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
  bookId: number;
  bookData: any;
  bookDetailForm: FormGroup = new FormGroup({
    name: new FormControl(),
    author: new FormControl(),
    publisher: new FormControl(),
    year: new FormControl(),
    categories: new FormControl(),
    price: new FormControl(),
    createAt: new FormControl(),
    updateAt: new FormControl(),
    description: new FormControl(),
  });

  constructor(private bookService: BookService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authorService: AuthorService,
    private categoryService: CategoryService) {}

  ngOnInit() {
    this.bookId = Number.parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    this.bookObs$ = this.bookService.getBook(this.bookId);
    this.authorObs$ = this.authorService.getAllAuthor();
    this.categoryObs$ = this.categoryService.getAllCategories();
    this.bookService.getBook(this.bookId).subscribe(
      val => {
          this.bookData = val;
          let categoryId = [];
          val.categories.forEach(category => {
            categoryId.push(Number.parseInt(category.id));
          });


          this.bookDetailForm = new FormGroup({
          name: new FormControl({value: val.name, disabled: !this.onEditMode}),
          author: new FormControl({value: val.author.id, disabled: !this.onEditMode}),
          publisher: new FormControl({value: val.publisher, disabled: !this.onEditMode}),
          year: new FormControl({value: val.year, disabled: !this.onEditMode}),
          categories: new FormControl({value: categoryId, disabled: !this.onEditMode}),
          price: new FormControl({value: val.price, disabled: !this.onEditMode}),
          createAt: new FormControl({value: val.createAt ? val.createAt : "None", disabled: !this.onEditMode}),
          updateAt: new FormControl({value: val.updateAt ? val.updateAt : "None", disabled: !this.onEditMode}),
          description: new FormControl({value: val.description ? val.description : "None", disabled: !this.onEditMode}),
        });
      },
      err => {
        this.router.navigate(['../404']);
      }
    );

  }

  onClickEdit() {
    this.onEditMode = !this.onEditMode;
    let categoryId = [];
    this.bookData.categories?.forEach(category => {
      categoryId.push(category.id);
    });
    this.bookDetailForm = new FormGroup({
      name: new FormControl({value: this.bookData.name, disabled: !this.onEditMode}),
      author: new FormControl({value: this.bookData.author.id, disabled: !this.onEditMode}),
      publisher: new FormControl({value: this.bookData.publisher, disabled: !this.onEditMode}),
      year: new FormControl({value: this.bookData.year, disabled: !this.onEditMode}),
      categories: new FormControl({value: categoryId, disabled: !this.onEditMode}),
      price: new FormControl({value: this.bookData.price, disabled: !this.onEditMode}),
      createAt: new FormControl({value: this.bookData.createAt ? this.bookData.createAt : "None", disabled: !this.onEditMode}),
      updateAt: new FormControl({value: this.bookData.updateAt ? this.bookData.updateAt : "None", disabled: !this.onEditMode}),
      description: new FormControl({value: this.bookData.description ? this.bookData.description : "None", disabled: !this.onEditMode}),
    });
  }

  onClickSave() {
    console.log(this.bookDetailForm);

  }

  onClickDelete() {
    let kt = confirm("Delete this book ?");
      if (kt) {
        this.bookService.deleteBook(this.bookId).subscribe();
        this.router.navigate(['./book']);
      }
  }

}
