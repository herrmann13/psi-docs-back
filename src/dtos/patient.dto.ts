import { z } from "zod";

const PatientEmergencyContactSchema = z.object({
    name: z.string().min(1),
    phone: z.string().min(1),
    isActive: z.boolean().optional()
});

const PatientAddressSchema = z.object({
    street: z.string().min(1),
    number: z.string().min(1),
    complement: z.string().min(1).optional().nullable(),
    neighborhood: z.string().min(1),
    city: z.string().min(1),
    state: z.string().min(1)
});

export const PatientCreateSchema = z.object({
    fullName: z.string().min(1),
    cpf: z.string().min(1),
    birthDate: z.coerce.date(),
    phone: z.string().min(1),
    address: PatientAddressSchema.optional(),
    emergencyContacts: z.array(PatientEmergencyContactSchema).optional()
});

export const PatientUpdateSchema = z.object({
    fullName: z.string().min(1).optional(),
    cpf: z.string().min(1).optional(),
    birthDate: z.coerce.date().optional(),
    phone: z.string().min(1).optional()
});

export type PatientCreate = z.infer<typeof PatientCreateSchema>;
export type PatientUpdate = z.infer<typeof PatientUpdateSchema>;
