import {Request, Response} from 'express';
import bcrypt from 'bcrypt';
import { Psicologo } from '../models/psicologo';
import { Op } from 'sequelize';
import jwt from 'jsonwebtoken';

export const registro = async ( req: Request, res: Response) => {
    const { nombre, apellidoPaterno, apellidoMaterno, fecha_nacimiento, especialidad, telefono, contrasena, correo, cedula } = req.body;

    const contrasenaHash = await bcrypt.hash(contrasena,10);

    const userUnico = await Psicologo.findOne({where: {[Op.or]: {correo: correo, cedula: cedula, telefono: telefono}}})
    if( userUnico){
        return res.status(400).json(
             {msg: `El usuario ya existe ${correo} o la credencial ${cedula} o numero telefonico: ${telefono}`}
        )
    }

    try {
        Psicologo.create({
            nombre: nombre,
            apellidoPaterno: apellidoPaterno,
            apellidoMaterno: apellidoMaterno,
            fecha_nacimiento: fecha_nacimiento, 
            especialidad: especialidad, 
            telefono: telefono,
            correo: correo,
            contrasena: contrasenaHash,
            cedula:cedula,
            status: 1,
    }); 

    res.json({
        msg:'User ${nombre} ${apellidoPaterno} create success...'
    });
        
    } catch (error) {
        res.status(400).json(
            {msg: 'El usuario ya existe ${correo} o la credencial ${cedula}'}
        )
    }
}

// // LOGIN CORREGIDO
// export const login = async(req: Request, res: Response) => {
//     const {correo, contrasena} = req.body;

//     const userUnico: any = await Psicologo.findOne({where: {correo: correo}});

//     if(!userUnico){
//          return res.status(400).json(
//              {msg: `El usuario NO existe ${correo}`}
//         )
//     }

//     const validarContrasena = await bcrypt.compare(contrasena, userUnico.contrasena);

//     if(!validarContrasena){
//         return res.status(400).json(
//              {msg: `Contraseña Incorrecta`}
//         )
//     }

//     //INCLUIR ID_PSICOLOGO EN EL TOKEN
//     const token = jwt.sign({
//         correo: correo,
//         id_psicologo: userUnico.id_psicologo  // ← AGREGADO
//     }, process.env.SECRET_KEY || '1£O1T(GL\fx0', { expiresIn: '1h' });

//     res.json({token});
// }

// LOGIN CORREGIDO CON DETECCIÓN DE ROL
export const login = async(req: Request, res: Response) => {
    const {correo, contrasena} = req.body;

    const userUnico: any = await Psicologo.findOne({where: {correo: correo}});

    if(!userUnico){
         return res.status(400).json(
             {msg: `El usuario NO existe ${correo}`}
        )
    }

    // VERIFICAR QUE LA CUENTA ESTÉ ACTIVA
    // if(userUnico.status !== 'activo'){
    //     return res.status(403).json(
    //          {msg: `Cuenta inactiva. Contacte al administrador.`}
    //     )
    // }

    const validarContrasena = await bcrypt.compare(contrasena, userUnico.contrasena);

    if(!validarContrasena){
        return res.status(400).json(
             {msg: `Contraseña Incorrecta`}
        )
    }

    // INCLUIR INFORMACIÓN COMPLETA EN EL TOKEN
    const token = jwt.sign({
        correo: correo,
        id_psicologo: userUnico.id_psicologo,
        rol_admin: userUnico.rol_admin,  // ← AGREGADO PARA DISTINGUIR ADMIN
        nombre: userUnico.nombre,
        apellido: userUnico.apellidoPaterno
    }, process.env.SECRET_KEY || '1£O1T(GL\fx0', { expiresIn: '8h' });

    res.json({
        token,
        usuario: {
            id: userUnico.id_psicologo,
            nombre: userUnico.nombre,
            correo: userUnico.correo,
            rol_admin: userUnico.rol_admin,
            cedula_validada: userUnico.cedula_validada,
            status: userUnico.status
        }
    });
}