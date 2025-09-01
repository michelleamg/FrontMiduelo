import { Router } from "express";
import { getAgenda, crearAgenda, getCitas, crearCita, actualizarCita, eliminarCita } from "../controllers/agenda";
import validarToken from "./validarToken"; // opcional para proteger rutas

const router = Router();

router.get("/api/psicologo/agenda/:id_psicologo", validarToken, getAgenda);
router.post("/api/psicologo/agenda", validarToken, crearAgenda);

router.get("/api/psicologo/citas/:id_agenda", validarToken, getCitas);
router.post("/api/psicologo/citas", validarToken, crearCita);
router.put("/api/psicologo/citas/:id_cita", validarToken, actualizarCita);
router.delete("/api/psicologo/citas/:id_cita", validarToken, eliminarCita);

export default router;
