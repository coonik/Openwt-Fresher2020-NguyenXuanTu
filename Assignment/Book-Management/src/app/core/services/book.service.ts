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
        Authorization: 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIxIiwidW5pcXVlX25hbWUiOiJtYW5hZ2VyMSIsInJvbGUiOiJNQU5BR0VSIiwibmJmIjoxNTk1MzIwODk0LCJleHAiOjE1OTU3NTI4OTQsImlhdCI6MTU5NTMyMDg5NH0.PxPBRbpn75Jd8XVivxStWYiqUK6lT4-YA0o6HjcLfPAM_y0okSZxy3s3GDqlwxY6VuqvnBLtl5o3EXZ1AMUNdQ'
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
        Authorization: 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIxIiwidW5pcXVlX25hbWUiOiJtYW5hZ2VyMSIsInJvbGUiOiJNQU5BR0VSIiwibmJmIjoxNTk1MzIwODk0LCJleHAiOjE1OTU3NTI4OTQsImlhdCI6MTU5NTMyMDg5NH0.PxPBRbpn75Jd8XVivxStWYiqUK6lT4-YA0o6HjcLfPAM_y0okSZxy3s3GDqlwxY6VuqvnBLtl5o3EXZ1AMUNdQ'
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
        Authorization: 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIxIiwidW5pcXVlX25hbWUiOiJtYW5hZ2VyMSIsInJvbGUiOiJNQU5BR0VSIiwibmJmIjoxNTk1MzIwODk0LCJleHAiOjE1OTU3NTI4OTQsImlhdCI6MTU5NTMyMDg5NH0.PxPBRbpn75Jd8XVivxStWYiqUK6lT4-YA0o6HjcLfPAM_y0okSZxy3s3GDqlwxY6VuqvnBLtl5o3EXZ1AMUNdQ'
      })
  })
  }
}
