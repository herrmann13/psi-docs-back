import type { Request, Response } from "express";
import AuthService from "../services/auth.service";
import { AuthGoogleSchema } from "../dtos/auth.dto";

class AuthController {
    private service: AuthService;

    constructor() {
        this.service = new AuthService();
    }

    async loginWithGoogle(req: Request, res: Response) {
        const payload = AuthGoogleSchema.safeParse(req.body);
        if (!payload.success) {
            return res.status(400).json({
                message: "Validation error",
                errors: payload.error.flatten()
            });
        }

        try {
            const result = await this.service.loginWithGoogle(payload.data.idToken);
            return res.json(result);
        } catch (error) {
            return res.status(401).json({ message: "Invalid token" });
        }
    }
}

export default AuthController;
