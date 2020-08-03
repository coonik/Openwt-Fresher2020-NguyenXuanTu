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

  createAuthor(name: string, website: string, birthday: Date, cover: string) {
    let data = {
      name, website, birthday: birthday + ":00", cover
    }
    return this.http.post(environment.apiLink+`/authors/`,JSON.stringify(data) ,{
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + environment.token,
        'Content-Type': 'application/json'
      }),
    });
  }

  updateAuthor(id: number, name: string, website: string, birthday: string, cover: string) {
    let data = {
      id, name, website, birthday: birthday + ":00", cover
    }

    return this.http.put(environment.apiLink+`/authors/${id}`,JSON.stringify(data) ,{
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + environment.token,
        'Content-Type': 'application/json'
      }),
    });
  }

  deleteAuthor(id: number) {
    return this.http.delete(environment.apiLink+`/authors/${id}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + environment.token
      }),
    });
  }
}
