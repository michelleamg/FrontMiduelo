"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const disponibilidad_1 = require("../controllers/disponibilidad");
const validarToken_1 = __importDefault(require("./validarToken"));
const router = (0, express_1.Router)();
// ===== RUTAS DE DISPONIBILIDAD =====
router.get("/api/psicologo/disponibilidad/:id_psicologo", validarToken_1.default, disponibilidad_1.getDisponibilidad);
router.post("/api/psicologo/disponibilidad", validarToken_1.default, disponibilidad_1.crearDisponibilidad);
router.delete("/api/psicologo/disponibilidad/:id_psicologo/:dia_semana/:hora_inicio", validarToken_1.default, disponibilidad_1.eliminarDisponibilidad);
// ===== RUTAS DE EXCEPCIONES =====
router.get("/api/psicologo/excepcion/:id_psicologo", validarToken_1.default, disponibilidad_1.getExcepciones);
router.post("/api/psicologo/excepcion", validarToken_1.default, disponibilidad_1.crearExcepcion);
router.delete("/api/psicologo/excepcion/:id_excepcion", validarToken_1.default, disponibilidad_1.eliminarExcepcion);
exports.default = router;
