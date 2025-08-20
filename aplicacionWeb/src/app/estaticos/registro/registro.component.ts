import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PsicologoService } from '../../services/psicologo.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from '../../services/error.service';

@Component({
  selector: 'app-registro',
  standalone: true, // si estás usando standalone components
  imports: [ReactiveFormsModule, CommonModule, FormsModule, RouterModule, ],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  nombre: string = '';
  apellidoPaterno: string = '';
  apellidoMaterno: string = '';
  fecha_nacimiento: string = '';
  especialidad: string = '';
  cedulaProfesional: string = '';
  numTelefonico: number | null = null;
  correo: string = '';
  contrasena: string = '';
  confirmarContrasena: string = '';
  //contrasena: any;

  constructor(
    private userService: PsicologoService,
    private router: Router,
    private toastr: ToastrService,
    private _errorServices : ErrorService
  ) {}

  ngOnInit(): void {}

  registrarPsicologo() {
    if (
      this.nombre === '' ||
      this.apellidoMaterno === '' ||
      this.apellidoPaterno === '' ||
      this.fecha_nacimiento === '' ||
      this.especialidad === '' ||
      this.cedulaProfesional === null ||
      this.numTelefonico === null
    ) {
      this.toastr.error('Todos los campos son obligatorios',"Error");
      return;
    }

    if(this.contrasena != this.confirmarContrasena){
      this.toastr.warning('Las claves son diferntes','Warning');
      return;
    }

    // Aquí llamas al servicio para registrar
    const psicologo = {
      nombre: this.nombre,
      apellidoPaterno: this.apellidoPaterno,
      apellidoMaterno: this.apellidoMaterno,
      fecha_nacimiento: this.fecha_nacimiento,
      especialidad: this.especialidad,
      cedula: this.cedulaProfesional,
      telefono: this.numTelefonico,
      correo: this.correo,
      contrasena: this.contrasena
    };

    console.log(psicologo);

    this.userService.registrarUsuario(psicologo).subscribe({
      next: () => {
        this.toastr.success('Psicólogo registrado correctamente');
        this.router.navigate(['/iniciar-sesion']);
      },
        error: (event: HttpErrorResponse) => {
        this._errorServices.mensajeError(event);
      }
    });

  }
}
