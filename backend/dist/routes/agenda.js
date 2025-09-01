"use strict";
// // routes/agenda.ts
// import { Router } from "express";
// import { getAgenda, crearAgenda, getCitas, crearCita, actualizarCita, eliminarCita } from "../controllers/agenda";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const router = Router();
// router.get("/api/agenda/:id_psicologo", getAgenda);
// router.post("/api/agenda", crearAgenda);
// router.get("/api/citas/:id_agenda", getCitas);
// router.post("/api/citas", crearCita);
// router.put("/api/citas/:id_cita", actualizarCita);
// router.delete("/api/citas/:id_cita", eliminarCita);
// export default router;
// src/routes/agenda.ts
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
