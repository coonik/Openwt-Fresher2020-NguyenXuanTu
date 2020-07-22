import { BookService } from './../../../../core/services/book.service';
import {Component, OnInit, ViewChild, Input} from '@angular/core';
import { Observable } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
export interface PeriodicElement {

  id: number,
  title: string,
  author_id: number,
  category_id: number,
  publish_year: number
  price: number
  description: string,
  cover: string,
  createdAt: Date
  updatedAt: Date

}

const ELEMENT_DATA: PeriodicElement[] = [];

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  // @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  // dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  dataSource = [];
  bookObs: Observable<any>;
  totalPages: number;
  totalItems: number;
  constructor(private bookService: BookService) {};

  displayedColumns: string[] = ['position', 'name', 'author', 'categories', 'cover', 'price', 'publisher', 'year'];


  ngOnInit() {
    // this.dataSource.paginator = this.paginator;
    this.bookObs = this.bookService.getAllBook(1,5);
    this.bookObs.subscribe(
      val => {
        this.dataSource = val;
        this.totalPages = this.bookService.totalPages;
        this.totalItems = this.bookService.totalItems;
      }
    )
  }

  pageChange(event: PageEvent) {

    this.bookObs = this.bookService.getAllBook(event.pageIndex+1, event.pageSize);
    this.bookObs.subscribe(
      val => {
        this.dataSource = val;
      }
    )
  }
}
