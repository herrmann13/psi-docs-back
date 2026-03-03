import { z } from "zod";

const AppointmentStatusSchema = z.enum([
    "SCHEDULED",
    "CONFIRMED",
    "COMPLETED",
    "CANCELLED",
    "NO_SHOW"
]);

export const AppointmentCreateSchema = z.object({
    patientId: z.number().int(),
    psychologistId: z.number().int(),
    startTime: z.coerce.date(),
    endTime: z.coerce.date(),
    status: AppointmentStatusSchema,
    sessionValue: z.number(),
    cancelledAt: z.coerce.date().optional().nullable(),
    cancelledReason: z.string().min(1).optional().nullable(),
    completedAt: z.coerce.date().optional().nullable(),
    rescheduledAt: z.coerce.date().optional().nullable(),
    rescheduleReason: z.string().min(1).optional().nullable()
});

export const AppointmentUpdateSchema = z.object({
    patientId: z.number().int().optional(),
    psychologistId: z.number().int().optional(),
    startTime: z.coerce.date().optional(),
    endTime: z.coerce.date().optional(),
    status: AppointmentStatusSchema.optional(),
    sessionValue: z.number().optional(),
    cancelledAt: z.coerce.date().optional().nullable(),
    cancelledReason: z.string().min(1).optional().nullable(),
    completedAt: z.coerce.date().optional().nullable(),
    rescheduledAt: z.coerce.date().optional().nullable(),
    rescheduleReason: z.string().min(1).optional().nullable()
});

export type AppointmentCreate = z.infer<typeof AppointmentCreateSchema>;
export type AppointmentUpdate = z.infer<typeof AppointmentUpdateSchema>;
