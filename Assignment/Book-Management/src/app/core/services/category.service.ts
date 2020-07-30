import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from './../../../environments/environment';

@Injectable({providedIn: 'root'})
export class CategoryService {
  constructor(private http: HttpClient) {}
  getAllCategories() {
    return this.http.get<any>(environment.apiLink+`/categories`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIxIiwidW5pcXVlX25hbWUiOiJtYW5hZ2VyMSIsInJvbGUiOiJNQU5BR0VSIiwibmJmIjoxNTk2MDg1MjU4LCJleHAiOjE1OTY1MTcyNTgsImlhdCI6MTU5NjA4NTI1OH0.rgAb2-_dgby06JMz3hxkUuRr5r_oVMY8fQLQRQrCGul9GgQHVCu6Blq8rm4-q7Q226pQZdBn4vtKW-RDptT3AA'
      }),
    });
  }
}
