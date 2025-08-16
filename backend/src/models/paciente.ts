import { DataType, DataTypes } from "sequelize";
import sequelize from "../database/connection";

export const Paciente = sequelize.define(
    'paciente',{
        id:{type: DataTypes.INTEGER,primaryKey: true, autoIncrement: true},
        nombre: {type: DataTypes.STRING, allowNull: false},
        apellidoPaterno: {type: DataTypes.STRING, allowNull: false},
        apellidoMaterno: {type: DataTypes.STRING, allowNull: false},
        status:  {type: DataTypes.INTEGER, allowNull: false},
    }
)