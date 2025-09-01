import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { addDays, startOfWeek, format } from 'date-fns';
import { PacientesService } from '../../services/pacientes.service';
import { AgendaService } from '../../services/agenda.service';
import { es } from 'date-fns/locale';
import { Evento } from '../../interfaces/evento';


@Component({
  selector: 'app-agenda-citas-dashboard',
  standalone: true,
  imports: [CommonModule, DatePipe, FormsModule],
  templateUrl: './agenda-citas-dashboard.component.html',
  styleUrl: './agenda-citas-dashboard.component.css'
})
export class AgendaCitasDashboardComponent implements OnInit {
  verFecha = new Date();
  diasSemana: Date[] = [];
  horas: string[] = [];
  eventos: Evento[] = [];
  selecionarEvent: Evento | null = null;
  rangoSemana = '';
  locale = 'es';

  idPsicologo = 1; // Esto vendría del login
  idAgenda = 1; // Esto podría venir del backend
  pacientes: any[] = [];

  // Reagendar
  fechaReagendar = '';
  horaReagendar = '';

  // Duplicar
  diasDuplicar: Date[] = [];

  // Crear cita
  crearFecha = '';
  crearHora = '';
  crearDuracionMin = 60;
  crearPacienteId: number | null = null;
  crearModalidad = 'Presencial';
  crearEstado: 'Pendiente' | 'Confirmada' | 'Cancelada' = 'Pendiente';
  crearNotas = '';

  constructor(private agendaService: AgendaService, private pacienteService: PacientesService) {}

  ngOnInit(): void {
    this.generarSemana();
    this.generarHoras();
    this.cargarPacientes();
    this.cargarCitas();
  }

  cargarCitas() {
  this.agendaService.getCitas(this.idAgenda).subscribe({
    next: (response: any) => {
      // ✅ MANEJO CORRECTO DE LA RESPUESTA
      const citas = response.citas || response; // Manejar ambos formatos
      if (Array.isArray(citas)) {
        this.eventos = citas.map((c: any) => ({
          title: `Cita con ${c.paciente?.nombre || 'Paciente'}`,
          dia: new Date(c.fecha),
          hora: c.hora_inicio,
          meta: {
            paciente: c.paciente?.nombre || 'Paciente',
            estado: c.estado,
            modalidad: c.modalidad,
            notas: c.notas,
            duracionMin: c.duracion || 60,
            id: c.id_cita
          }
        }));
      } else {
        console.log('No hay citas disponibles');
        this.eventos = [];
      }
    },
    error: (error) => {
      console.error('Error al cargar citas:', error);
      this.eventos = []; // Inicializar como array vacío en caso de error
    }
  });
}

cargarPacientes() {
  this.pacienteService.getPacientesPorPsicologo().subscribe({
    next: (data: any[]) => {
      this.pacientes = data;
    },
    error: (error) => {
      console.error('Error al cargar pacientes:', error);
      this.pacientes = []; // Inicializar como array vacío en caso de error
    }
  });
}

  confirmarCrearCita() {
    if (!this.crearFecha || !this.crearHora || !this.crearPacienteId) {
      alert('Faltan datos obligatorios.');
      return;
    }

    const citaData = {
      id_agenda: this.idAgenda,
      id_paciente: this.crearPacienteId,
      fecha: this.crearFecha,
      hora_inicio: this.crearHora,
      duracion: this.crearDuracionMin,
      modalidad: this.crearModalidad,
      estado: this.crearEstado,
      notas: this.crearNotas
    };

    this.agendaService.crearCita(citaData).subscribe(() => {
      this.cargarCitas();
      this.cerrarModal('crearModal');
    });
  }

  eliminarCita() {
    if (!this.selecionarEvent) return;
    const idCita = this.selecionarEvent.meta?.id;
    if (!idCita) return;

    this.agendaService.eliminarCita(idCita).subscribe(() => {
      this.eventos = this.eventos.filter(e => e.meta?.id !== idCita);
      this.cerrarModal('eventModal');
    });
  }

  reagendar() {
    if (!this.selecionarEvent || !this.fechaReagendar || !this.horaReagendar) return;

    const idCita = this.selecionarEvent.meta?.id;
    const datos = {
      fecha: this.fechaReagendar,
      hora_inicio: this.horaReagendar
    };
    if (!idCita) {
      console.error('No hay id de cita para actualizar');
      return;
    }
    this.agendaService.actualizarCita(idCita, datos).subscribe(() => {
      this.cargarCitas();
      this.cerrarModal('reagendarModal');
      this.cerrarModal('eventModal');
    });
  }

  duplicar() {
    if (!this.selecionarEvent || this.diasDuplicar.length === 0) return;

    for (const d of this.diasDuplicar) {
      const citaData = {
        id_agenda: this.idAgenda,
        id_paciente: this.pacientes.find(p => p.nombre === this.selecionarEvent?.meta?.paciente)?.id_paciente,
        fecha: format(d, 'yyyy-MM-dd'),
        hora_inicio: this.selecionarEvent.hora,
        duracion: this.selecionarEvent.meta?.duracionMin || 60,
        modalidad: this.selecionarEvent.meta?.modalidad,
        estado: this.selecionarEvent.meta?.estado,
        notas: this.selecionarEvent.meta?.notas
      };

      this.agendaService.crearCita(citaData).subscribe(() => {
        this.cargarCitas();
      });
    }

    this.cerrarModal('duplicarModal');
    this.cerrarModal('eventModal');
  }

  // Utilidades
  private toMin(hhmm: string): number {
    const [h, m] = hhmm.split(':');
    return parseInt(h, 10) * 60 + parseInt(m, 10);
  }

  private fromMin(mins: number): string {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return `${h}:${m.toString().padStart(2, '0')}`;
  }

  private normalizeHora(hhmm: string): string {
    const [h, m] = hhmm.split(':');
    return `${parseInt(h, 10)}:${m.padStart(2, '0')}`;
  }

  finEvento(e: Evento): string {
    const dur = e.meta?.duracionMin ?? 60;
    return this.fromMin(this.toMin(e.hora) + dur);
  }

  generarSemana() {
    const inicio = startOfWeek(this.verFecha, { weekStartsOn: 1 });
    this.diasSemana = Array.from({ length: 7 }, (_, i) => addDays(inicio, i));
    const inicioTexto = format(this.diasSemana[0], 'd MMM', { locale: es });
    const finTexto = format(this.diasSemana[6], 'd MMM', { locale: es });
    this.rangoSemana = `${inicioTexto} - ${finTexto}`;
  }

  generarHoras() {
    this.horas = [];
    for (let h = 8; h <= 20; h++) this.horas.push(`${h}:00`);
  }

  obtenerEventos(dia: Date, hora: string): Evento[] {
    return this.eventos.filter(e =>
      e.dia.toDateString() === dia.toDateString() &&
      this.normalizeHora(e.hora) === this.normalizeHora(hora)
    );
  }

  isBloqueado(dia: Date, hora: string): boolean {
    const slot = this.toMin(this.normalizeHora(hora));
    return this.eventos.some(e => {
      if (e.dia.toDateString() !== dia.toDateString()) return false;
      const ini = this.toMin(this.normalizeHora(e.hora));
      const fin = this.toMin(this.finEvento(e));
      return slot > ini && slot < fin;
    });
  }

  manejarEvento(evento: Evento, ev?: Event) {
    this.selecionarEvent = evento;
    if (ev) ev.stopPropagation();
    this.abrirModal('eventModal');
  }

  anteriorSemana() {
    this.verFecha = addDays(this.verFecha, -7);
    this.generarSemana();
  }

  siguienteSemana() {
    this.verFecha = addDays(this.verFecha, 7);
    this.generarSemana();
  }

  hoy() {
    this.verFecha = new Date();
    this.generarSemana();
  }

  getColorEvento(estado?: string): string {
    switch (estado) {
      case 'Pendiente': return 'bg-warning text-dark';
      case 'Confirmada': return 'bg-success text-white';
      case 'Cancelada': return 'bg-danger text-white';
      default: return 'bg-secondary text-white';
    }
  }

  abrirModal(id: string) {
    const modal = new (window as any).bootstrap.Modal(document.getElementById(id));
    modal.show();
  }

  cerrarModal(id: string) {
    const modalEl = document.getElementById(id);
    const modal = (window as any).bootstrap.Modal.getInstance(modalEl);
    if (modal) modal.hide();
  }


  // Crear Cita
  abrirModalCrear() {
    // defaults sensatos
    this.crearFecha = format(new Date(), 'yyyy-MM-dd');
    this.crearHora = '08:00';
    this.crearDuracionMin = 60;
    
    this.crearModalidad = 'Presencial';
    this.crearEstado = 'Pendiente';
    this.crearNotas = '';
    this.abrirModal('crearModal');
  }

  abrirModalDuplicar() {
    this.diasDuplicar = [];
    this.abrirModal('duplicarModal');
  }

  eliminarDuplicadas() {
    if (!this.selecionarEvent) return;
    const paciente = this.selecionarEvent.meta?.paciente;
    this.eventos = this.eventos.filter(e => e.meta?.paciente !== paciente || e === this.selecionarEvent);
    this.cerrarModal('eventModal');
  }

  abrirModalReagendar() {
    this.fechaReagendar = '';
    this.horaReagendar = '';
    this.abrirModal('reagendarModal');
  }
}
