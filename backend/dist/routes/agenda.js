"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// routes/agenda.ts
const express_1 = require("express");
const agenda_1 = require("../controllers/agenda");
const router = (0, express_1.Router)();
router.get("/api/agenda/:id_psicologo", agenda_1.getAgenda);
router.post("/api/agenda", agenda_1.crearAgenda);
router.get("/api/citas/:id_agenda", agenda_1.getCitas);
router.post("/api/citas", agenda_1.crearCita);
router.put("/api/citas/:id_cita", agenda_1.actualizarCita);
router.delete("/api/citas/:id_cita", agenda_1.eliminarCita);
exports.default = router;
