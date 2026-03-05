import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import { withTransaction } from "../utils/conditionalTransaction";
import { logger } from "../utils/logger";
import UserRepository from "../repositories/user.repository";

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
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    async loginWithGoogle(idToken: string): Promise<AuthResult> {
        if (!clientId) {
            throw new Error("GOOGLE_CLIENT_ID not configured");
        }

        logger.info("Auth Google login started");
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

        logger.info({ email, googleId }, "Auth Google token verified");

        const user = await withTransaction(async (tx) => {
            let existing = await this.userRepository.findByGoogleId(googleId, tx);

            if (!existing) {
                existing = await this.userRepository.findByEmail(email, tx);
                if (existing) {
                    logger.info({ userId: existing.id, email }, "Auth user found by email");
                }
            } else {
                logger.info({ userId: existing.id, googleId }, "Auth user found by googleId");
            }

            if (!existing) {
                existing = await this.userRepository.create({
                    googleId,
                    email,
                    name,
                    password: null
                }, tx);
                logger.info({ userId: existing.id, email }, "Auth user created");
            } else if (!existing.googleId) {
                existing = await this.userRepository.update(existing.id, { googleId }, tx);
                if (existing) {
                    logger.info({ userId: existing.id, googleId }, "Auth user linked to googleId");
                }
            }

            return existing;
        });

        if (!user) {
            throw new Error("User not found");
        }

        const jwtSecret = process.env.JWT_SECRET as jwt.Secret | undefined;
        if (!jwtSecret) {
            throw new Error("JWT_SECRET not configured");
        }

        const resolvedGoogleId = user.googleId ?? googleId;
        const expiresIn = (process.env.JWT_EXPIRES_IN ?? "1d") as jwt.SignOptions["expiresIn"];
        const token = jwt.sign({
            id: user.id,
            email: user.email,
            name: user.name,
            googleId: resolvedGoogleId,
            picture
        }, jwtSecret, { expiresIn });

        logger.info({ userId: user.id, email }, "Auth token issued");

        return {
            token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                googleId: resolvedGoogleId,
                picture
            }
        };
    }
}

export default AuthService;
