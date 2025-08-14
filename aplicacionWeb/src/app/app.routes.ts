import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { InicioComponent } from './estaticos/inicio/inicio.component';
import { LoginComponent } from './estaticos/login/login.component';
import { RegistroComponent } from './estaticos/registro/registro.component';

export const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'Duelo-y-perdida', component: InicioComponent },
  { path: 'Contactos-de-apoyo', component: InicioComponent },
  { path: 'Iniciar-sesion', component: LoginComponent },
  { path: 'Registro', component: RegistroComponent },
];

