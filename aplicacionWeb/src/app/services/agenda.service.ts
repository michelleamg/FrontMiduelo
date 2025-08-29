import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';  // importa tu AuthService

@Injectable({ providedIn: 'root' })
export class AgendaService {
  private apiUrl = 'http://localhost:3017/api';

  constructor(private http: HttpClient, private _authService: AuthService) {} // inyecta aquí

  private getHeaders() {
    const token = this._authService.getToken(); // método de tu AuthService
    return {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
    };
  }

  getAgenda(id_psicologo: number) {
    return this.http.get(`${this.apiUrl}/agenda/${id_psicologo}`, this.getHeaders());
  }

  getCitas(id_agenda: number) {
    return this.http.get(`${this.apiUrl}/citas/${id_agenda}`, this.getHeaders());
  }

  crearCita(cita: any) {
    return this.http.post(`${this.apiUrl}/citas`, cita, this.getHeaders());
  }

  actualizarCita(id_cita: number, cita: any) {
    return this.http.put(`${this.apiUrl}/citas/${id_cita}`, cita, this.getHeaders());
  }

  eliminarCita(id_cita: number) {
    return this.http.delete(`${this.apiUrl}/citas/${id_cita}`, this.getHeaders());
  }
}

