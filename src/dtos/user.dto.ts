import { z } from "zod";

export const UserCreateSchema = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    googleId: z.string().min(1),
    licenseNumber: z.string().min(1).optional(),
    defaultSessionValue: z.number().optional(),
    isActive: z.boolean().optional()
});

export const UserUpdateSchema = z.object({
    name: z.string().min(1).optional(),
    email: z.string().email().optional(),
    googleId: z.string().min(1).optional(),
    licenseNumber: z.string().min(1).optional(),
    defaultSessionValue: z.number().optional(),
    isActive: z.boolean().optional()
});

export type UserCreate = z.infer<typeof UserCreateSchema>;
export type UserUpdate = z.infer<typeof UserUpdateSchema>;
