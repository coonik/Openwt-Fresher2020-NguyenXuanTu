import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from './../../../environments/environment';

@Injectable({providedIn: 'root'})
export class CategoryService {
  constructor(private http: HttpClient) {}
  getAllCategories() {
    return this.http.get<any>(environment.apiLink+`/categories`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIxIiwidW5pcXVlX25hbWUiOiJtYW5hZ2VyMSIsInJvbGUiOiJNQU5BR0VSIiwibmJmIjoxNTk1MzIwODk0LCJleHAiOjE1OTU3NTI4OTQsImlhdCI6MTU5NTMyMDg5NH0.PxPBRbpn75Jd8XVivxStWYiqUK6lT4-YA0o6HjcLfPAM_y0okSZxy3s3GDqlwxY6VuqvnBLtl5o3EXZ1AMUNdQ'
      }),
    });
  }
}
