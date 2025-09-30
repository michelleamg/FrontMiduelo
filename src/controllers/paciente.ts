


// export const getPacientes = async (req: Request, res: Response) =>{
//     const listaPacientes = await Paciente.findAll();
//     res.json({listaPacientes});
// }

import {Request, Response} from 'express';
import { Paciente } from '../models/paciente';

// ✅ INTERFACE PARA REQUEST CON USER INFO
interface AuthRequest extends Request {
    user?: any;
}

export const registroPaciente = async ( req: Request, res: Response) => {
    const { nombre, apellidoPaterno, apellidoMaterno } = req.body;
    
    try {
        Paciente.create({
        nombre: nombre,
        apellidoPaterno: apellidoPaterno,
        apellidoMaterno: apellidoMaterno,
        status: 1,
    }); 

    res.json({
        msg:'User ${nombre} ${apellido} create success...'
    });
        
    } catch (error) {
        res.status(400).json(
            {msg: 'El usuario ya existe ${correo} o la credencial ${cedula}'}
        )
    }
}

// ✅ FUNCIÓN CORREGIDA PARA FILTRAR POR PSICÓLOGO
export const getPacientes = async (req: AuthRequest, res: Response) => {
    try {
        // Extraer id_psicologo del token decodificado
        const id_psicologo = req.user?.id_psicologo;
        
        if (!id_psicologo) {
            return res.status(400).json({
                msg: 'No se pudo identificar al psicólogo'
            });
        }
        
        console.log(`Buscando pacientes para psicólogo ID: ${id_psicologo}`);
        
        // ✅ FILTRAR PACIENTES POR ID_PSICOLOGO
        const listaPacientes = await Paciente.findAll({
            where: { 
                id_psicologo: id_psicologo 
            },
            attributes: ['id_paciente', 'nombre', 'apellido_paterno', 'apellido_materno', 'email'] // Solo campos necesarios
        });
        
        console.log(`Encontrados ${listaPacientes.length} pacientes`);
        
        res.json(listaPacientes); // ✅ CAMBIO: devolver array directo, no objeto wrapper
        
    } catch (error) {
        console.error('Error al obtener pacientes:', error);
        res.status(500).json({
            msg: 'Error interno del servidor'
        });
    }
}