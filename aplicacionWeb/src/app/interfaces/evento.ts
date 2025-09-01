  export interface Evento {
  title: string;
  dia: Date;
  hora: string;              // formato "H:mm" (sin cero a la izquierda)
  meta?: {
    paciente?: string;
    estado?: 'Pendiente' | 'Confirmada' | 'Cancelada' | string;
    modalidad?: string;
    notas?: string;
    duracionMin?: number;    // NUEVO: duración en minutos (default 60)
    id?: number; 
  };
}