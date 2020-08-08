import { BookService } from './../../../../core/services/book.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { FormControl, Validators } from '@angular/forms';
import { AuthorService } from '../../../../core/services/author.service';
import { CategoryService } from '../../../../core/services/category.service';
import { MatSelectChange } from '@angular/material/select';
import { debounceTime } from 'rxjs/operators';
export interface BookInterface {

  author: {id: number, name: string, website: string, birthday: Date, cover: string}
  categories: {
    id: number, name: string, description: string
  }[]
  cover: string
  description: string
  id: number
  name: string
  price: Float32Array
  publisher: string
  year: number

}

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  dataSource: Promise<[]> | null=null;
  bookObs$: Observable<any>;
  authorObs$: Observable<any>;
  categoryObs$: Observable<any>;
  totalPages: number;
  totalItems: number;

  bookName: string = '';
  authorId: string = '';
  categoriesId: string[] = [];
  searchFormControl = new FormControl();
  constructor(private bookService: BookService, private authorService: AuthorService, private categoryService: CategoryService) {};

  displayedColumns: string[] = ['position', 'name', 'author', 'categories', 'price', 'publisher', 'year'];

  selectFormControl = new FormControl('');

  ngOnInit() {
    this.bookObs$ = this.bookService.getAllBook(1,5);
    this.authorObs$ = this.authorService.getAllAuthor();
    this.categoryObs$ = this.categoryService.getAllCategories();

    this.bookObs$.subscribe(
      val => {
        this.totalPages = this.bookService.totalPages;
        this.totalItems = this.bookService.totalItems;
      }
    )

    this.searchFormControl.valueChanges
      .pipe(debounceTime(1000))
      .subscribe(val => {
        this.bookService.searchBookByNameAndAuthorAndCategories(val ,this.authorId, this.categoriesId).subscribe(value => {
            this.dataSource = value;
          });
      })
  }

  pageChange(event: PageEvent) {
    this.bookObs$ = this.bookService.getAllBook(event.pageIndex+1, event.pageSize);
  }

  onSelected(event: MatSelectChange) {
    if (typeof(event.value)==='string' || event.value === undefined) {
      this.authorId = event.value ? event.value : "";
    } else {
      this.categoriesId = event.value;
    }

    this.bookService.searchBookByNameAndAuthorAndCategories(this.bookName ,this.authorId, this.categoriesId).subscribe(value => {
      this.dataSource = value;
    });
  }
}
