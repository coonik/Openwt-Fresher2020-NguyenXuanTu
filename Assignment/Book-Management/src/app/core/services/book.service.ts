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

  token = "Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIxIiwidW5pcXVlX25hbWUiOiJtYW5hZ2VyMSIsInJvbGUiOiJNQU5BR0VSIiwibmJmIjoxNTk1ODEyMjY2LCJleHAiOjE1OTYyNDQyNjYsImlhdCI6MTU5NTgxMjI2Nn0.7CiOI-95Vxr6PsrK3-Qo0CaZONrHefist8u8Jf4Wk-rdl68wpabj-qJN7OgdLXRbdIGlU8D3Rg8Cx4hYZuXDGw"

  getAllBook(pageIndex: number, pageSize: number) {

    this.http.get<any>(environment.apiLink+'/books?pageNumber='+pageIndex+'&pageSize='+pageSize, {
      headers: new HttpHeaders({
        Authorization: this.token
      }),
      observe: 'response'
    }).pipe(
      tap(resp => {
        let objTemp = JSON.parse(resp.headers.get('pagination'));
        this.totalPages = objTemp.totalPages;
        this.totalItems = objTemp.totalItems;
      })).subscribe()

    return this.http.get<any>(environment.apiLink+`/books?pageNumber=${pageIndex}&pageSize=${pageSize}`, {
      headers: new HttpHeaders({
        Authorization: this.token
      })
    })
  }

  getBook(id: number) {
    return this.http.get<any>(environment.apiLink+`/books/${id}`, {
      headers: new HttpHeaders({
        Authorization: this.token
      })
    })
  }

  getAuthor(id: number) {
      this.author = {};
      this.authorService.getAuthorById(id).subscribe(val => {
        this.author = {
          "id": val.id,
          "name": val.name,
          "website": val.website,
          "birthday": `${val.birthday}`,
          "cover": null
        }
      });
  }

  getCategories(ids: number[]) {
    this.categories = [];
    for (const id of ids) {
        this.categoryService.getCategoryById(id).subscribe(val => {
          this.categories.push({
            "id": val.id,
            "name": val.name,
            "description": val.description
          })
        });
      }
  }

  updateBook(id: number, book: bookDb ) {

    let data = {
      "name": book.bookName,
      "description": book.description === "None" ? null : book.description,
      "price": +book.price,
      "year": +book.year,
      "author": this.author,
      "publisher": book.publisher,
      "cover": null,
      "categories": this.categories
    }

    return this.http.put(environment.apiLink+`/books/${id}`, JSON.stringify(data) , {
      headers: new HttpHeaders({
          Authorization: this.token,
          'Content-Type': 'application/json'
      })
    })
  }

  deleteBook(id: number) {
    return this.http.delete(environment.apiLink+`/books/${id}`, {
      headers: new HttpHeaders({
        Authorization: this.token
      })
    })
  }

  searchBookByNameAndAuthorAndCategories(bookName: string = '',authorId: string = '', categoriesId: string[] = [], pageSize: number = 5, pageNumber: number = 1 ) {

    let category = '';
    if (categoriesId.length > 0) {
      for (let item of categoriesId) {
        category += category === '' ? item : ',' + item;
      }
    }
    return this.http.get<any>(environment.apiLink+`/books?bookName=${bookName}&authorId=${authorId}&categoryIds=${category}&pageSize=${pageSize}&pageNumber=${pageNumber}`, {
      headers: new HttpHeaders({
        Authorization: this.token
      })
  })
  }
}
