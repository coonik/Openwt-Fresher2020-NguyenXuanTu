import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

export class AuthInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    console.log("ook");

    const modifiedRequest = req.clone({
      headers: req.headers.append('Authorization',localStorage.getItem('token'))
    })
    return next.handle(modifiedRequest);
  }
}
