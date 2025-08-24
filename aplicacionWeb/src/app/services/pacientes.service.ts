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
    this.AppUrl = environment.apiUrl;  // Corregí la coma por punto y coma
    this.APIUrl = "api/pacientes";
  }

  
  getListaSPacientes(): Observable <Paciente[]>{


    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<Paciente[]>(`${this.AppUrl}${this.APIUrl}/getPacientes`, {headers: headers});
  }
}
