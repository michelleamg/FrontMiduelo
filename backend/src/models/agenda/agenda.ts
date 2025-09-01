// models/agenda.ts
// import { DataTypes } from "sequelize";
// import sequelize from "../../database/connection";

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
import { DataTypes } from "sequelize";
import sequelize from "../../database/connection";
import { Psicologo } from "../psicologo";

export const Agenda = sequelize.define("agenda", {
  id_agenda: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
  id_psicologo: { type: DataTypes.INTEGER, allowNull: false },
  semana_inicio: { type: DataTypes.DATEONLY, allowNull: false },
  semana_fin: { type: DataTypes.DATEONLY, allowNull: false }
}, {
  tableName: "agenda",
  timestamps: true,
  freezeTableName: true,
});

// Relación (opcional, útil)
Agenda.belongsTo(Psicologo, { foreignKey: "id_psicologo", targetKey: "id_psicologo" });