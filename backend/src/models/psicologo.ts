import { DataType, DataTypes } from "sequelize";
import sequelize from "../database/connection";

export const Psicologo = sequelize.define(
    'psicologo',{
        id:{type: DataTypes.INTEGER,primaryKey: true, autoIncrement: true},
        nombre: {type: DataTypes.STRING, allowNull: false},
        apellidoPaterno: {type: DataTypes.STRING, allowNull: false},
        apellidoMaterno: {type: DataTypes.STRING, allowNull: false},
        fecha_nacimiento: {type: DataTypes.DATE, allowNull: false},
        especialidad:{ type: DataTypes.STRING, allowNull: false},
        cedula: {type: DataTypes.STRING, unique: true, allowNull: false},
        telefono: {type: DataTypes.INTEGER, unique: true, allowNull: false},
        correo: {type: DataTypes.STRING, unique: true, allowNull: false},
        contrasena: {type: DataTypes.STRING, allowNull: false},        
        status:  {type: DataTypes.INTEGER, allowNull: false},
    }
)

    