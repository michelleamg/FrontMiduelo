"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Paciente = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
exports.Paciente = connection_1.default.define('paciente', {
    id_paciente: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    apellidoPaterno: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    apellidoMaterno: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    correo: { type: sequelize_1.DataTypes.STRING(100), allowNull: false, unique: true, validate: { isEmail: true } },
    status: { type: sequelize_1.DataTypes.INTEGER, allowNull: false },
}, {
    tableName: 'paciente',
    timestamps: true,
    freezeTableName: true,
});
