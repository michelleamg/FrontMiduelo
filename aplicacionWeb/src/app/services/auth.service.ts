import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  private readonly TOKEN_KEY = 'token';

  setToken(token: string) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
  }
  //Verificar si el usuario es administrador
  isAdmin(): boolean {
    const token = this.getToken();
    if (!token) return false;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return !!payload.rol_admin;
    } catch (error) {
      console.error('Error decodificando token:', error);
      return false;
    }
  }

  //Obtener información del usuario del token
  getUserInfo(): any {
    const token = this.getToken();
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return {
        id_psicologo: payload.id_psicologo,
        correo: payload.correo,
        nombre: payload.nombre,
        apellido: payload.apellido,
        rol_admin: payload.rol_admin
      };
    } catch (error) {
      console.error('Error decodificando token:', error);
      return null;
    }
  }

  //Verificar si el token ha expirado
  isTokenExpired(): boolean {
    const token = this.getToken();
    if (!token) return true;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const exp = payload.exp * 1000; // Convertir a milliseconds
      return Date.now() >= exp;
    } catch (error) {
      console.error('Error verificando expiración del token:', error);
      return true;
    }
  }

  
}
