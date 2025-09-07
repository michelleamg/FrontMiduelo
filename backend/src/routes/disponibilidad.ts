import { Router } from "express";
import { 
  getDisponibilidad, 
  crearDisponibilidad, 
  eliminarDisponibilidad,
  crearExcepcion,
  getExcepciones,
  eliminarExcepcion
} from "../controllers/disponibilidad";
import validarToken from "./validarToken";

const router = Router();

// ===== RUTAS DE DISPONIBILIDAD =====
router.get("/api/psicologo/disponibilidad/:id_psicologo", validarToken, getDisponibilidad);
router.post("/api/psicologo/disponibilidad", validarToken, crearDisponibilidad);
router.delete("/api/psicologo/disponibilidad/:id_psicologo/:dia_semana/:hora_inicio", validarToken, eliminarDisponibilidad);

// ===== RUTAS DE EXCEPCIONES =====
router.get("/api/psicologo/excepcion/:id_psicologo", validarToken, getExcepciones);
router.post("/api/psicologo/excepcion", validarToken, crearExcepcion);
router.delete("/api/psicologo/excepcion/:id_excepcion", validarToken, eliminarExcepcion);

export default router;