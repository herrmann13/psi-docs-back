import { Router } from "express";
import AuthController from "../controllers/auth.controller";

const router = Router();
const controller = new AuthController();

router.post("/google", (req, res) => controller.loginWithGoogle(req, res));

export default router;
