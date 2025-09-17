// aplicacionWeb/src/app/utils/admin.guard.ts
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const AdminGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  // ✅ USAR MÉTODO CORRECTO QUE EXISTE EN AuthService
  if (authService.isAuthenticated() && authService.isAdmin()) {
    return true;
  }
  
  router.navigate(['/iniciar-sesion']);
  return false;
};