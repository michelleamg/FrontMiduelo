// src/models/recordatorio.ts
import { DataTypes } from "sequelize";
import sequelize from "../../database/connection";

export const Recordatorio = sequelize.define("recordatorio", {
  id_recordatorio: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
  id_cita: { type: DataTypes.INTEGER, allowNull: false },
  id_psicologo: { type: DataTypes.INTEGER, allowNull: false },
  id_paciente: { type: DataTypes.INTEGER, allowNull: false },
  mensaje: { type: DataTypes.STRING(255), allowNull: false },
  enviado: { type: DataTypes.BOOLEAN, defaultValue: false },
  fecha_programada: { type: DataTypes.DATE, allowNull: false }
}, {
  tableName: "recordatorio",
  timestamps: true,
  freezeTableName: true,
});
