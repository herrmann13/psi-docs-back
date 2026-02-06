import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/user.model";
import { withTransaction } from "../utils/conditionalTransaction";

const clientId = process.env.GOOGLE_CLIENT_ID;
const oauthClient = new OAuth2Client(clientId);

type AuthUser = {
    id: number;
    email: string;
    name: string;
    googleId: string;
    picture?: string;
};

type AuthResult = {
    token: string;
    user: AuthUser;
};

class AuthService {
    async loginWithGoogle(idToken: string): Promise<AuthResult> {
        if (!clientId) {
            throw new Error("GOOGLE_CLIENT_ID not configured");
        }

        const ticket = await oauthClient.verifyIdToken({
            idToken,
            audience: clientId
        });

        const payload = ticket.getPayload();
        if (!payload || !payload.sub || !payload.email) {
            throw new Error("Invalid token payload");
        }

        const googleId = payload.sub;
        const email = payload.email;
        const name = payload.name ?? email;
        const picture = payload.picture;

        const user = await withTransaction(async (tx) => {
            let existing = await UserModel.findOne({ where: { googleId }, transaction: tx });

            if (!existing) {
                existing = await UserModel.findOne({ where: { email }, transaction: tx });
            }

            if (!existing) {
                existing = await UserModel.create({
                    googleId,
                    email,
                    name,
                    password: null
                }, { transaction: tx });
            } else if (!existing.googleId) {
                await existing.update({ googleId }, { transaction: tx });
            }

            return existing;
        });

        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            throw new Error("JWT_SECRET not configured");
        }

        const token = jwt.sign({
            id: user.id,
            email: user.email,
            name: user.name,
            googleId,
            picture
        }, jwtSecret, { expiresIn: process.env.JWT_EXPIRES_IN ?? "1d" });

        return {
            token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                googleId,
                picture
            }
        };
    }
}

export default AuthService;
