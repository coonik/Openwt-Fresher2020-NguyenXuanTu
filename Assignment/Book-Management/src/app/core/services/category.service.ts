import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({providedIn: 'root'})
export class CategoryService {
  apiLink = 'https://nga-book-api.herokuapp.com/api';

  constructor(private http: HttpClient) {}
  getAllCategories() {
    return this.http.get<any>(this.apiLink+`/categories`);
  }

  getCategoryById(id: number) {
    return this.http.get<any>(this.apiLink+`/categories/${id}`);
  }

  createCategory(name: string, description: string) {
    let data = {
      name: name,
      description: description
    }

    return this.http.post(this.apiLink+`/categories/`, data);
  }

  updateCategory(id: number, name: string, description: string) {
    let data = {
      name: name,
      description: description
    }

    return this.http.put<any>(this.apiLink+`/categories/${id}`, data);
  }

  deleteCategory(id: number) {
    return this.http.delete(this.apiLink+`/categories/${id}`);
  }

  searchCategoryByName(name: string) {
    return this.http.get<any>(this.apiLink+`/categories/search?categoryName=${name}`);
  }
}
