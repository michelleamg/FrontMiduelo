"use strict";
// backend/src/services/cedulaValidation.service.ts
// export class CedulaValidacionService {
//   static async validarCedula(cedula: string, nombre: string, apellidos: string) {
//     try {
//       // Ejemplo con API mock - reemplazar con API real
//       const response = await fetch(`https://api.sep.gob.mx/cedulas/${cedula}`);
//       const data = await response.json();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CedulaValidacionService = void 0;
//       return {
//         valida: data.valida,
//         nombre: data.nombre,
//         profesion: data.profesion,
//         institucion: data.institucion
//       };
//     } catch (error) {
//       return { valida: false, error: 'Error al validar cédula' };
//     }
//   }
// }
// backend/src/services/cedulaValidacion.service.ts
class CedulaValidacionService {
    static validarCedula(cedula, nombre, apellidos) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // API Mock que simula validación real
                const response = yield fetch(`https://jsonplaceholder.typicode.com/users/1`);
                const data = yield response.json();
                // Simular validación basada en longitud y formato de cédula
                const esValida = this.validarFormatoCedula(cedula);
                return {
                    valida: esValida,
                    cedula: cedula,
                    nombre: esValida ? nombre : 'No encontrado',
                    profesion: esValida ? 'Psicología' : 'No encontrada',
                    institucion: esValida ? 'Universidad Nacional' : 'No encontrada',
                    fechaExpedicion: esValida ? '2020-01-15' : null,
                    estatus: esValida ? 'Vigente' : 'No encontrada'
                };
            }
            catch (error) {
                return {
                    valida: false,
                    error: 'Error al consultar el servicio de validación',
                    message: 'Servicio temporalmente no disponible'
                };
            }
        });
    }
    static validarFormatoCedula(cedula) {
        // Validar que tenga entre 7-8 dígitos
        const regex = /^\d{7,8}$/;
        return regex.test(cedula);
    }
    static getUrlConsultaOficial() {
        return 'https://www.cedulaprofesional.sep.gob.mx/cedula/presidencia/indexAvanzada.action';
    }
}
exports.CedulaValidacionService = CedulaValidacionService;
