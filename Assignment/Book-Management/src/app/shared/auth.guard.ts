import { AuthorService } from './../core/services/author.service';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router'
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface User {
  id: string, role: string, name: string, username: string
};

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
  user: User;
  constructor(private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot): boolean | Promise<boolean> | Observable<boolean> {
    let path = route.pathFromRoot;
    this.user = !localStorage.getItem("loginData") || localStorage.getItem("loginData") === "" ? null : JSON.parse(localStorage.getItem("loginData")).user;
    if (!this.user) {
      this.router.navigate(["/user/auth"]);
      return false;
    }
    if (path[1].routeConfig.path === "user" && path[2].routeConfig.path === "" && this.user.role !== 'MANAGER') {
      this.router.navigate(["/"]);
      return false;
    }
    return  !!this.user;
  }
}
