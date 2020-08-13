import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({providedIn: 'root'})
export class AuthorService {
  apiLink: 'https://nga-book-api.herokuapp.com/api'

  constructor(private http: HttpClient) {}
  getAllAuthor() {
    return this.http.get<any>(this.apiLink+`/authors`);
  }

  getAuthorById(id: number) {
    return this.http.get<any>(this.apiLink+`/authors/${id}`);
  }

  createAuthor(name: string, website: string, birthday: Date, cover: string) {
    let data = {
      name, website, birthday: birthday + "T00:00:00", cover
    }
    return this.http.post(this.apiLink+`/authors/`,data);
  }

  updateAuthor(id: number, name: string, website: string, birthday: string, cover: string) {
    let data = cover ? {
      id, name, website, birthday: birthday + "T00:00:00", cover
    } : {
      id, name, website, birthday: birthday + "T00:00:00"
    }

    return this.http.put(this.apiLink+`/authors/${id}`,data);
  }

  deleteAuthor(id: number) {
    return this.http.delete(this.apiLink+`/authors/${id}`);
  }

  searchAuthorByName(name: string) {
    return this.http.get<any>(this.apiLink+`/authors/search?authorName=${name}`);
  }
}
