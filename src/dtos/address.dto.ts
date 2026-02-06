import { z } from "zod";

export const AddressCreateSchema = z.object({
    street: z.string().min(1),
    number: z.string().min(1),
    neighborhood: z.string().min(1),
    city: z.string().min(1),
    state: z.string().min(1),
    complement: z.string().min(1),
    patientId: z.number().int()
});

export const AddressUpdateSchema = z.object({
    street: z.string().min(1).optional(),
    number: z.string().min(1).optional(),
    neighborhood: z.string().min(1).optional(),
    city: z.string().min(1).optional(),
    state: z.string().min(1).optional(),
    complement: z.string().min(1).optional(),
    patientId: z.number().int().optional()
});

export type AddressCreate = z.infer<typeof AddressCreateSchema>;
export type AddressUpdate = z.infer<typeof AddressUpdateSchema>;
