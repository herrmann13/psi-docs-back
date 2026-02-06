import { Router } from "express";
import EmergencyContactController from "../controllers/emergencyContact.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();
const controller = new EmergencyContactController();

router.use(authMiddleware);

router.post("/", (req, res) => controller.create(req, res));
router.get("/", (req, res) => controller.findAllOrById(req, res));
router.put("/:id", (req, res) => controller.update(req, res));
router.delete("/:id", (req, res) => controller.delete(req, res));

export default router;
