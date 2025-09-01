// // controllers/agenda.ts
// import { Request, Response } from "express";
// import { Agenda } from "../models/agenda/agenda";
// import { Cita } from "../models/agenda/cita";

// // Obtener agenda por psicólogo
// export const getAgenda = async (req: Request, res: Response) => {
//   const { id_psicologo } = req.params;
//   const agenda = await Agenda.findAll({ where: { id_psicologo } });
//   res.json(agenda);
// };

// // Crear agenda
// export const crearAgenda = async (req: Request, res: Response) => {
//   const { id_psicologo, semana_inicio, semana_fin } = req.body;
//   const nueva = await Agenda.create({ id_psicologo, semana_inicio, semana_fin });
//   res.json(nueva);
// };

// // CRUD de citas
// export const getCitas = async (req: Request, res: Response) => {
//   const { id_agenda } = req.params;
//   const citas = await Cita.findAll({ where: { id_agenda } });
//   res.json(citas);
// };

// export const crearCita = async (req: Request, res: Response) => {
//   const cita = await Cita.create(req.body);
//   res.json(cita);
// };

// export const actualizarCita = async (req: Request, res: Response) => {
//   const { id_cita } = req.params;
//   await Cita.update(req.body, { where: { id_cita } });
//   res.json({ msg: "Cita actualizada" });
// };

// export const eliminarCita = async (req: Request, res: Response) => {
//   const { id_cita } = req.params;
//   await Cita.destroy({ where: { id_cita } });
//   res.json({ msg: "Cita eliminada" });
// };
// src/controllers/agenda.ts
import { Request, Response } from "express";
import { Agenda } from "../models/agenda/agenda";
import { Cita } from "../models/agenda/cita";
import { Recordatorio } from "../models/agenda/recordatorio";
import { Op } from "sequelize";

/**
 * GET /api/agenda/:id_psicologo
 * Devuelve la agenda (y opcionalmente las citas) para la semana actual
 * Query opcional: ?semana_inicio=YYYY-MM-DD
 */
export const getAgenda = async (req: Request, res: Response) => {
  try {
    const id_psicologo = Number(req.params.id_psicologo);
    if (!id_psicologo) return res.status(400).json({ msg: "id_psicologo requerido" });

    const semana_inicio = req.query.semana_inicio ? String(req.query.semana_inicio) : null;

    let agenda;
    if (semana_inicio) {
      agenda = await Agenda.findOne({
        where: {
          id_psicologo,
          semana_inicio: semana_inicio
        }
      });
    } else {
      // obtener agenda con semana que incluya hoy
      const hoy = new Date();
      const hoyIso = hoy.toISOString().slice(0,10);
      agenda = await Agenda.findOne({
        where: {
          id_psicologo,
          semana_inicio: { [Op.lte]: hoyIso },
          semana_fin: { [Op.gte]: hoyIso }
        }
      });
    }

    if (!agenda) return res.status(404).json({ msg: "Agenda no encontrada para la semana solicitada" });

    // Traer citas de la agenda
    const citas = await Cita.findAll({
      where: { id_agenda: (agenda as any).id_agenda },
      order: [["fecha", "ASC"], ["hora_inicio", "ASC"]]
    });

    res.json({ agenda, citas });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al obtener agenda", error });
  }
};

export const crearAgenda = async (req: Request, res: Response) => {
  try {
    const { id_psicologo, semana_inicio, semana_fin } = req.body;
    if (!id_psicologo || !semana_inicio || !semana_fin) return res.status(400).json({ msg: "Faltan campos" });

    const nueva = await Agenda.create({ id_psicologo, semana_inicio, semana_fin });
    res.json({ msg: "Agenda creada", agenda: nueva });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error creando agenda", error });
  }
};

export const getCitas = async (req: Request, res: Response) => {
  try {
    const id_agenda = Number(req.params.id_agenda);
    if (!id_agenda) return res.status(400).json({ msg: "id_agenda requerido" });

    const citas = await Cita.findAll({
      where: { id_agenda },
      order: [["fecha", "ASC"], ["hora_inicio", "ASC"]]
    });

    res.json({ citas });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al obtener citas", error });
  }
};

export const crearCita = async (req: Request, res: Response) => {
  try {
    const { id_agenda, id_paciente, fecha, hora_inicio, hora_fin, modalidad, notas } = req.body;
    if (!id_agenda || !id_paciente || !fecha || !hora_inicio || !hora_fin) return res.status(400).json({ msg: "Faltan campos" });

    // Validaciones simples (puedes agregar trigger DB ya presente)
    if (hora_fin <= hora_inicio) return res.status(400).json({ msg: "hora_fin debe ser mayor que hora_inicio" });

    // Evitar solapamiento para el mismo psicólogo
    // Obtener id_psicologo desde agenda
    const agenda = await Agenda.findByPk(id_agenda);
    if (!agenda) return res.status(400).json({ msg: "Agenda inválida" });

    const id_psicologo = (agenda as any).id_psicologo;

    const overlap = await Cita.count({
      where: {
        fecha,
        [Op.and]: [
          { id_agenda: { [Op.in]: (await Agenda.findAll({ where: { id_psicologo } })).map(a => (a as any).id_agenda) } },
          { [Op.or]: [
              { hora_inicio: { [Op.between]: [hora_inicio, hora_fin] } },
              { hora_fin: { [Op.between]: [hora_inicio, hora_fin] } },
              { [Op.and]: [ { hora_inicio: { [Op.lte]: hora_inicio } }, { hora_fin: { [Op.gte]: hora_fin } } ] }
            ]
          }
        ]
      }
    });

    if (overlap > 0) return res.status(400).json({ msg: "Ya existe una cita en ese horario" });

    const nueva = await Cita.create({ id_agenda, id_paciente, fecha, hora_inicio, hora_fin, modalidad, notas });
    res.json({ msg: "Cita creada", cita: nueva });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error creando cita", error });
  }
};

export const actualizarCita = async (req: Request, res: Response) => {
  try {
    const id_cita = Number(req.params.id_cita);
    const body = req.body;
    if (!id_cita) return res.status(400).json({ msg: "id_cita requerido" });

    const cita = await Cita.findByPk(id_cita);
    if (!cita) return res.status(404).json({ msg: "Cita no encontrada" });

    await cita.update(body);
    res.json({ msg: "Cita actualizada", cita });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error actualizando cita", error });
  }
};

export const eliminarCita = async (req: Request, res: Response) => {
  try {
    const id_cita = Number(req.params.id_cita);
    if (!id_cita) return res.status(400).json({ msg: "id_cita requerido" });

    const cita = await Cita.findByPk(id_cita);
    if (!cita) return res.status(404).json({ msg: "Cita no encontrada" });

    await cita.destroy();
    res.json({ msg: "Cita eliminada" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error eliminando cita", error });
  }
};
