import express, { Request, Response } from "express";
import { authMiddleware } from "./middleware/auth.middleware";

const app = express();
const port = 3000;

app.use(express.json());
app.use(authMiddleware);

app.get("/", (req: Request, res: Response) => {
    res.json({ message: "API Psi-Docs online"});
})

app.get("/health", (req:Request, res: Response) => {
    res.json({
        api:"online",
        db:{
            status:"not-implemented",
            responseTime:"not-implemented"
        }
    });
})
