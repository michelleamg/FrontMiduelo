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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.registro = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const psicologo_1 = require("../models/psicologo");
const sequelize_1 = require("sequelize");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const registro = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, apellidoPaterno, apellidoMaterno, fecha_nacimiento, especialidad, telefono, contrasena, correo, cedula } = req.body;
    const contrasenaHash = yield bcrypt_1.default.hash(contrasena, 10);
    const userUnico = yield psicologo_1.Psicologo.findOne({ where: { [sequelize_1.Op.or]: { correo: correo, cedula: cedula, telefono: telefono } } });
    if (userUnico) {
        return res.status(400).json({ msg: `El usuario ya existe ${correo} o la credencial ${cedula} o numero telefonico: ${telefono}` });
    }
    try {
        psicologo_1.Psicologo.create({
            nombre: nombre,
            apellidoPaterno: apellidoPaterno,
            apellidoMaterno: apellidoMaterno,
            fecha_nacimiento: fecha_nacimiento,
            especialidad: especialidad,
            telefono: telefono,
            correo: correo,
            contrasena: contrasenaHash,
            cedula: cedula,
            status: 1,
        });
        res.json({
            msg: 'User ${nombre} ${apellidoPaterno} create success...'
        });
    }
    catch (error) {
        res.status(400).json({ msg: 'El usuario ya existe ${correo} o la credencial ${cedula}' });
    }
});
exports.registro = registro;
// ✅ LOGIN CORREGIDO
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { correo, contrasena } = req.body;
    const userUnico = yield psicologo_1.Psicologo.findOne({ where: { correo: correo } });
    if (!userUnico) {
        return res.status(400).json({ msg: `El usuario NO existe ${correo}` });
    }
    const validarContrasena = yield bcrypt_1.default.compare(contrasena, userUnico.contrasena);
    if (!validarContrasena) {
        return res.status(400).json({ msg: `Contraseña Incorrecta` });
    }
    // ✅ INCLUIR ID_PSICOLOGO EN EL TOKEN
    const token = jsonwebtoken_1.default.sign({
        correo: correo,
        id_psicologo: userUnico.id_psicologo // ← AGREGADO
    }, process.env.SECRET_KEY || '1£O1T(GL\fx0', { expiresIn: '1h' });
    res.json({ token });
});
exports.login = login;
