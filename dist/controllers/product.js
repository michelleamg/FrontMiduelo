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
const user_1 = require("../models/user");
const registro = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, apellidoPaterno, apellidoMaterno, contrasena, correo, cedula } = req.body;
    const contrasenaHash = yield bcrypt_1.default.hash(contrasena, 10);
    const userUnique = yield user_1.User.findOne({ where: { correo: correo, cedula: cedula } });
    try {
        user_1.User.create({
            nombre: nombre,
            apellidoPaterno: apellidoPaterno,
            apellidoMaterno: apellidoMaterno,
            correo: correo,
            contrasena: contrasenaHash,
            cedula: cedula,
            status: 1,
        });
        //respuesta de la creacion de usuario
        res.json({
            msg: 'User ${naombre} ${apellido} create success...'
        });
    }
    catch (error) {
        res.status(400).json({ msg: 'El usuario ya existe ${correo} o la credencial ${cedula}' });
    }
});
exports.registro = registro;
//creamos el login 
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    res.json({
        msg: 'Inicio de seccion  Exitoso =>',
        body: req.body
    });
});
exports.login = login;
