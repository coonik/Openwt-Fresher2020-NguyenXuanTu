import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from './../../../environments/environment';

@Injectable({providedIn: 'root'})
export class AuthorService {

  constructor(private http: HttpClient) {}
  getAllAuthor() {
    return this.http.get<any>(environment.apiLink+`/authors`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + environment.token
      }),
    });
  }

  getAuthorById(id: number) {
    return this.http.get<any>(environment.apiLink+`/authors/${id}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + environment.token
      }),
    });
  }
}
