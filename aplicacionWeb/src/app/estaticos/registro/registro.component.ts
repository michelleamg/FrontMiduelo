import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registro',
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {

   form: FormGroup;

  constructor(private toast: ToastrService,private _userService: UserService, private router: Router ,private fb: FormBuilder) {
    this.form = this.fb.group(
      {
        nombre: ['', Validators.required],
        apellidoPaterno: ['', Validators.required],
        apellidoMaterno: ['', Validators.required],
        fechaNacimiento: ['', Validators.required],
        especialidad: ['', Validators.required],
        cedulaProfesional: ['', Validators.required],
        telefono: ['', Validators.required],
        direccion: ['', Validators.required],
        contrasena: ['', Validators.required],
        confirmarContrasena: ['', Validators.required],
        terminosAceptados: [false, Validators.requiredTrue]
      },
      { validators: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(formGroup: AbstractControl): ValidationErrors | null {
    const pass = formGroup.get('contrasena')?.value;
    const confirm = formGroup.get('confirmarContrasena')?.value;
    return pass === confirm ? null : { passwordMismatch: true };
  }

  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value);
       this._userService.registrarUsuario(this.form.value).subscribe(data =>{ 
          this.toast.success('cuenta de ${form.nombre} ${form.apellidoPaterno} creado exitosamente')
       })
    }
}
}
