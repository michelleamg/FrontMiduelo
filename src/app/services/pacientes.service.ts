import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Paciente } from '../interfaces/paciente';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PacientesService {

  private AppUrl: string;
  private APIUrl: string;

  constructor(private http: HttpClient) {
    this.AppUrl = environment.apiUrl;
    this.APIUrl = "api/psicologo";
  }

  // ✅ MÉTODO SIMPLIFICADO - El token se agrega automáticamente por el interceptor
  getPacientesPorPsicologo(): Observable<Paciente[]> {
    // El interceptor ya agrega el token Bearer automáticamente
    return this.http.get<Paciente[]>(`${this.AppUrl}${this.APIUrl}/lista-pacientes`);
  }
}

  

