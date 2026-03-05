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
import sequelize from "./utils/db";
import { logger } from "./utils/logger";
import cors from "cors";
import jwt from "jsonwebtoken";
import { runWithRequestContext } from "./utils/requestContext";
import { initAssociations } from "./models/associations";

const app = express();
const port = Number(process.env.PORT) || 3000;
const host = process.env.HOST || "0.0.0.0";

app.use(express.json());
if (process.env.NODE_ENV !== "production") {
    app.use(cors());
}
app.use((req, _res, next) => {
    const header = req.headers.authorization;
    const jwtSecret = process.env.JWT_SECRET;
    let actorUserId: number | null = null;

    if (jwtSecret && header && header.startsWith("Bearer ")) {
        const token = header.slice("Bearer ".length).trim();
        if (token) {
            try {
                const payload = jwt.verify(token, jwtSecret) as { id?: number };
                if (typeof payload.id === "number") {
                    actorUserId = payload.id;
                    req.user = payload as any;
                }
            } catch {
                actorUserId = null;
            }
        }
    }

    runWithRequestContext({ actorUserId }, () => next());
});
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
    const startedAt = Date.now();
    const databaseUrl = process.env.DATABASE_URL;
    let dbHost: string | undefined;
    if (databaseUrl) {
        try {
            dbHost = new URL(databaseUrl).host;
        } catch {
            dbHost = undefined;
        }
    }
    logger.info({ dbHost, hasDatabaseUrl: Boolean(databaseUrl) }, "Health check started");
    sequelize.authenticate()
        .then(() => {
            const responseTime = Date.now() - startedAt;
            logger.info({ dbHost, responseTime }, "Health check database online");
            res.json({
                api: "online",
                db: {
                    status: "online",
                    responseTime
                }
            });
        })
        .catch((error) => {
            const responseTime = Date.now() - startedAt;
            logger.error({ dbHost, responseTime, error }, "Health check database offline");
            res.status(503).json({
                api: "online",
                db: {
                    status: "offline",
                    responseTime,
                    error: error instanceof Error ? error.message : "Database connection failed"
                }
            });
        });
})

app.listen(port, host, () => {
    //sequelize.sync()
     //   .then(() => {
      //      logger.info("Database synchronized successfully");
      //  }).catch((error) => {
       //     logger.error({ error }, "Database synchronization failed");
       // });
    initAssociations()
    console.log(`API Psi-Docs rodando em http://${host}:${port}`);
});
