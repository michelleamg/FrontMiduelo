import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from "./compartidos/nav-bar/nav-bar.component";
import { FooterComponent } from "./compartidos/footer/footer.component";
import { NavbarPsicologoComponent } from "./psicologo/navbar-psicologo/navbar-psicologo.component";
import { AuthService } from './services/auth.service';
import { NavbarAdminComponent } from "./admin/navbar-admin/navbar-admin.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavBarComponent, FooterComponent, NavbarPsicologoComponent, NavbarAdminComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Mi Duelo';
  constructor(public authService: AuthService) {}

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }
   //Verificar si es administrador
  isAdmin(): boolean {
    return this.authService.isAdmin();
  }
}