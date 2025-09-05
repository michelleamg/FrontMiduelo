// import { HttpErrorResponse, HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { catchError, Observable, throwError } from 'rxjs';
// import { ErrorService } from '../services/error.service';
// import { Router } from '@angular/router';

// @Injectable()
// export class TokenInterceptor implements HttpInterceptor{
  

//   constructor(private router: Router, private _errorService: ErrorService){}

//   intercept( request: HttpRequest<unknown>, next: HttpHandler): Observable <HttpEvent<unknown>>{
//     const token = localStorage.getItem('token');
//     if (token) {
//       console.log("Hola");
//       request = request.clone({setHeaders: {Authorization: `Bearer ${token}`}});
      
//     }
//       return next.handle(request).pipe(catchError((error: HttpErrorResponse)=>{
//         if(error.status === 401){
//           this._errorService.mensajeError(error)
//           this.router.navigate(['/iniciar-sesion'])
//         }
//         return throwError( () => new Error('Error'))
//       }
      
//     ));
//     }

// }

import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { ErrorService } from '../services/error.service';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private router: Router, private _errorService: ErrorService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('token');
    
    if (token) {
      console.log("Token agregado al request:", token.substring(0, 20) + '...');
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error interceptado:', error);
        
        if (error.status === 401) {
          console.log('Error 401: Token inválido, redirigiendo al login');
          this._errorService.mensajeError(error);
          this.router.navigate(['/iniciar-sesion']);
        } else if (error.status === 400) {
          console.log('Error 400: Bad Request - datos inválidos');
          console.log('Detalles del error:', error.error);
        }
        
        return throwError(() => error); // ✅ RETORNAR EL ERROR ORIGINAL, NO UNO NUEVO
      })
    );
  }
}