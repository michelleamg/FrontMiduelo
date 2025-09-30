import { NextFunction, Response, Request } from "express";
import jwt from "jsonwebtoken";

// ✅ INTERFACE PARA EXTENDER REQUEST
interface AuthRequest extends Request {
    user?: any;
}

const validarToken = (req: AuthRequest, res: Response, next: NextFunction) => {
    const headersToken = req.headers['authorization'];
    
    if (headersToken != undefined) {
        try {
            // ✅ EXTRAER TOKEN DESPUÉS DE "Bearer "
            const token = headersToken.slice(7);
            
            // ✅ DECODIFICAR Y GUARDAR EN req.user
            const decoded = jwt.verify(token, process.env.SECRET_KEY || '1£O1T(GL\fx0');
            req.user = decoded; // Guardar info decodificada
            
            next();
        } catch (error) {
            res.status(401).json({
                msg: 'Token Inválido'
            });
        }
        
    } else {
        res.status(401).json({
            msg: 'Acceso Denegado'
        });
    }
}

export default validarToken;