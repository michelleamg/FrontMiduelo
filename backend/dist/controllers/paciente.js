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
        //respuesta de la creacion de usuario
        res.json({
            msg: 'User ${nombre} ${apellido} create success...'
        });
    }
    catch (error) {
        res.status(400).json({ msg: 'El usuario ya existe ${correo} o la credencial ${cedula}' });
    }
});
exports.registroPaciente = registroPaciente;
const getPacientes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listaPacientes = yield paciente_1.Paciente.findAll();
    res.json({ listaPacientes });
});
exports.getPacientes = getPacientes;
