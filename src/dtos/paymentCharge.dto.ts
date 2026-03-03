import { z } from "zod";

export const PaymentChargeCreateSchema = z.object({
    paymentId: z.number().int(),
    chargeId: z.number().int(),
    amountPaid: z.number()
});

export const PaymentChargeUpdateSchema = z.object({
    paymentId: z.number().int().optional(),
    chargeId: z.number().int().optional(),
    amountPaid: z.number().optional()
});

export type PaymentChargeCreate = z.infer<typeof PaymentChargeCreateSchema>;
export type PaymentChargeUpdate = z.infer<typeof PaymentChargeUpdateSchema>;
