// aplicacionWeb/src/app/services/admin.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private AppUrl: string;
  private APIUrl: string;

  constructor(private http: HttpClient) {
    this.AppUrl = environment.apiUrl;
    this.APIUrl = "api/admin";
  }

  /**
   * Verificar que el usuario actual es administrador
   */
  verificarAdmin(): Observable<any> {
    return this.http.get(`${this.AppUrl}${this.APIUrl}/verificar`);
  }

  /**
   * Obtener todos los psicólogos
   */
  getAllPsicologos(): Observable<any> {
    return this.http.get(`${this.AppUrl}${this.APIUrl}/psicologos`);
  }

  /**
   * Obtener todos los pacientes
   */
  getAllPacientes(): Observable<any> {
    return this.http.get(`${this.AppUrl}${this.APIUrl}/pacientes`);
  }

  /**
   * Validar cédula profesional de un psicólogo
   */
  validarCedula(idPsicologo: number, cedulaValidada: boolean): Observable<any> {
    return this.http.put(`${this.AppUrl}${this.APIUrl}/psicologos/${idPsicologo}/validar-cedula`, {
      cedula_validada: cedulaValidada
    });
  }

  /**
   * Cambiar status de un psicólogo (activo/inactivo)
   */
  cambiarStatusPsicologo(idPsicologo: number, status: 'activo' | 'inactivo'): Observable<any> {
    return this.http.put(`${this.AppUrl}${this.APIUrl}/psicologos/${idPsicologo}/status`, {
      status
    });
  }

  /**
   * Eliminar un psicólogo
   */
  eliminarPsicologo(idPsicologo: number): Observable<any> {
    return this.http.delete(`${this.AppUrl}${this.APIUrl}/psicologos/${idPsicologo}`);
  }

  /**
   * Verificar cédula profesional con API externa (SEP)
   * Nota: Aquí implementarías la integración con APIs reales
   */
  verificarCedulaSEP(cedula: string): Observable<any> {
    // Por ahora simulamos la verificación
    // En producción conectarías con APIs como:
    // - API de la SEP (si existe)
    // - RENAPO
    // - Otros servicios gubernamentales
    
    return new Observable(observer => {
      setTimeout(() => {
        // Simulación de respuesta
        const esValida = cedula.length >= 6 && /^[A-Z0-9]+$/.test(cedula);
        observer.next({
          valida: esValida,
          mensaje: esValida ? 'Cédula válida' : 'Cédula no válida',
          detalles: esValida ? {
            nombre: 'Nombre del profesional',
            institucion: 'Universidad XYZ',
            fechaExpedicion: '2020-01-01'
          } : null
        });
        observer.complete();
      }, 2000); // Simular delay de API
    });
  }

  /**
   * Registrar administrador (solo para setup inicial)
   */
  registrarAdmin(datosAdmin: any): Observable<any> {
    return this.http.post(`${this.AppUrl}api/psicologo/registro-admin`, datosAdmin);
  }

  /**
   * Obtener estadísticas del dashboard
   */
  getEstadisticas(): Observable<any> {
    // Simular datos por ahora, después implementar endpoint real
    return new Observable(observer => {
      setTimeout(() => {
        observer.next({
          totalPsicologos: 25,
          psicologosActivos: 20,
          psicologosInactivos: 5,
          totalPacientes: 150,
          cedulasValidadas: 18,
          cedulasPendientes: 7,
          mensajesHoy: 45,
          citasHoy: 12
        });
        observer.complete();
      }, 1000);
    });
  }
}