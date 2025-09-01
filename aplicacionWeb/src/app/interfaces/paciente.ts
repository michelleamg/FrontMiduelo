export interface Paciente {   
    id_paciente?: number,
    nombre?: string,
    apellido_paterno?: string,    // ✅ Coincidir con BD
    apellido_materno?: string,    // ✅ Coincidir con BD
    fecha_nacimiento?: string,    // ✅ Agregar campo
    email: string,                // ✅ Coincidir con BD
    telefono?: string,            // ✅ Agregar campo
    id_psicologo?: number,        // ✅ CAMPO CLAVE
}