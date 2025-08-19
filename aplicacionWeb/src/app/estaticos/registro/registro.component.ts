import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  form: FormGroup;
  submitting = false; // Para deshabilitar el botón durante el envío

  constructor(
    private toast: ToastrService,
    private _userService: UserService, 
    private router: Router,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      apellidoPaterno: ['', Validators.required],
      apellidoMaterno: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      especialidad: ['', Validators.required],
      cedulaProfesional: ['', Validators.required],
      telefono: ['', Validators.required],
      direccion: ['', Validators.required],
      contrasena: ['', [Validators.required, Validators.minLength(6)]],
      confirmarContrasena: ['', Validators.required],
      terminosAceptados: [false, Validators.requiredTrue]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(formGroup: AbstractControl): ValidationErrors | null {
    const pass = formGroup.get('contrasena')?.value;
    const confirm = formGroup.get('confirmarContrasena')?.value;
    return pass === confirm ? null : { passwordMismatch: true };
  }

  markAllAsTouched() {
    Object.values(this.form.controls).forEach(control => {
      control.markAsTouched();
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.markAllAsTouched();
      this.toast.warning('Por favor complete todos los campos requeridos');
      return;
    }

    this.submitting = true;
    
    this._userService.registrarUsuario(this.form.value).subscribe({
      next: (data) => {
        this.toast.success(`Cuenta de ${this.form.value.nombre} ${this.form.value.apellidoPaterno} creada exitosamente`);
        this.router.navigate(['/Iniciar-sesion']);
      },
      error: (err) => {
        this.submitting = false;
        this.toast.error('Error al registrar: ' + (err.error?.message || err.message));
      },
      complete: () => {
        this.submitting = false;
      }
    });
  }
}