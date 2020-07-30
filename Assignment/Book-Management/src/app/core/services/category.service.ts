import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from './../../../environments/environment';

@Injectable({providedIn: 'root'})
export class CategoryService {

  token = "Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIxIiwidW5pcXVlX25hbWUiOiJtYW5hZ2VyMSIsInJvbGUiOiJNQU5BR0VSIiwibmJmIjoxNTk1ODEyMjY2LCJleHAiOjE1OTYyNDQyNjYsImlhdCI6MTU5NTgxMjI2Nn0.7CiOI-95Vxr6PsrK3-Qo0CaZONrHefist8u8Jf4Wk-rdl68wpabj-qJN7OgdLXRbdIGlU8D3Rg8Cx4hYZuXDGw"

  constructor(private http: HttpClient) {}
  getAllCategories() {
    return this.http.get<any>(environment.apiLink+`/categories`, {
      headers: new HttpHeaders({
        Authorization: this.token
      }),
    });
  }

  getCategoryById(id: number) {
    return this.http.get<any>(environment.apiLink+`/categories/${id}`, {
      headers: new HttpHeaders({
        Authorization: this.token
      }),
    });
  }

  createCategory(name: string, description: string) {
    let data = {
      "name": name,
      "description": description
    }
    console.log(JSON.stringify(data));

    return this.http.post(environment.apiLink+`/categories/`, JSON.stringify(data), {
      headers: new HttpHeaders({
        Authorization: this.token,
        'Content-Type': 'application/json'
      }),
    });
  }

  updateCategory(id: number, name: string, description: string) {
    let data = {
      "name": name,
      "description": description
    }

    return this.http.put<any>(environment.apiLink+`/categories/${id}`, JSON.stringify(data), {
      headers: new HttpHeaders({
        Authorization: this.token
      }),
    });
  }

  deleteCategory(id: number) {
    return this.http.delete(environment.apiLink+`/categories/${id}`, {
      headers: new HttpHeaders({
        Authorization: this.token
      }),
    });
  }
}
