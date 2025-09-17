// backend/src/controllers/admin.ts
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { Psicologo } from '../models/psicologo';
import { Paciente } from '../models/paciente';
import { Op } from 'sequelize';
import jwt from 'jsonwebtoken';

// INTERFACE PARA REQUEST CON USER INFO
interface AuthRequest extends Request {
    user?: any;
}

/**
 * Registro especial para administradores (solo para pruebas/setup inicial)
 */
export const registroAdmin = async (req: Request, res: Response) => {
    const { 
        nombre, 
        apellidoPaterno, 
        apellidoMaterno, 
        fecha_nacimiento, 
        especialidad, 
        telefono, 
        contrasena, 
        correo, 
        cedulaProfesional 
    } = req.body;

    //VALIDAR QUE NO EXISTA YA UN ADMIN CON ESE CORREO
    const adminExistente = await Psicologo.findOne({
        where: { 
            [Op.or]: [
                { correo: correo },
                { cedula: cedulaProfesional }
            ]
        }
    });

    if (adminExistente) {
        return res.status(400).json({
            msg: `Ya existe un usuario con el correo ${correo} o cédula ${cedulaProfesional}`
        });
    }

    try {
        const contrasenaHash = await bcrypt.hash(contrasena, 10);

        const nuevoAdmin = await Psicologo.create({
            nombre: nombre,
            apellidoPaterno: apellidoPaterno,
            apellidoMaterno: apellidoMaterno,
            fecha_nacimiento: fecha_nacimiento,
            especialidad: especialidad || 'Administrador del Sistema',
            telefono: telefono,
            correo: correo,
            contrasena: contrasenaHash,
            cedula: cedulaProfesional,
            rol_admin: true, // ✅ MARCAR COMO ADMINISTRADOR
            cedula_validada: true, // ✅ ADMIN VIENE PRE-VALIDADO
            status: 'activo'
        });

        res.json({
            msg: `Administrador ${nombre} ${apellidoPaterno} creado exitosamente`,
            admin: {
                id: (nuevoAdmin as any).id_psicologo,
                nombre: nombre,
                correo: correo,
                rol_admin: true
            }
        });

    } catch (error) {
        console.error('Error creando administrador:', error);
        res.status(500).json({
            msg: 'Error interno del servidor al crear administrador'
        });
    }
};

/**
 * Verificar si el token pertenece a un administrador
 */
export const verificarAdmin = async (req: AuthRequest, res: Response) => {
    try {
        const id_psicologo = req.user?.id_psicologo;
        
        const admin = await Psicologo.findByPk(id_psicologo, {
            attributes: ['id_psicologo', 'nombre', 'apellidoPaterno', 'correo', 'rol_admin', 'status']
        });

        if (!admin || !(admin as any).rol_admin) {
            return res.status(403).json({
                msg: 'No es administrador'
            });
        }

        res.json({
            msg: 'Token válido',
            admin: {
                id: (admin as any).id_psicologo,
                nombre: (admin as any).nombre,
                apellido: (admin as any).apellidoPaterno,
                correo: (admin as any).correo,
                rol_admin: (admin as any).rol_admin,
                status: (admin as any).status
            }
        });

    } catch (error) {
        console.error('Error verificando admin:', error);
        res.status(500).json({
            msg: 'Error interno del servidor'
        });
    }
};

/**
 * Obtener todos los psicólogos (para administración)
 */
export const getAllPsicologos = async (req: AuthRequest, res: Response) => {
    try {
        const psicologos = await Psicologo.findAll({
            attributes: [
                'id_psicologo',
                'nombre',
                'apellidoPaterno',
                'apellidoMaterno',
                'correo',
                'telefono',
                'cedula',
                'especialidad',
                'cedula_validada',
                'rol_admin',
                'status',
                'fecha_nacimiento',
                'codigo_vinculacion', // ← AGREGADO
                'createdAt'
            ],
            order: [['createdAt', 'DESC']]
        });

        // ✅ CAMBIO: Devolver array directo
        res.json(psicologos);

    } catch (error) {
        console.error('Error obteniendo psicólogos:', error);
        res.status(500).json({
            msg: 'Error interno del servidor'
        });
    }
};

/**
 * Obtener todos los pacientes (para administración)
 */
export const getAllPacientes = async (req: AuthRequest, res: Response) => {
    try {
        const pacientes = await Paciente.findAll({
            attributes: [
                'id_paciente',
                'nombre',
                'apellido_paterno',
                'apellido_materno',
                'email',
                'telefono',
                'fecha_nacimiento',
                'id_psicologo'
            ],
            include: [{
                model: Psicologo,
                attributes: ['nombre', 'apellidoPaterno', 'apellidoMaterno'],
                required: false
            }],
            order: [['nombre', 'ASC']]
        });

        res.json({
            total: pacientes.length,
            pacientes
        });

    } catch (error) {
        console.error('Error obteniendo pacientes:', error);
        res.status(500).json({
            msg: 'Error interno del servidor'
        });
    }
};

/**
 * Validar cédula profesional de un psicólogo
 */
export const validarCedula = async (req: AuthRequest, res: Response) => {
    try {
        const { id_psicologo } = req.params;
        const { cedula_validada } = req.body;

        const psicologo = await Psicologo.findByPk(id_psicologo);

        if (!psicologo) {
            return res.status(404).json({
                msg: 'Psicólogo no encontrado'
            });
        }

        await psicologo.update({ cedula_validada: !!cedula_validada });

        res.json({
            msg: `Cédula ${cedula_validada ? 'validada' : 'invalidada'} exitosamente`,
            psicologo: {
                id: (psicologo as any).id_psicologo,
                nombre: (psicologo as any).nombre,
                cedula: (psicologo as any).cedula,
                cedula_validada: !!cedula_validada
            }
        });

    } catch (error) {
        console.error('Error validando cédula:', error);
        res.status(500).json({
            msg: 'Error interno del servidor'
        });
    }
};

/**
 * Cambiar status de un psicólogo (activo/inactivo)
 */
export const cambiarStatusPsicologo = async (req: AuthRequest, res: Response) => {
    try {
        const { id_psicologo } = req.params;
        const { status } = req.body;

        if (!['activo', 'inactivo'].includes(status)) {
            return res.status(400).json({
                msg: 'Status inválido. Debe ser "activo" o "inactivo"'
            });
        }

        const psicologo = await Psicologo.findByPk(id_psicologo);

        if (!psicologo) {
            return res.status(404).json({
                msg: 'Psicólogo no encontrado'
            });
        }

        //EVITAR QUE SE DESHABILITE A SÍ MISMO
        if ((psicologo as any).id_psicologo === req.user?.id_psicologo && status === 'inactivo') {
            return res.status(400).json({
                msg: 'No puedes deshabilitarte a ti mismo'
            });
        }

        await psicologo.update({ status });

        res.json({
            msg: `Psicólogo ${status === 'activo' ? 'habilitado' : 'deshabilitado'} exitosamente`,
            psicologo: {
                id: (psicologo as any).id_psicologo,
                nombre: (psicologo as any).nombre,
                status
            }
        });

    } catch (error) {
        console.error('Error cambiando status:', error);
        res.status(500).json({
            msg: 'Error interno del servidor'
        });
    }
};

/**
 * Eliminar un psicólogo (soft delete - cambiar a status inactivo)
 */
export const eliminarPsicologo = async (req: AuthRequest, res: Response) => {
    try {
        const { id_psicologo } = req.params;

        const psicologo = await Psicologo.findByPk(id_psicologo);

        if (!psicologo) {
            return res.status(404).json({
                msg: 'Psicólogo no encontrado'
            });
        }

        //EVITAR QUE SE ELIMINE A SÍ MISMO
        if ((psicologo as any).id_psicologo === req.user?.id_psicologo) {
            return res.status(400).json({
                msg: 'No puedes eliminar tu propia cuenta'
            });
        }

        // SOFT DELETE - Solo cambiar status
        await psicologo.update({ status: 'inactivo' });

        res.json({
            msg: 'Psicólogo eliminado exitosamente',
            psicologo: {
                id: (psicologo as any).id_psicologo,
                nombre: (psicologo as any).nombre
            }
        });

    } catch (error) {
        console.error('Error eliminando psicólogo:', error);
        res.status(500).json({
            msg: 'Error interno del servidor'
        });
    }
};