import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar-psicologo',
  imports: [RouterModule],
  templateUrl: './navbar-psicologo.component.html',
  styleUrl: './navbar-psicologo.component.css'
})
export class NavbarPsicologoComponent {
  logoPath: string = 'imagenes/branding/logo.png';
  constructor(private authService: AuthService, private router: Router) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/iniciar-sesion']); 
  }
}
