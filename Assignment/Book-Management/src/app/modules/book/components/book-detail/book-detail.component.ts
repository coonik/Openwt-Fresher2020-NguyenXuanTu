import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/core/services/book.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  bookObs$: Observable<any>;
  onEditMode: boolean = false;
  bookId: number;

  constructor(private bookService: BookService, private activatedRoute: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.bookId = Number.parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    this.bookObs$ = this.bookService.getBook(1); 
    this.bookService.getBook(1).subscribe(
      val => {
      },
      err => {
        this.router.navigate(['../404']);       
      }
    );
    
  }

  onClickEdit() {
    this.onEditMode = !this.onEditMode;
  }

  onClickSave() {

  }

  onClickDelete() {
    this.bookService.deleteBook(this.bookId);
  }

}
