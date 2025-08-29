// models/cita.ts
import { DataTypes } from "sequelize";
import sequelize from "../../database/connection";

export const Cita = sequelize.define("cita", {
  id_cita: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  id_agenda: { type: DataTypes.INTEGER, allowNull: false },
  id_paciente: { type: DataTypes.INTEGER, allowNull: false },
  fecha: { type: DataTypes.DATEONLY, allowNull: false },
  hora_inicio: { type: DataTypes.TIME, allowNull: false },
  hora_fin: { type: DataTypes.TIME, allowNull: false },
  modalidad: { type: DataTypes.STRING(50) },
  estado: { type: DataTypes.ENUM('pendiente','confirmada','cancelada','realizada','reprogramada'), defaultValue: 'pendiente' },
  notas: { type: DataTypes.TEXT }
}, {
  tableName: "cita",
  timestamps: false
});
