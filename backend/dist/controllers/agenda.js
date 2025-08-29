"use strict";
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
// Obtener agenda por psicólogo
const getAgenda = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_psicologo } = req.params;
    const agenda = yield agenda_1.Agenda.findAll({ where: { id_psicologo } });
    res.json(agenda);
});
exports.getAgenda = getAgenda;
// Crear agenda
const crearAgenda = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_psicologo, semana_inicio, semana_fin } = req.body;
    const nueva = yield agenda_1.Agenda.create({ id_psicologo, semana_inicio, semana_fin });
    res.json(nueva);
});
exports.crearAgenda = crearAgenda;
// CRUD de citas
const getCitas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_agenda } = req.params;
    const citas = yield cita_1.Cita.findAll({ where: { id_agenda } });
    res.json(citas);
});
exports.getCitas = getCitas;
const crearCita = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cita = yield cita_1.Cita.create(req.body);
    res.json(cita);
});
exports.crearCita = crearCita;
const actualizarCita = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_cita } = req.params;
    yield cita_1.Cita.update(req.body, { where: { id_cita } });
    res.json({ msg: "Cita actualizada" });
});
exports.actualizarCita = actualizarCita;
const eliminarCita = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_cita } = req.params;
    yield cita_1.Cita.destroy({ where: { id_cita } });
    res.json({ msg: "Cita eliminada" });
});
exports.eliminarCita = eliminarCita;
