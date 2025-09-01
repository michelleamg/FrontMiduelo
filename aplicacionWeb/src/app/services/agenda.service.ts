import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';  // importa tu AuthService
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AgendaService {
 //VARIABLES PARA ANOTAR LA CONFIGURACION DEL PUERTO
  private AppUrl: string;
  private APIUrl: string;
  

  constructor(private http: HttpClient, private _authService: AuthService) {
    this.AppUrl = environment.apiUrl;  // Corregí la coma por punto y coma
    this.APIUrl = "api/psicologo";
  } // inyecta aquí



  private getHeaders() {
    const token = this._authService.getToken(); // método de tu AuthService
    return {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
    };
  }

  getAgenda(id_psicologo: number) {
    return this.http.get(`${this.AppUrl}${this.APIUrl}/agenda/${id_psicologo}`, this.getHeaders());
  }

  getCitas(id_agenda: number): Observable<any[]>  {
    return this.http.get<any[]>(`${this.AppUrl}${this.APIUrl}/citas/${id_agenda}`, this.getHeaders());
  }

  crearCita(cita: any) {
    return this.http.post(`${this.AppUrl}${this.APIUrl}/citas`, cita, this.getHeaders());
  }

  actualizarCita(id_cita: number, cita: any) {
    return this.http.put(`${this.AppUrl}${this.APIUrl}/citas/${id_cita}`, cita, this.getHeaders());
  }

  eliminarCita(id_cita: number) {
    return this.http.delete(`${this.AppUrl}${this.APIUrl}/citas/${id_cita}`, this.getHeaders());
  }
}

