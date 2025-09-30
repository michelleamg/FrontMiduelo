"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cita = void 0;
// models/cita.ts
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../../database/connection"));
// src/models/cita.ts
const agenda_1 = require("./agenda");
const paciente_1 = require("../paciente");
exports.Cita = connection_1.default.define("cita", {
    id_cita: { type: sequelize_1.DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
    id_agenda: { type: sequelize_1.DataTypes.INTEGER, allowNull: false },
    id_paciente: { type: sequelize_1.DataTypes.INTEGER, allowNull: false },
    fecha: { type: sequelize_1.DataTypes.DATEONLY, allowNull: false },
    hora_inicio: { type: sequelize_1.DataTypes.TIME, allowNull: false },
    hora_fin: { type: sequelize_1.DataTypes.TIME, allowNull: false },
    modalidad: { type: sequelize_1.DataTypes.STRING(50), allowNull: true },
    estado: { type: sequelize_1.DataTypes.ENUM("pendiente", "confirmada", "cancelada", "realizada", "reprogramada"), defaultValue: "pendiente" },
    notas: { type: sequelize_1.DataTypes.TEXT, allowNull: true },
    fecha_reprogramacion: { type: sequelize_1.DataTypes.DATEONLY, allowNull: true }
}, {
    tableName: "cita",
    timestamps: true,
    freezeTableName: true,
});
exports.Cita.belongsTo(agenda_1.Agenda, { foreignKey: "id_agenda", targetKey: "id_agenda" });
exports.Cita.belongsTo(paciente_1.Paciente, { foreignKey: "id_paciente", targetKey: "id_paciente" });
