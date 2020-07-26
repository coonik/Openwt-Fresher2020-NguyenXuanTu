import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable, ElementRef } from '@angular/core';
import { Observable, from } from 'rxjs';
import { tap } from'rxjs/operators';
import { environment } from './../../../environments/environment';

@Injectable({ providedIn: 'root'})
export class BookService {
  constructor(private http: HttpClient, private route: Router) {}
  getObs: Observable<any>;
  totalPages: number;
  totalItems: number;
  searchResult: [];

  getAllBook(pageIndex: number, pageSize: number) {

    this.http.get<any>(environment.apiLink+'/books?pageNumber='+pageIndex+'&pageSize='+pageSize, {
      headers: new HttpHeaders({
        Authorization: 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIxIiwidW5pcXVlX25hbWUiOiJtYW5hZ2VyMSIsInJvbGUiOiJNQU5BR0VSIiwibmJmIjoxNTk1NzY5MTE5LCJleHAiOjE1OTYyMDExMTksImlhdCI6MTU5NTc2OTExOX0.aWBcr50nY3kw02Z47hlIYUGE9B0gMt9O37EP1GqwsuuCx5WDbP0585zEnyzI6iAGdmHlPvU-6OrwglGZugYBKQ'
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
        Authorization: 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIxIiwidW5pcXVlX25hbWUiOiJtYW5hZ2VyMSIsInJvbGUiOiJNQU5BR0VSIiwibmJmIjoxNTk1NzY5MTE5LCJleHAiOjE1OTYyMDExMTksImlhdCI6MTU5NTc2OTExOX0.aWBcr50nY3kw02Z47hlIYUGE9B0gMt9O37EP1GqwsuuCx5WDbP0585zEnyzI6iAGdmHlPvU-6OrwglGZugYBKQ'
      })
    })
  }

  getBook(id: number) {
    return this.http.get<any>(environment.apiLink+`/books/${id}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIxIiwidW5pcXVlX25hbWUiOiJtYW5hZ2VyMSIsInJvbGUiOiJNQU5BR0VSIiwibmJmIjoxNTk1NzY5MTE5LCJleHAiOjE1OTYyMDExMTksImlhdCI6MTU5NTc2OTExOX0.aWBcr50nY3kw02Z47hlIYUGE9B0gMt9O37EP1GqwsuuCx5WDbP0585zEnyzI6iAGdmHlPvU-6OrwglGZugYBKQ'
      })
    })
  }

  deleteBook(id: number) {
    return this.http.delete(environment.apiLink+`/books/${id}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIxIiwidW5pcXVlX25hbWUiOiJtYW5hZ2VyMSIsInJvbGUiOiJNQU5BR0VSIiwibmJmIjoxNTk1NzY5MTE5LCJleHAiOjE1OTYyMDExMTksImlhdCI6MTU5NTc2OTExOX0.aWBcr50nY3kw02Z47hlIYUGE9B0gMt9O37EP1GqwsuuCx5WDbP0585zEnyzI6iAGdmHlPvU-6OrwglGZugYBKQ'
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
        Authorization: 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIxIiwidW5pcXVlX25hbWUiOiJtYW5hZ2VyMSIsInJvbGUiOiJNQU5BR0VSIiwibmJmIjoxNTk1NzY5MTE5LCJleHAiOjE1OTYyMDExMTksImlhdCI6MTU5NTc2OTExOX0.aWBcr50nY3kw02Z47hlIYUGE9B0gMt9O37EP1GqwsuuCx5WDbP0585zEnyzI6iAGdmHlPvU-6OrwglGZugYBKQ'
      })
  })
  }
}
