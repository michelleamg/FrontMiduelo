import {Request, Response} from 'express';
import { Paciente } from '../models/paciente';

export const registroPaciente = async ( req: Request, res: Response) => {

    const { nombre, apellidoPaterno, apellidoMaterno } = req.body;
    

   
    try {
        Paciente.create({
        nombre: nombre,
        apellidoPaterno: apellidoPaterno,
        apellidoMaterno: apellidoMaterno,
        status: 1,
    }); 

    //respuesta de la creacion de usuario
    res.json({
        msg:'User ${nombre} ${apellido} create success...'
    });
        
    } catch (error) {
        res.status(400).json(
            {msg: 'El usuario ya existe ${correo} o la credencial ${cedula}'}
        )
    }
}



export const getPacientes = async (req: Request, res: Response) =>{
    const listaPacientes = await Paciente.findAll();
    res.json({listaPacientes});
}