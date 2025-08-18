import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { InicioComponent } from './estaticos/inicio/inicio.component';
import { LoginComponent } from './estaticos/login/login.component';
import { RegistroComponent } from './estaticos/registro/registro.component';
import { DueloPerdidaComponent } from './estaticos/duelo-perdida/duelo-perdida.component';
import { ContactosApoyoComponent } from './estaticos/contactos-apoyo/contactos-apoyo.component';

export const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'Duelo-y-perdida', component: DueloPerdidaComponent },
  { path: 'Contactos-de-apoyo', component: ContactosApoyoComponent },
  { path: 'Iniciar-sesion', component: LoginComponent },
  { path: 'Registro', component: RegistroComponent },
];

