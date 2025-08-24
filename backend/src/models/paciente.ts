import { DataType, DataTypes } from "sequelize";
import sequelize from "../database/connection";

export const Paciente = sequelize.define(
    'paciente',{
        id_paciente:{type: DataTypes.INTEGER,primaryKey: true, autoIncrement: true},
        nombre: {type: DataTypes.STRING, allowNull: false},
        apellidoPaterno: {type: DataTypes.STRING, allowNull: false},
        apellidoMaterno: {type: DataTypes.STRING, allowNull: false},
        correo: { type: DataTypes.STRING(100), allowNull: false, unique: true, validate: {  isEmail: true }  },
        status:  {type: DataTypes.INTEGER, allowNull: false},
    },
    {
        tableName: 'paciente',
        timestamps: true,
        freezeTableName: true,
    }
)