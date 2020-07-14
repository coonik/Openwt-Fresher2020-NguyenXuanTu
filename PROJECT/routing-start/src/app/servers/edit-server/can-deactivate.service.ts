import { Observable } from "rxjs";
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";

export interface CanComponenentDeactive {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean
}

export class CanDeactivateGuard implements CanDeactivate<CanComponenentDeactive> {
  canDeactivate(
    component: CanComponenentDeactive,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ) : Observable<boolean> | Promise<boolean> | boolean{
    return  component.canDeactivate();
  }
}
