import {Request, Response} from 'express';
import bcrypt from 'bcrypt';
import { Psicologo } from '../models/psicologo';
import { Op } from 'sequelize';
import jwt from 'jsonwebtoken';

export const registro = async ( req: Request, res: Response) => {

    const { nombre, apellidoPaterno, apellidoMaterno, fecha_nacimiento, especialidad, telefono, contrasena, correo, cedula } = req.body;

     
    const contrasenaHash = await bcrypt.hash(contrasena,10);

   // const userUnique = await User.findOne({where: {correo: correo, cedula: cedula}});    
    //validar si el correo o cedula ya estan registrados
    const userUnico = await Psicologo.findOne({where: {[Op.or]: {correo: correo, cedula: cedula}}})
    if( userUnico){
        return res.status(400).json(
             {msg: 'El usuario ya existe ${correo} o la credencial ${cedula}'}
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

    //respuesta de la creacion de usuario
    res.json({
        msg:'User ${nombre} ${apellidoPaterno} create success...'
    });
        
    } catch (error) {
        res.status(400).json(
            {msg: 'El usuario ya existe ${correo} o la credencial ${cedula}'}
        )
    }
}

//creamos el login 

export const login = async(req: Request, res: Response) => {
   
    const {correo, contrasena} = req.body;

    const userUnico: any = await Psicologo.findOne({where: {correo: correo}});

    if(!userUnico){
         return res.status(400).json(
             {msg: 'El usuario NO existe ${correo} '}
        )
    }

    const validarContrasena = await bcrypt.compare(contrasena, userUnico.contrasena);

    if(!validarContrasena){
        return res.status(400).json(
             {msg: 'Contraseña Incorrecta => ${contrasena}'}
        )
    }
    const token = jwt.sign({correo:correo}, process.env.SECRET_KEY || '1£O1T(GL\fx0',{ expiresIn: '1h'} );

    res.json({token});
}
