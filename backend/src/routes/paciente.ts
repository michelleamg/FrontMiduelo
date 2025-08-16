import { Router } from "express";
import { getPacientes, registroPaciente } from "../controllers/paciente";
import validarToken from './validarToken';

const router = Router();
router.post("/api/paciente/registro", registroPaciente);
router.get("/api/paciente/lista-pacientes", validarToken, getPacientes);


export default router;