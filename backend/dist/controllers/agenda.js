"use strict";
// // controllers/agenda.ts
// import { Request, Response } from "express";
// import { Agenda } from "../models/agenda/agenda";
// import { Cita } from "../models/agenda/cita";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eliminarCita = exports.actualizarCita = exports.crearCita = exports.getCitas = exports.crearAgenda = exports.getAgenda = void 0;
const agenda_1 = require("../models/agenda/agenda");
const cita_1 = require("../models/agenda/cita");
const sequelize_1 = require("sequelize");
/**
 * GET /api/agenda/:id_psicologo
 * Devuelve la agenda (y opcionalmente las citas) para la semana actual
 * Query opcional: ?semana_inicio=YYYY-MM-DD
 */
const getAgenda = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id_psicologo = Number(req.params.id_psicologo);
        if (!id_psicologo)
            return res.status(400).json({ msg: "id_psicologo requerido" });
        const semana_inicio = req.query.semana_inicio ? String(req.query.semana_inicio) : null;
        let agenda;
        if (semana_inicio) {
            agenda = yield agenda_1.Agenda.findOne({
                where: {
                    id_psicologo,
                    semana_inicio: semana_inicio
                }
            });
        }
        else {
            // obtener agenda con semana que incluya hoy
            const hoy = new Date();
            const hoyIso = hoy.toISOString().slice(0, 10);
            agenda = yield agenda_1.Agenda.findOne({
                where: {
                    id_psicologo,
                    semana_inicio: { [sequelize_1.Op.lte]: hoyIso },
                    semana_fin: { [sequelize_1.Op.gte]: hoyIso }
                }
            });
        }
        if (!agenda)
            return res.status(404).json({ msg: "Agenda no encontrada para la semana solicitada" });
        // Traer citas de la agenda
        const citas = yield cita_1.Cita.findAll({
            where: { id_agenda: agenda.id_agenda },
            order: [["fecha", "ASC"], ["hora_inicio", "ASC"]]
        });
        res.json({ agenda, citas });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al obtener agenda", error });
    }
});
exports.getAgenda = getAgenda;
const crearAgenda = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_psicologo, semana_inicio, semana_fin } = req.body;
        if (!id_psicologo || !semana_inicio || !semana_fin)
            return res.status(400).json({ msg: "Faltan campos" });
        const nueva = yield agenda_1.Agenda.create({ id_psicologo, semana_inicio, semana_fin });
        res.json({ msg: "Agenda creada", agenda: nueva });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error creando agenda", error });
    }
});
exports.crearAgenda = crearAgenda;
const getCitas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id_agenda = Number(req.params.id_agenda);
        if (!id_agenda)
            return res.status(400).json({ msg: "id_agenda requerido" });
        const citas = yield cita_1.Cita.findAll({
            where: { id_agenda },
            order: [["fecha", "ASC"], ["hora_inicio", "ASC"]]
        });
        res.json({ citas });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al obtener citas", error });
    }
});
exports.getCitas = getCitas;
const crearCita = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_agenda, id_paciente, fecha, hora_inicio, hora_fin, modalidad, notas } = req.body;
        if (!id_agenda || !id_paciente || !fecha || !hora_inicio || !hora_fin)
            return res.status(400).json({ msg: "Faltan campos" });
        // Validaciones simples (puedes agregar trigger DB ya presente)
        if (hora_fin <= hora_inicio)
            return res.status(400).json({ msg: "hora_fin debe ser mayor que hora_inicio" });
        // Evitar solapamiento para el mismo psicólogo
        // Obtener id_psicologo desde agenda
        const agenda = yield agenda_1.Agenda.findByPk(id_agenda);
        if (!agenda)
            return res.status(400).json({ msg: "Agenda inválida" });
        const id_psicologo = agenda.id_psicologo;
        const overlap = yield cita_1.Cita.count({
            where: {
                fecha,
                [sequelize_1.Op.and]: [
                    { id_agenda: { [sequelize_1.Op.in]: (yield agenda_1.Agenda.findAll({ where: { id_psicologo } })).map(a => a.id_agenda) } },
                    { [sequelize_1.Op.or]: [
                            { hora_inicio: { [sequelize_1.Op.between]: [hora_inicio, hora_fin] } },
                            { hora_fin: { [sequelize_1.Op.between]: [hora_inicio, hora_fin] } },
                            { [sequelize_1.Op.and]: [{ hora_inicio: { [sequelize_1.Op.lte]: hora_inicio } }, { hora_fin: { [sequelize_1.Op.gte]: hora_fin } }] }
                        ]
                    }
                ]
            }
        });
        if (overlap > 0)
            return res.status(400).json({ msg: "Ya existe una cita en ese horario" });
        const nueva = yield cita_1.Cita.create({ id_agenda, id_paciente, fecha, hora_inicio, hora_fin, modalidad, notas });
        res.json({ msg: "Cita creada", cita: nueva });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error creando cita", error });
    }
});
exports.crearCita = crearCita;
const actualizarCita = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id_cita = Number(req.params.id_cita);
        const body = req.body;
        if (!id_cita)
            return res.status(400).json({ msg: "id_cita requerido" });
        const cita = yield cita_1.Cita.findByPk(id_cita);
        if (!cita)
            return res.status(404).json({ msg: "Cita no encontrada" });
        yield cita.update(body);
        res.json({ msg: "Cita actualizada", cita });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error actualizando cita", error });
    }
});
exports.actualizarCita = actualizarCita;
const eliminarCita = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id_cita = Number(req.params.id_cita);
        if (!id_cita)
            return res.status(400).json({ msg: "id_cita requerido" });
        const cita = yield cita_1.Cita.findByPk(id_cita);
        if (!cita)
            return res.status(404).json({ msg: "Cita no encontrada" });
        yield cita.destroy();
        res.json({ msg: "Cita eliminada" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error eliminando cita", error });
    }
});
exports.eliminarCita = eliminarCita;
