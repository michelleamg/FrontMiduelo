// backend/src/routes/chat.ts
import { Router } from "express";
import { 
  getChats, 
  getMensajes, 
  enviarMensaje, 
  crearChat,
  marcarComoLeido,
  buscarChats
} from "../controllers/chat";
import validarToken from "./validarToken";

const router = Router();

// ===== RUTAS DE CHAT =====
// Obtener todos los chats del psicólogo
router.get("/api/psicologo/chats", validarToken, getChats);

// Buscar chats
router.get("/api/psicologo/chats/buscar", validarToken, buscarChats);

// Obtener mensajes de un chat específico
router.get("/api/psicologo/chats/:id_chat/mensajes", validarToken, getMensajes);

// Marcar mensajes como leídos
router.put("/api/psicologo/chats/:id_chat/leer", validarToken, marcarComoLeido);

// Crear nuevo chat
router.post("/api/psicologo/chats", validarToken, crearChat);

// ===== RUTAS DE MENSAJES =====
// Enviar mensaje
router.post("/api/psicologo/mensajes", validarToken, enviarMensaje);

export default router;