import { Component } from '@angular/core';
import { Paciente } from '../../interfaces/paciente';
import { PacientesService } from '../../services/pacientes.service';

@Component({
  selector: 'app-pacientes',
  imports: [],
  templateUrl: './pacientes.component.html',
  styleUrl: './pacientes.component.css'
})
export class PacientesComponent {
  listPacientes: Paciente[] = [];

  constructor(private _pacienteServices: PacientesService){
    
  }

  ngOnInit(): void {
  this.getPacientesPorPsicologo();

}

 getPacientesPorPsicologo(){
    this._pacienteServices.getPacientesPorPsicologo().subscribe((data)=>{
      this.listPacientes = data;
    })
  }
  //eliminar(id: number){
    //this._pacienteServices.eliminarProducto(id).subscribe(() => {
      //this.getListaProductos();
    //})
  //}
}
