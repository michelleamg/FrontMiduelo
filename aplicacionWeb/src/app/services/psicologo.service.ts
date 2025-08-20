import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Psicologo } from '../interfaces/piscologo';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PsicologoService {
 private AppUrl: string;
  private APIUrl: string;

  constructor(private http: HttpClient) {
    this.AppUrl = environment.apiUrl;  // Corregí la coma por punto y coma
    this.APIUrl = "api/psicologo";
  }

  registrarUsuario(usuario: Psicologo): Observable <any>{
    return this.http.post(`${this.AppUrl}${this.APIUrl}/registro`, usuario);
  }
  iniciarSesion(usuario: Psicologo): Observable <string>{
    return this.http.post<string>(`${this.AppUrl}${this.APIUrl}/iniciar-sesion`, usuario);
  }
}
