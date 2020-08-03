import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from './../../../environments/environment';

@Injectable({providedIn: 'root'})
export class CategoryService {

  constructor(private http: HttpClient) {}
  getAllCategories() {
    return this.http.get<any>(environment.apiLink+`/categories`);
  }

  getCategoryById(id: number) {
    return this.http.get<any>(environment.apiLink+`/categories/${id}`);
  }

  createCategory(name: string, description: string) {
    let data = {
      name: name,
      description: description
    }

    return this.http.post(environment.apiLink+`/categories/`, JSON.stringify(data), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    });
  }

  updateCategory(id: number, name: string, description: string) {
    let data = {
      name: name,
      description: description
    }

    return this.http.put<any>(environment.apiLink+`/categories/${id}`, JSON.stringify(data), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    });
  }

  deleteCategory(id: number) {
    return this.http.delete(environment.apiLink+`/categories/${id}`);
  }
}
