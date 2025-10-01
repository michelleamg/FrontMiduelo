"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validarToken = (req, res, next) => {
    const headersToken = req.headers['authorization'];
    if (headersToken != undefined) {
        try {
            // ✅ EXTRAER TOKEN DESPUÉS DE "Bearer "
            const token = headersToken.slice(7);
            // ✅ DECODIFICAR Y GUARDAR EN req.user
            const decoded = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY || '1£O1T(GL\fx0');
            req.user = decoded; // Guardar info decodificada
            next();
        }
        catch (error) {
            res.status(401).json({
                msg: 'Token Inválido'
            });
        }
    }
    else {
        res.status(401).json({
            msg: 'Acceso Denegado'
        });
    }
};
exports.default = validarToken;
