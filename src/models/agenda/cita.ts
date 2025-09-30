// models/cita.ts
import { DataTypes } from "sequelize";
import sequelize from "../../database/connection";

// src/models/cita.ts
import { Agenda } from "./agenda";
import { Paciente } from "../paciente";

export const Cita = sequelize.define("cita", {
  id_cita: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
  id_agenda: { type: DataTypes.INTEGER, allowNull: false },
  id_paciente: { type: DataTypes.INTEGER, allowNull: false },
  fecha: { type: DataTypes.DATEONLY, allowNull: false },
  hora_inicio: { type: DataTypes.TIME, allowNull: false },
  hora_fin: { type: DataTypes.TIME, allowNull: false },
  modalidad: { type: DataTypes.STRING(50), allowNull: true },
  estado: { type: DataTypes.ENUM("pendiente","confirmada","cancelada","realizada","reprogramada"), defaultValue: "pendiente" },
  notas: { type: DataTypes.TEXT, allowNull: true },
  fecha_reprogramacion: { type: DataTypes.DATEONLY, allowNull: true }
}, {
  tableName: "cita",
  timestamps: true,
  freezeTableName: true,
});

Cita.belongsTo(Agenda, { foreignKey: "id_agenda", targetKey: "id_agenda" });
Cita.belongsTo(Paciente, { foreignKey: "id_paciente", targetKey: "id_paciente" });
