import { Request, Response, NextFunction } from "express";
import { OAuth2Client } from "google-auth-library";
import { UserModel } from "../models/user.model";

const clientId = process.env.GOOGLE_CLIENT_ID;
const oauthClient = new OAuth2Client(clientId);

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
    if (!clientId) {
        return res.status(500).json({ message: "GOOGLE_CLIENT_ID not configured" });
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
        const ticket = await oauthClient.verifyIdToken({
            idToken: token,
            audience: clientId
        });

        const payload = ticket.getPayload();
        if (!payload || !payload.sub || !payload.email) {
            return res.status(401).json({ message: "Invalid token payload" });
        }

        const googleId = payload.sub;
        const email = payload.email;
        const name = payload.name ?? email;
        const picture = payload.picture;

        let user = await UserModel.findOne({
            where: { googleId }
        });

        if (!user) {
            user = await UserModel.findOne({
                where: { email }
            });
        }

        if (!user) {
            user = await UserModel.create({
                googleId,
                email,
                name,
                password: null
            });
        } else if (!user.googleId) {
            await user.update({ googleId });
        }

        req.user = {
            id: user.id,
            email: user.email,
            name: user.name,
            googleId,
            picture
        };

        return next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
}
