"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// backend/src/routes/admin.ts
const express_1 = require("express");
const admin_1 = require("../controllers/admin");
const validarToken_1 = __importDefault(require("./validarToken"));
const validarAdmin_1 = __importDefault(require("./validarAdmin"));
const router = (0, express_1.Router)();
// ===== RUTAS PÚBLICAS (SOLO PARA SETUP INICIAL) =====
//  NOTA: En producción, esta ruta debería estar protegida o removida
router.post("/api/psicologo/registro-admin", admin_1.registroAdmin);
// ===== RUTAS PROTEGIDAS PARA ADMINISTRADORES =====
// Verificar que el token es de un administrador
router.get("/api/admin/verificar", validarToken_1.default, admin_1.verificarAdmin);
// Gestión de psicólogos
router.get("/api/admin/psicologos", validarAdmin_1.default, admin_1.getAllPsicologos);
router.put("/api/admin/psicologos/:id_psicologo/validar-cedula", validarAdmin_1.default, admin_1.validarCedula);
router.put("/api/admin/psicologos/:id_psicologo/status", validarAdmin_1.default, admin_1.cambiarStatusPsicologo);
router.delete("/api/admin/psicologos/:id_psicologo", validarAdmin_1.default, admin_1.eliminarPsicologo);
// Gestión de pacientes
router.get("/api/admin/pacientes", validarAdmin_1.default, admin_1.getAllPacientes);
exports.default = router;
