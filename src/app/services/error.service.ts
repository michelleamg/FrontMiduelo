import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private toastr: ToastrService) { }

  mensajeError(event: HttpErrorResponse){
    if (event.error?.msg) {
          console.log(event.error.msg);
          this.toastr.error(event.error.msg, 'Error');
        }
        else {
          this.toastr.error('Existe un error en el servidor', 'Error');
        }
  }
}
