import { Component, OnInit } from '@angular/core';
import { Paciente } from '../../interfaces/paciente';
import { PacientesService } from '../../services/pacientes.service';

@Component({
  selector: 'app-pacientes',
  imports: [],
  templateUrl: './pacientes.component.html',
  styleUrl: './pacientes.component.css'
})
export class PacientesComponent implements OnInit {
  listPacientes: Paciente[] = [];

  constructor(private _pacienteServices: PacientesService) {}

  ngOnInit(): void {
    this.getPacientesPorPsicologo();
  }

  getPacientesPorPsicologo() {
    this._pacienteServices.getPacientesPorPsicologo().subscribe({
      next: (data: Paciente[]) => {
        console.log('Pacientes cargados:', data);
        this.listPacientes = data;
      },
      error: (error) => {
        console.error('Error al cargar pacientes:', error);
        this.listPacientes = []; // Inicializar como array vacío en caso de error
        
        // Mostrar mensaje de error específico
        if (error.status === 401) {
          console.log('Token inválido o expirado. Redirigiendo al login...');
        }
      }
    });
  }

  //eliminar(id: number){
    //this._pacienteServices.eliminarProducto(id).subscribe(() => {
      //this.getListaProductos();
    //})
  //}
}
