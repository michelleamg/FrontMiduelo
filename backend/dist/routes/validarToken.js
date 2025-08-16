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
            const token = headersToken.slice(7);
            jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY || '1£O1T(GL\fx0');
            next();
        }
        catch (error) {
            res.status(401).json({
                msg: 'Token Invalida'
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
