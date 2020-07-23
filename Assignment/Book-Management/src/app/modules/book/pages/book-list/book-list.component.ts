import { BookService } from './../../../../core/services/book.service';
import {Component, OnInit, ViewChild, Input} from '@angular/core';
import { Observable } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { FormControl, Validators } from '@angular/forms';
import { AuthorService } from '../../../../core/services/author.service';
import { CategoryService } from '../../../../core/services/category.service';
import { MatSelectChange } from '@angular/material/select';
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
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource: Promise<[]> | null=null;
  bookObs$: Observable<any>;
  authorObs$: Observable<any>;
  categoryObs$: Observable<any>;
  totalPages: number;
  totalItems: number;

  bookName: string = '';
  authorId: string = '';
  categoriesId: string[] = [];
  searchFormControl = new FormControl('',[Validators.required]);
  constructor(private bookService: BookService, private authorService: AuthorService, private categoryService: CategoryService) {};

  displayedColumns: string[] = ['position', 'name', 'author', 'categories', 'cover', 'price', 'publisher', 'year'];

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

  }

  pageChange(event: PageEvent) {
    this.bookObs$ = this.bookService.getAllBook(event.pageIndex+1, event.pageSize);
  }

  onChangeSearchValue() {
    this.bookName = this.searchFormControl.value;
    this.bookService.searchBookByNameAndAuthorAndCategories(this.bookName ,this.authorId, this.categoriesId).subscribe(value => {
      this.dataSource = value;
    });
  }

  onSelected(event: MatSelectChange) {
    if (typeof(event.value)==='string') {
      this.authorId = event.value;
    } else {
      this.categoriesId = event.value;
    }

    this.bookService.searchBookByNameAndAuthorAndCategories(this.bookName ,this.authorId, this.categoriesId).subscribe(value => {
      this.dataSource = value;
    });
  }
}
