import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { addDays, startOfWeek, format } from 'date-fns';
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

  // Reagendar
  fechaReagendar: string = '';
  horaReagendar: string = '';

  // Duplicar
  diasDuplicar: Date[] = [];

  // Crear
  crearFecha: string = '';
  crearHora: string = '';
  crearDuracionMin = 60;
  crearPaciente = '';
  crearModalidad = 'Presencial';
  crearEstado: 'Pendiente' | 'Confirmada' | 'Cancelada' = 'Pendiente';
  crearNotas = '';

  ngOnInit(): void {
    this.generarSemana();
    this.generarHoras();
    this.simulacionEventos();
  }

  // Utilidades de tiempo
  private toMin(hhmm: string): number {
    // acepta "8:00" o "08:00"
    const [h, m] = hhmm.split(':');
    return parseInt(h, 10) * 60 + parseInt(m, 10);
  }
  private fromMin(mins: number): string {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return `${h}:${m.toString().padStart(2,'0')}`; // "H:mm"
  }
  private normalizeHora(hhmm: string): string {
    // pasa "08:00" => "8:00"
    const [h, m] = hhmm.split(':');
    return `${parseInt(h, 10)}:${m.padStart(2,'0')}`;
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
    // intervalos de 60 min
    this.horas = [];
    for (let h = 8; h <= 20; h++) this.horas.push(`${h}:00`);
  }

  simulacionEventos() {
    this.eventos = [
      {
        title: 'Cita con Juan Pérez',
        dia: this.diasSemana[1],
        hora: '10:00',
        meta: { paciente: 'Juan Pérez', estado: 'Pendiente', modalidad: 'Presencial', duracionMin: 60 }
      },
      {
        title: 'Cita con Ana Gómez',
        dia: this.diasSemana[2],
        hora: '15:00',
        meta: { paciente: 'Ana Gómez', estado: 'Confirmada', modalidad: 'En línea', duracionMin: 120 }
      },
      {
        title: 'Cita con Pedro',
        dia: this.diasSemana[4],
        hora: '12:00',
        meta: { paciente: 'Pedro', estado: 'Cancelada', modalidad: 'Presencial', duracionMin: 30 }
      }
    ];
  }

  // Eventos que INICIAN exactamente en ese slot
  obtenerEventos(dia: Date, hora: string): Evento[] {
    return this.eventos.filter(e =>
      e.dia.toDateString() === dia.toDateString() &&
      this.normalizeHora(e.hora) === this.normalizeHora(hora)
    );
  }

  // Celda ocupada por el rango de una cita que comenzó antes
  isBloqueado(dia: Date, hora: string): boolean {
    const slot = this.toMin(this.normalizeHora(hora));
    return this.eventos.some(e => {
      if (e.dia.toDateString() !== dia.toDateString()) return false;
      const ini = this.toMin(this.normalizeHora(e.hora));
      const fin = this.toMin(this.finEvento(e));
      // ocupado si el slot cae dentro del intervalo (ini, fin) excluyendo el inicio
      return slot > ini && slot < fin;
    });
  }

  // QUITADO: agregarEvento por click en celda. Ya no se puede crear así.

  manejarEvento(evento: Evento, ev?: Event) {
    this.selecionarEvent = evento;
    if (ev) ev.stopPropagation();
    const modal = new (window as any).bootstrap.Modal(document.getElementById('eventModal'));
    modal.show();
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

  // Acciones
  eliminarCita() {
    if (!this.selecionarEvent) return;
    this.eventos = this.eventos.filter(e => e !== this.selecionarEvent);
    this.cerrarModal('eventModal');
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

  reagendar() {
    if (!this.selecionarEvent) return;
    if (this.fechaReagendar && this.horaReagendar) {
      this.selecionarEvent.dia = new Date(this.fechaReagendar);
      this.selecionarEvent.hora = this.normalizeHora(this.horaReagendar);
    }
    this.cerrarModal('reagendarModal');
    this.cerrarModal('eventModal');
  }

  abrirModalDuplicar() {
    this.diasDuplicar = [];
    this.abrirModal('duplicarModal');
  }

  duplicar() {
    if (!this.selecionarEvent) return;
    for (const d of this.diasDuplicar) {
      const copia: Evento = {
        ...this.selecionarEvent,
        dia: new Date(d),
        hora: this.normalizeHora(this.selecionarEvent.hora),
        meta: { ...this.selecionarEvent.meta }
      };
      this.eventos.push(copia);
    }
    this.cerrarModal('duplicarModal');
    this.cerrarModal('eventModal');
  }

  // Crear Cita
  abrirModalCrear() {
    // defaults sensatos
    this.crearFecha = format(new Date(), 'yyyy-MM-dd');
    this.crearHora = '08:00';
    this.crearDuracionMin = 60;
    this.crearPaciente = '';
    this.crearModalidad = 'Presencial';
    this.crearEstado = 'Pendiente';
    this.crearNotas = '';
    this.abrirModal('crearModal');
  }

  confirmarCrearCita() {
    if (!this.crearFecha || !this.crearHora || !this.crearPaciente) {
      alert('Faltan datos: fecha, hora y paciente son obligatorios.');
      return;
    }
    const nuevo: Evento = {
      title: `Cita con ${this.crearPaciente}`,
      dia: new Date(this.crearFecha),
      hora: this.normalizeHora(this.crearHora),
      meta: {
        paciente: this.crearPaciente,
        estado: this.crearEstado,
        modalidad: this.crearModalidad,
        notas: this.crearNotas,
        duracionMin: this.crearDuracionMin || 60
      }
    };
    this.eventos.push(nuevo);
    this.cerrarModal('crearModal');
  }

  // Modales
  abrirModal(id: string) {
    const modal = new (window as any).bootstrap.Modal(document.getElementById(id));
    modal.show();
  }

  cerrarModal(id: string) {
    const modalEl = document.getElementById(id);
    const modal = (window as any).bootstrap.Modal.getInstance(modalEl);
    if (modal) modal.hide();
  }
}
