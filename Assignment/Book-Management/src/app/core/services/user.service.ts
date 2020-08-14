import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/shared/auth.guard';
import { tap } from 'rxjs/operators';
@Injectable({providedIn: 'root'})
export class UserService {
  totalItems: number;
  apiLink = 'https://nga-book-api.herokuapp.com/api';
  constructor(private http: HttpClient) {}
  login(username: string, password: string) {
    let data = {
      username,
      password
    }
    return this.http.post(this.apiLink+`/auths/login`, data)
  }

  getUserPagination(pageSize: number = 5, pageNumber: number = 1, sortBy: string = "name", descending: boolean = false ) {
    this.http.get<any>(this.apiLink+`/users`, {
      observe: 'response'
    }).pipe(
      tap(resp => {
        let objTemp = JSON.parse(resp.headers.get('pagination'));
        this.totalItems = objTemp.totalItems;
      })).subscribe()
    return this.http.get<any>(this.apiLink+`/users?pageSize=${pageSize}&pageNumber=${pageNumber}&sortBy=${sortBy}&descending=${descending}`);
  }

  createUser(user: User) {
    let data = {
      name: user.name,
      username: user.username,
      password: user.password,
      role: user.role
    }

    return this.http.post(this.apiLink+`/users/`, data);
  }

  updateUser(id: number, user: User) {
    let data = user.password ?
      {
        username: user.username,
        name: user.name,
        password: user.password
      } :
      {
        username: user.username,
        name: user.name,
        role: user.role
      };
    return this.http.put<any>(this.apiLink+`/users/${id}`, data);
  }

  deleteUser(id: number) {
    return this.http.delete(this.apiLink+`/users/${id}`);
  }

  searchUserByName(name: string) {
    return this.http.get<any>(this.apiLink+`/users?name=${name}`);
  }
}
