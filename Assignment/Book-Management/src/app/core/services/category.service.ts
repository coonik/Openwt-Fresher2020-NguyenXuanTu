import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from './../../../environments/environment';

@Injectable({providedIn: 'root'})
export class CategoryService {

  constructor(private http: HttpClient) {}
  getAllCategories() {
    return this.http.get<any>(environment.apiLink+`/categories`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + environment.token
      }),
    });
  }

  getCategoryById(id: number) {
    return this.http.get<any>(environment.apiLink+`/categories/${id}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + environment.token
      }),
    });
  }
}
