import { z } from "zod";

export const PaymentAttachmentCreateSchema = z.object({
    paymentId: z.number().int(),
    filePath: z.string().min(1),
    originalFilename: z.string().min(1),
    mimeType: z.string().min(1),
    fileSize: z.number().int(),
    fileHash: z.string().min(1),
    uploadedAt: z.coerce.date()
});

export const PaymentAttachmentUpdateSchema = z.object({
    paymentId: z.number().int().optional(),
    filePath: z.string().min(1).optional(),
    originalFilename: z.string().min(1).optional(),
    mimeType: z.string().min(1).optional(),
    fileSize: z.number().int().optional(),
    fileHash: z.string().min(1).optional(),
    uploadedAt: z.coerce.date().optional()
});

export type PaymentAttachmentCreate = z.infer<typeof PaymentAttachmentCreateSchema>;
export type PaymentAttachmentUpdate = z.infer<typeof PaymentAttachmentUpdateSchema>;
