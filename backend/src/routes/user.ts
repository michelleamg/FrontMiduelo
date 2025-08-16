import { Router } from "express";
import { login, registro } from "../controllers/user";

const router = Router();
router.post("/api/user/registro", registro);
router.post("/api/user/login", login);

export default router;