import { NextFunction, Response, Request } from "express";
import jwt from "jsonwebtoken";
import { Psicologo } from "../models/psicologo";

interface AuthRequest extends Request {
    user?: any;
}

const validarAdmin = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const headersToken = req.headers['authorization'];
    
    if (headersToken != undefined) {
        try {
            //  EXTRAER TOKEN DESPUÉS DE "Bearer "
            const token = headersToken.slice(7);
            
            // DECODIFICAR TOKEN
            const decoded = jwt.verify(token, process.env.SECRET_KEY || '1£O1T(GL\fx0') as any;
            
            // VERIFICAR QUE EL USUARIO EXISTE Y ES ADMINISTRADOR
            const usuario = await Psicologo.findByPk(decoded.id_psicologo);
            
            if (!usuario) {
                return res.status(401).json({
                    msg: 'Usuario no encontrado'
                });
            }

            // VERIFICAR ROL DE ADMINISTRADOR
            if (!(usuario as any).rol_admin) {
                return res.status(403).json({
                    msg: 'Acceso denegado: Se requieren permisos de administrador'
                });
            }

            // VERIFICAR QUE LA CUENTA ESTÉ ACTIVA
            if ((usuario as any).status !== 'activo') {
                return res.status(403).json({
                    msg: 'Cuenta inactiva'
                });
            }
            
            req.user = decoded; // Guardar info decodificada
            next();
            
        } catch (error) {
            console.error('Error validando token admin:', error);
            res.status(401).json({
                msg: 'Token Inválido'
            });
        }
        
    } else {
        res.status(401).json({
            msg: 'Acceso Denegado - Token requerido'
        });
    }
}

export default validarAdmin;