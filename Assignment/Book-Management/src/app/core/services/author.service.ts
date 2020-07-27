import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from './../../../environments/environment';

@Injectable({providedIn: 'root'})
export class AuthorService {

  token = "Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIxIiwidW5pcXVlX25hbWUiOiJtYW5hZ2VyMSIsInJvbGUiOiJNQU5BR0VSIiwibmJmIjoxNTk1ODEyMjY2LCJleHAiOjE1OTYyNDQyNjYsImlhdCI6MTU5NTgxMjI2Nn0.7CiOI-95Vxr6PsrK3-Qo0CaZONrHefist8u8Jf4Wk-rdl68wpabj-qJN7OgdLXRbdIGlU8D3Rg8Cx4hYZuXDGw"

  constructor(private http: HttpClient) {}
  getAllAuthor() {
    return this.http.get<any>(environment.apiLink+`/authors`, {
      headers: new HttpHeaders({
        Authorization: this.token
      }),
    });
  }
}
