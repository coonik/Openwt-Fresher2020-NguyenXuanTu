import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class DataService {
  private isChangePassword = new BehaviorSubject<boolean>(false);
  currentIsChangePassword = this.isChangePassword.asObservable();
  private loginData = new BehaviorSubject<any>(localStorage.getItem('loginData') ? JSON.parse(localStorage.getItem('loginData')) : null);
  currentLoginData = this.loginData.asObservable();

  constructor() { }

  setIsChangePassword(isChangePassword: boolean) {
    this.isChangePassword.next(isChangePassword);
  }

  setLoginData(loginData: object) {
    this.loginData.next(loginData);
  }
}
