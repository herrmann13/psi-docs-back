import { z } from "zod";

const PaymentMethodSchema = z.enum([
    "PIX",
    "BANK_TRANSFER",
    "CASH",
    "CREDIT_CARD",
    "DEBIT_CARD"
]);

export const PaymentCreateSchema = z.object({
    patientId: z.number().int(),
    totalAmount: z.number(),
    paymentMethod: PaymentMethodSchema,
    paymentDate: z.coerce.date(),
    notes: z.string().min(1).optional().nullable()
});

export const PaymentUpdateSchema = z.object({
    patientId: z.number().int().optional(),
    totalAmount: z.number().optional(),
    paymentMethod: PaymentMethodSchema.optional(),
    paymentDate: z.coerce.date().optional(),
    notes: z.string().min(1).optional().nullable()
});

export type PaymentCreate = z.infer<typeof PaymentCreateSchema>;
export type PaymentUpdate = z.infer<typeof PaymentUpdateSchema>;
