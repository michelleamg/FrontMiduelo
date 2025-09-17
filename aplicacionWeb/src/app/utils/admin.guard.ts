import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const AdminGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  const usuario = authService.getUsuario();
  if (usuario && usuario.rol_admin) {
    return true;
  }
  
  router.navigate(['/login']);
  return false;
};