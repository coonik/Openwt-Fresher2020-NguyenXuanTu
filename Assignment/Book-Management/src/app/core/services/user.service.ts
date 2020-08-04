import { environment } from './../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({providedIn: 'root'})
export class UserService {
  constructor(private http: HttpClient) {}
  login(username: string, password: string) {
    let data = {
      username,
      password
    }
    return this.http.post(environment.apiLink+`/auths/login`, JSON.stringify(data))
  }
}
