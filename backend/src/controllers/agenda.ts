// controllers/agenda.ts
import { Request, Response } from "express";
import { Agenda } from "../models/agenda/agenda";
import { Cita } from "../models/agenda/cita";

// Obtener agenda por psicólogo
export const getAgenda = async (req: Request, res: Response) => {
  const { id_psicologo } = req.params;
  const agenda = await Agenda.findAll({ where: { id_psicologo } });
  res.json(agenda);
};

// Crear agenda
export const crearAgenda = async (req: Request, res: Response) => {
  const { id_psicologo, semana_inicio, semana_fin } = req.body;
  const nueva = await Agenda.create({ id_psicologo, semana_inicio, semana_fin });
  res.json(nueva);
};

// CRUD de citas
export const getCitas = async (req: Request, res: Response) => {
  const { id_agenda } = req.params;
  const citas = await Cita.findAll({ where: { id_agenda } });
  res.json(citas);
};

export const crearCita = async (req: Request, res: Response) => {
  const cita = await Cita.create(req.body);
  res.json(cita);
};

export const actualizarCita = async (req: Request, res: Response) => {
  const { id_cita } = req.params;
  await Cita.update(req.body, { where: { id_cita } });
  res.json({ msg: "Cita actualizada" });
};

export const eliminarCita = async (req: Request, res: Response) => {
  const { id_cita } = req.params;
  await Cita.destroy({ where: { id_cita } });
  res.json({ msg: "Cita eliminada" });
};
