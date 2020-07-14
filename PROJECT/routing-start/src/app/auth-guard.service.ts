import { AuthServivce } from './auth.services';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild } from "@angular/router";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private authService: AuthServivce, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
                return this.authService.isAuthencated()
                  .then(
                    (authenticated: boolean) => {
                      if (authenticated) {
                        return true
                      } else {
                        this.router.navigate(['/']);
                      }
                    }
                  );
              }

  canActivateChild(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
                return this.canActivate(route, state)
              }
}
