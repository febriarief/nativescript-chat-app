import { Injectable } from "@angular/core";
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable()

export class ExtendedHttpInterceptor implements HttpInterceptor 
{
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = "3|u3rYyDJu0Qiwiu4pQ1olaSV8eEQQr4suKGEbDIxd3f712d00";

        request = request.clone({
            setHeaders: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });

        return next.handle(request).pipe(tap((ev: HttpEvent<any>) => {
            // if (ev instanceof HttpResponse) {
                
            // }
        }), catchError(response => {
            // if (response instanceof HttpErrorResponse) {
                
            // }

            return throwError(response);
        }));
    }
}