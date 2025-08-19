import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { InicioComponent } from './estaticos/inicio/inicio.component';
import { LoginComponent } from './estaticos/login/login.component';
import { DueloPerdidaComponent } from './estaticos/duelo-perdida/duelo-perdida.component';
import { ContactosApoyoComponent } from './estaticos/contactos-apoyo/contactos-apoyo.component';
import { RegistroComponent } from './estaticos/registro/registro.component';

export const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'duelo-y-perdida', component: DueloPerdidaComponent },
  { path: 'contactos-de-apoyo', component: ContactosApoyoComponent },
  { path: 'iniciar-sesion', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
];

