import express, { Request, Response } from "express";
import patientRoutes from "./routes/patient.route";
import userRoutes from "./routes/user.route";
import addressRoutes from "./routes/address.route";
import emergencyContactRoutes from "./routes/emergencyContact.route";
import authRoutes from "./routes/auth.route";
import appointmentRoutes from "./routes/appointment.route";
import chargeRoutes from "./routes/charge.route";
import paymentRoutes from "./routes/payment.route";
import paymentChargeRoutes from "./routes/paymentCharge.route";
import paymentAttachmentRoutes from "./routes/paymentAttachment.route";
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
app.use("/appointments", appointmentRoutes);
app.use("/charges", chargeRoutes);
app.use("/payments", paymentRoutes);
app.use("/payment-charges", paymentChargeRoutes);
app.use("/payment-attachments", paymentAttachmentRoutes);

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
