import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

type AuthUser = {
    id: number;
    email: string;
    name: string;
    googleId: string;
    picture?: string;
};

declare module "express-serve-static-core" {
    interface Request {
        user?: AuthUser;
    }
}

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
        return res.status(500).json({ message: "JWT_SECRET not configured" });
    }

    const header = req.headers.authorization;
    if (!header || !header.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Authorization token missing" });
    }

    const token = header.slice("Bearer ".length).trim();
    if (!token) {
        return res.status(401).json({ message: "Authorization token missing" });
    }

    try {
        const payload = jwt.verify(token, jwtSecret) as AuthUser;
        req.user = payload;
        return next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
}
