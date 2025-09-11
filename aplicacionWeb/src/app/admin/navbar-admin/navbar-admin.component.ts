import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-navbar-admin',
  imports: [RouterModule],
  templateUrl: './navbar-admin.component.html',
  styleUrl: './navbar-admin.component.css'
})
export class NavbarAdminComponent {
  logoPath: string = 'imagenes/branding/logo.png'; 
  adminInfo: any = null;

  constructor(
    private authService: AuthService, 
    private router: Router,
    private adminService: AdminService
  ) {
    this.cargarInfoAdmin();
  }

  cargarInfoAdmin() {
    this.adminService.verificarAdmin().subscribe({
      next: (response) => {
        this.adminInfo = response.admin;
      },
      error: (error) => {
        console.error('Error cargando info admin:', error);
        this.logout(); // Si no es admin válido, cerrar sesión
      }
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/iniciar-sesion']); 
  }

  // Método para obtener iniciales del nombre
  getIniciales(): string {
    if (!this.adminInfo) return 'A';
    return `${this.adminInfo.nombre?.charAt(0) || ''}${this.adminInfo.apellido?.charAt(0) || ''}`.toUpperCase();
  }
}