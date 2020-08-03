import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from './../../../environments/environment';

@Injectable({providedIn: 'root'})
export class AuthorService {

  constructor(private http: HttpClient) {}
  getAllAuthor() {
    return this.http.get<any>(environment.apiLink+`/authors`);
  }

  getAuthorById(id: number) {
    return this.http.get<any>(environment.apiLink+`/authors/${id}`);
  }
}
