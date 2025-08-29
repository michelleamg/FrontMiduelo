// routes/agenda.ts
import { Router } from "express";
import { getAgenda, crearAgenda, getCitas, crearCita, actualizarCita, eliminarCita } from "../controllers/agenda";

const router = Router();

router.get("/api/agenda/:id_psicologo", getAgenda);
router.post("/api/agenda", crearAgenda);

router.get("/api/citas/:id_agenda", getCitas);
router.post("/api/citas", crearCita);
router.put("/api/citas/:id_cita", actualizarCita);
router.delete("/api/citas/:id_cita", eliminarCita);

export default router;
