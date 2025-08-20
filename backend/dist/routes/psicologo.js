"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const psicologo_1 = require("../controllers/psicologo");
const router = (0, express_1.Router)();
router.post("/api/psicologo/registro", psicologo_1.registro);
router.post("/api/psicologo/iniciar-sesion", psicologo_1.login);
exports.default = router;
