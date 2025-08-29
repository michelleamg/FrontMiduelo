import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { addDays, startOfWeek, format } from 'date-fns';
import { es } from 'date-fns/locale';

interface Evento {
  title: string;
  dia: Date;
  hora: string;
  meta?: {
    paciente?: string;
    estado?: 'Pendiente' | 'Confirmada' | 'Cancelada' | string;
    modalidad?: string;
    notas?: string;
  };
}

@Component({
  selector: 'app-agenda-citas-dashboard',
  imports: [CommonModule, DatePipe],
  templateUrl: './agenda-citas-dashboard.component.html',
  styleUrl: './agenda-citas-dashboard.component.css'
})
export class AgendaCitasDashboardComponent implements OnInit{
  verFecha = new Date();
  diasSemana: Date[] = [];
  horas: string[] = [];
  eventos: Evento[] = [];
  selecionarEvent: Evento | null = null;
  rangoSemana = '';
  locale = 'es'; // ← ya que lo estás bindeando en el HTML

  ngOnInit(): void {
    this.generarSemana();
    this.generarHoras();
    this.simulacionEventos();
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

  simulacionEventos() {
    this.eventos = [
      {
        title: 'Cita con Juan Pérez',
        dia: this.diasSemana[1],
        hora: '10:00',
        meta: { paciente: 'Juan Pérez', estado: 'Pendiente', modalidad: 'Presencial' }
      },
      {
        title: 'Cita con Ana Gómez',
        dia: this.diasSemana[2],
        hora: '15:00',
        meta: { paciente: 'Ana Gómez', estado: 'Confirmada', modalidad: 'En línea' }
      },
      {
        title: 'Cita con Pedro',
        dia: this.diasSemana[4],
        hora: '12:00',
        meta: { paciente: 'Pedro', estado: 'Cancelada', modalidad: 'Presencial' }
      }
    ];
  }

  obtenerEventos(dia: Date, hora: string): Evento[] {
    return this.eventos.filter(
      e => e.dia.toDateString() === dia.toDateString() && e.hora === hora
    );
  }

  agregarEvento(dia: Date, hora: string) {
    const nuevo: Evento = {
      title: 'Nueva Cita',
      dia,
      hora,
      meta: { paciente: 'Paciente X', estado: 'Pendiente', modalidad: 'Presencial' }
    };
    this.eventos.push(nuevo);
  }

  manejarEvento(evento: Evento) {
    this.selecionarEvent = evento;
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
}
