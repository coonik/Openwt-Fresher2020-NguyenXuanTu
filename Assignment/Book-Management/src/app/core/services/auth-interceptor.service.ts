import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

export class AuthInterceptorService implements HttpInterceptor {
  token: string;
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (localStorage.getItem('loginData') && !this.token) {
      this.token = "Bearer " + JSON.parse(localStorage.getItem('loginData'))?.token;
    }
    const modifiedRequest = req.clone({
      headers: req.headers.append('Authorization',this.token).append('Content-Type','application/json')
    })
    return next.handle(modifiedRequest);
  }
}
