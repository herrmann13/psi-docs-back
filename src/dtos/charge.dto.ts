import { z } from "zod";

const ChargeStatusSchema = z.enum([
    "PENDING",
    "PARTIALLY_PAID",
    "PAID",
    "CANCELLED"
]);

export const ChargeCreateSchema = z.object({
    appointmentId: z.number().int(),
    patientId: z.number().int(),
    originalAmount: z.number(),
    outstandingAmount: z.number(),
    status: ChargeStatusSchema,
    dueDate: z.coerce.date().optional().nullable()
});

export const ChargeUpdateSchema = z.object({
    appointmentId: z.number().int().optional(),
    patientId: z.number().int().optional(),
    originalAmount: z.number().optional(),
    outstandingAmount: z.number().optional(),
    status: ChargeStatusSchema.optional(),
    dueDate: z.coerce.date().optional().nullable()
});

export type ChargeCreate = z.infer<typeof ChargeCreateSchema>;
export type ChargeUpdate = z.infer<typeof ChargeUpdateSchema>;
