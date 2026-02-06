import { z } from "zod";

export const EmergencyContactCreateSchema = z.object({
    name: z.string().min(1),
    phone: z.string().min(1),
    patientId: z.number().int()
});

export const EmergencyContactUpdateSchema = z.object({
    name: z.string().min(1).optional(),
    phone: z.string().min(1).optional(),
    patientId: z.number().int().optional()
});

export type EmergencyContactCreate = z.infer<typeof EmergencyContactCreateSchema>;
export type EmergencyContactUpdate = z.infer<typeof EmergencyContactUpdateSchema>;
