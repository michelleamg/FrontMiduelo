"use strict";
// models/agenda.ts
// import { DataTypes } from "sequelize";
// import sequelize from "../../database/connection";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Agenda = void 0;
// export const Agenda = sequelize.define("agenda", {
//   id_agenda: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
//   id_psicologo: { type: DataTypes.INTEGER, allowNull: false },
//   semana_inicio: { type: DataTypes.DATEONLY, allowNull: false },
//   semana_fin: { type: DataTypes.DATEONLY, allowNull: false }
// }, {
//   tableName: "agenda",
//   timestamps: false
// });
// src/models/agenda.ts
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../../database/connection"));
const psicologo_1 = require("../psicologo");
exports.Agenda = connection_1.default.define("agenda", {
    id_agenda: { type: sequelize_1.DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
    id_psicologo: { type: sequelize_1.DataTypes.INTEGER, allowNull: false },
    semana_inicio: { type: sequelize_1.DataTypes.DATEONLY, allowNull: false },
    semana_fin: { type: sequelize_1.DataTypes.DATEONLY, allowNull: false }
}, {
    tableName: "agenda",
    timestamps: true,
    freezeTableName: true,
});
// Relación (opcional, útil)
exports.Agenda.belongsTo(psicologo_1.Psicologo, { foreignKey: "id_psicologo", targetKey: "id_psicologo" });
