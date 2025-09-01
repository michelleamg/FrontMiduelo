"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const agenda_1 = require("../controllers/agenda");
const validarToken_1 = __importDefault(require("./validarToken")); // opcional para proteger rutas
const router = (0, express_1.Router)();
router.get("/api/psicologo/agenda/:id_psicologo", validarToken_1.default, agenda_1.getAgenda);
router.post("/api/psicologo/agenda", validarToken_1.default, agenda_1.crearAgenda);
router.get("/api/psicologo/citas/:id_agenda", validarToken_1.default, agenda_1.getCitas);
router.post("/api/psicologo/citas", validarToken_1.default, agenda_1.crearCita);
router.put("/api/psicologo/citas/:id_cita", validarToken_1.default, agenda_1.actualizarCita);
router.delete("/api/psicologo/citas/:id_cita", validarToken_1.default, agenda_1.eliminarCita);
exports.default = router;
