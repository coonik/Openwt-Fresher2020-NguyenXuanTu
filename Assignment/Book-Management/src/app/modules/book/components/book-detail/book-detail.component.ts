import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/core/services/book.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  bookObs$: Observable<any>;
  onEditMode: boolean = false;

  constructor(private bookService: BookService) { }

  ngOnInit() {
    this.bookObs$ = this.bookService.getBook(1); 
  }

  onClickEdit() {
    this.onEditMode = !this.onEditMode;
  }

}
