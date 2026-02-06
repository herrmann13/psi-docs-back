import { z } from "zod";

export const AuthGoogleSchema = z.object({
    idToken: z.string().min(1)
});

export type AuthGoogle = z.infer<typeof AuthGoogleSchema>;
