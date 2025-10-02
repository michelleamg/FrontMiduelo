export interface ValidacionCedulaResponse {
  valida: boolean;
  mensaje?: string;
  datos?: {
    nombre: string;
    profesion: string;
    institucion: string;
  };
}