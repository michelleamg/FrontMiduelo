"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Recordatorio = void 0;
// src/models/recordatorio.ts
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../../database/connection"));
exports.Recordatorio = connection_1.default.define("recordatorio", {
    id_recordatorio: { type: sequelize_1.DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
    id_cita: { type: sequelize_1.DataTypes.INTEGER, allowNull: false },
    id_psicologo: { type: sequelize_1.DataTypes.INTEGER, allowNull: false },
    id_paciente: { type: sequelize_1.DataTypes.INTEGER, allowNull: false },
    mensaje: { type: sequelize_1.DataTypes.STRING(255), allowNull: false },
    enviado: { type: sequelize_1.DataTypes.BOOLEAN, defaultValue: false },
    fecha_programada: { type: sequelize_1.DataTypes.DATE, allowNull: false }
}, {
    tableName: "recordatorio",
    timestamps: true,
    freezeTableName: true,
});
