import { NextFunction,Response, Request } from "express";
import jwt from "jsonwebtoken";


const validarToken = (req: Request, res: Response, next: NextFunction) =>{
    const headersToken = req.headers['authorization'];
    

    if( headersToken != undefined){
        try {
            const token = headersToken.slice(7);
            jwt.verify(token, process.env.SECRET_KEY || '1£O1T(GL\fx0');
            next();
        } catch (error) {
            res.status(401).json({
                msg:'Token Invalida'
            })
        }
        
    } else{
        res.status(401).json({
            msg:'Acceso Denegado'
        })
    }
}

export default validarToken;