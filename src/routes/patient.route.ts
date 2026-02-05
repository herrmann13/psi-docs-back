import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
    res.json({ message: "Patient routes working" });
});

export default router;