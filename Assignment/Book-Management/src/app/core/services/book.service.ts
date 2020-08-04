import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable, ElementRef } from '@angular/core';
import { Observable, from } from 'rxjs';
import { tap } from'rxjs/operators';
import { environment } from './../../../environments/environment';
import { CategoryService } from './category.service';
import { AuthorService } from './author.service';

export interface bookDb {
  bookName: string, price: Float32Array, year: number, authorId: number, publisher: string, cover: string, categoriesId: number[], description: string
}

@Injectable({ providedIn: 'root'})
export class BookService {
  constructor(private http: HttpClient, private route: Router, private authorService: AuthorService, private categoryService: CategoryService) {}
  getObs: Observable<any>;
  totalPages: number;
  totalItems: number;
  searchResult: [];
  author: object = {};
  categories: object[] = [];

  getAllBook(pageIndex: number, pageSize: number) {

    this.http.get<any>(environment.apiLink+'/books?pageNumber='+pageIndex+'&pageSize='+pageSize, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + environment.token
      }),
      observe: 'response'
    }).pipe(
      tap(resp => {
        let objTemp = JSON.parse(resp.headers.get('pagination'));
        this.totalPages = objTemp.totalPages;
        this.totalItems = objTemp.totalItems;
      })).subscribe()

    return this.http.get<any>(environment.apiLink+`/books?pageNumber=${pageIndex}&pageSize=${pageSize}`)
  }

  getBook(id: number) {
    return this.http.get<any>(environment.apiLink+`/books/${id}`)
  }

  getAuthor(id: number) {
      this.author = {};
      this.authorService.getAuthorById(id).subscribe(val => {
        this.author = {
          id: val.id,
          name: val.name,
          website: val.website,
          birthday: `${val.birthday}`,
          cover: null
        }
      });
  }

  getCategories(ids: number[]) {
    this.categories = [];
    for (const id of ids) {
        this.categoryService.getCategoryById(id).subscribe(val => {
          this.categories.push({
            id: val.id,
            name: val.name,
            description: val.description
          })
        });
      }
  }

  createBook(book: bookDb) {
    let data = {
      name: book.bookName,
      description: book.description === "None" ? null : book.description,
      price: +book.price,
      year: +book.year,
      author: this.author,
      publisher: book.publisher,
      cover: book.cover,
      categories: this.categories
    }
    return this.http.post(environment.apiLink+`/books/`, JSON.stringify(data) , {
      headers: new HttpHeaders({
          'Content-Type': 'application/json'
      })
    })
  }

  updateBook(id: number, book: bookDb ) {

    let data = {
      name: book.bookName,
      description: book.description === "None" ? null : book.description,
      price: +book.price,
      year: +book.year,
      author: this.author,
      publisher: book.publisher,
      cover: book.cover,
      categories: this.categories
    }

    return this.http.put(environment.apiLink+`/books/${id}`, JSON.stringify(data) , {
      headers: new HttpHeaders({
          'Content-Type': 'application/json'
      })
    })
  }

  deleteBook(id: number) {
    return this.http.delete(environment.apiLink+`/books/${id}`)
  }

  searchBookByNameAndAuthorAndCategories(bookName: string = '',authorId: string = '', categoriesId: string[] = [], pageSize: number = 5, pageNumber: number = 1 ) {

    let category = '';
    if (categoriesId.length > 0) {
      for (let item of categoriesId) {
        category += category === '' ? item : ',' + item;
      }
    }
    return this.http.get<any>(environment.apiLink+`/books?bookName=${bookName}&authorId=${authorId}&categoryIds=${category}&pageSize=${pageSize}&pageNumber=${pageNumber}`)
  }
}
