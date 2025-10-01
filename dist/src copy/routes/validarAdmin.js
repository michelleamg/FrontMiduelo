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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const psicologo_1 = require("../models/psicologo");
const validarAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const headersToken = req.headers['authorization'];
    if (headersToken != undefined) {
        try {
            //  EXTRAER TOKEN DESPUÉS DE "Bearer "
            const token = headersToken.slice(7);
            // DECODIFICAR TOKEN
            const decoded = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY || '1£O1T(GL\fx0');
            // VERIFICAR QUE EL USUARIO EXISTE Y ES ADMINISTRADOR
            const usuario = yield psicologo_1.Psicologo.findByPk(decoded.id_psicologo);
            if (!usuario) {
                return res.status(401).json({
                    msg: 'Usuario no encontrado'
                });
            }
            // VERIFICAR ROL DE ADMINISTRADOR
            if (!usuario.rol_admin) {
                return res.status(403).json({
                    msg: 'Acceso denegado: Se requieren permisos de administrador'
                });
            }
            // VERIFICAR QUE LA CUENTA ESTÉ ACTIVA
            if (usuario.status !== 'activo') {
                return res.status(403).json({
                    msg: 'Cuenta inactiva'
                });
            }
            req.user = decoded; // Guardar info decodificada
            next();
        }
        catch (error) {
            console.error('Error validando token admin:', error);
            res.status(401).json({
                msg: 'Token Inválido'
            });
        }
    }
    else {
        res.status(401).json({
            msg: 'Acceso Denegado - Token requerido'
        });
    }
});
exports.default = validarAdmin;
