import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from '@angular/core';

// export interface BookResponseData {
//   idToken:	string,
//   email: string,
//   refreshToken: string,
//   expiresIn: string,
//   localId: string,
//   register?: boolean
// }


@Injectable({ providedIn: 'root'})
export class BookService {
  constructor(private http: HttpClient, private route: Router) {}

  getAllBook() {
    console.log(
      this.http.get<any>('https://nga-book-api.herokuapp.com/api/books', {
      headers: new HttpHeaders({
        Authorization: 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIxIiwidW5pcXVlX25hbWUiOiJtYW5hZ2VyMSIsInJvbGUiOiJNQU5BR0VSIiwibmJmIjoxNTk1MzIwODk0LCJleHAiOjE1OTU3NTI4OTQsImlhdCI6MTU5NTMyMDg5NH0.PxPBRbpn75Jd8XVivxStWYiqUK6lT4-YA0o6HjcLfPAM_y0okSZxy3s3GDqlwxY6VuqvnBLtl5o3EXZ1AMUNdQ'
      })})
    );

    return this.http.get<any>('https://nga-book-api.herokuapp.com/api/books', {
      headers: new HttpHeaders({
        Authorization: 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIxIiwidW5pcXVlX25hbWUiOiJtYW5hZ2VyMSIsInJvbGUiOiJNQU5BR0VSIiwibmJmIjoxNTk1MzIwODk0LCJleHAiOjE1OTU3NTI4OTQsImlhdCI6MTU5NTMyMDg5NH0.PxPBRbpn75Jd8XVivxStWYiqUK6lT4-YA0o6HjcLfPAM_y0okSZxy3s3GDqlwxY6VuqvnBLtl5o3EXZ1AMUNdQ'
      })
    });
  }


}
