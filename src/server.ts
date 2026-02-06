import express, { Request, Response } from "express";
import patientRoutes from "./routes/patient.route";
import userRoutes from "./routes/user.route";
import addressRoutes from "./routes/address.route";
import emergencyContactRoutes from "./routes/emergencyContact.route";
import authRoutes from "./routes/auth.route";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./docs/swagger";

const app = express();
const port = 3000;

app.use(express.json());
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/auth", authRoutes);
app.use("/patients", patientRoutes);
app.use("/users", userRoutes);
app.use("/addresses", addressRoutes);
app.use("/emergency-contacts", emergencyContactRoutes);

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
