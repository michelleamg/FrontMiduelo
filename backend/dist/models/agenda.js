"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Agenda = void 0;
// models/agenda.ts
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
exports.Agenda = connection_1.default.define("agenda", {
    id_agenda: { type: sequelize_1.DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    id_psicologo: { type: sequelize_1.DataTypes.INTEGER, allowNull: false },
    semana_inicio: { type: sequelize_1.DataTypes.DATEONLY, allowNull: false },
    semana_fin: { type: sequelize_1.DataTypes.DATEONLY, allowNull: false }
}, {
    tableName: "agenda",
    timestamps: false
});
