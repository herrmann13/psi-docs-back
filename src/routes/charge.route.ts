import { Router } from "express";
import ChargeController from "../controllers/charge.controller";

const router = Router();
const controller = new ChargeController();

router.post("/", (req, res) => controller.create(req, res));
router.get("/", (req, res) => controller.findAllOrById(req, res));
router.put("/:id", (req, res) => controller.update(req, res));
router.delete("/:id", (req, res) => controller.delete(req, res));

export default router;
