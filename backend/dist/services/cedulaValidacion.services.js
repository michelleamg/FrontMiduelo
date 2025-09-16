"use strict";
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
// backend/src/services/cedulaValidation.service.ts
class CedulaValidacionService {
    static validarCedula(cedula, nombre, apellidos) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Ejemplo con API mock - reemplazar con API real
                const response = yield fetch(`https://api.sep.gob.mx/cedulas/${cedula}`);
                const data = yield response.json();
                return {
                    valida: data.valida,
                    nombre: data.nombre,
                    profesion: data.profesion,
                    institucion: data.institucion
                };
            }
            catch (error) {
                return { valida: false, error: 'Error al validar cédula' };
            }
        });
    }
}
exports.CedulaValidacionService = CedulaValidacionService;
