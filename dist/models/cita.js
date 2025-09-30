"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cita = void 0;
// models/cita.ts
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
exports.Cita = connection_1.default.define("cita", {
    id_cita: { type: sequelize_1.DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    id_agenda: { type: sequelize_1.DataTypes.INTEGER, allowNull: false },
    id_paciente: { type: sequelize_1.DataTypes.INTEGER, allowNull: false },
    fecha: { type: sequelize_1.DataTypes.DATEONLY, allowNull: false },
    hora_inicio: { type: sequelize_1.DataTypes.TIME, allowNull: false },
    hora_fin: { type: sequelize_1.DataTypes.TIME, allowNull: false },
    modalidad: { type: sequelize_1.DataTypes.STRING(50) },
    estado: { type: sequelize_1.DataTypes.ENUM('pendiente', 'confirmada', 'cancelada', 'realizada', 'reprogramada'), defaultValue: 'pendiente' },
    notas: { type: sequelize_1.DataTypes.TEXT }
}, {
    tableName: "cita",
    timestamps: false
});
