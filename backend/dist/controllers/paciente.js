"use strict";
// export const getPacientes = async (req: Request, res: Response) =>{
//     const listaPacientes = await Paciente.findAll();
//     res.json({listaPacientes});
// }
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
exports.getPacientes = exports.registroPaciente = void 0;
const paciente_1 = require("../models/paciente");
const registroPaciente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, apellidoPaterno, apellidoMaterno } = req.body;
    try {
        paciente_1.Paciente.create({
            nombre: nombre,
            apellidoPaterno: apellidoPaterno,
            apellidoMaterno: apellidoMaterno,
            status: 1,
        });
        res.json({
            msg: 'User ${nombre} ${apellido} create success...'
        });
    }
    catch (error) {
        res.status(400).json({ msg: 'El usuario ya existe ${correo} o la credencial ${cedula}' });
    }
});
exports.registroPaciente = registroPaciente;
// ✅ FUNCIÓN CORREGIDA PARA FILTRAR POR PSICÓLOGO
const getPacientes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        // Extraer id_psicologo del token decodificado
        const id_psicologo = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id_psicologo;
        if (!id_psicologo) {
            return res.status(400).json({
                msg: 'No se pudo identificar al psicólogo'
            });
        }
        console.log(`Buscando pacientes para psicólogo ID: ${id_psicologo}`);
        // ✅ FILTRAR PACIENTES POR ID_PSICOLOGO
        const listaPacientes = yield paciente_1.Paciente.findAll({
            where: {
                id_psicologo: id_psicologo
            },
            attributes: ['id_paciente', 'nombre', 'apellido_paterno', 'apellido_materno', 'email'] // Solo campos necesarios
        });
        console.log(`Encontrados ${listaPacientes.length} pacientes`);
        res.json(listaPacientes); // ✅ CAMBIO: devolver array directo, no objeto wrapper
    }
    catch (error) {
        console.error('Error al obtener pacientes:', error);
        res.status(500).json({
            msg: 'Error interno del servidor'
        });
    }
});
exports.getPacientes = getPacientes;
