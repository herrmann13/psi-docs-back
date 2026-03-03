import AbstractController from "./abstract.controller";
import PaymentAttachmentService from "../services/paymentAttachment.service";
import { PaymentAttachmentCreateSchema, PaymentAttachmentUpdateSchema, type PaymentAttachmentCreate, type PaymentAttachmentUpdate } from "../dtos/paymentAttachment.dto";

class PaymentAttachmentController extends AbstractController<PaymentAttachmentCreate, PaymentAttachmentUpdate> {
    constructor() {
        super(new PaymentAttachmentService(), PaymentAttachmentCreateSchema, PaymentAttachmentUpdateSchema);
    }
}

export default PaymentAttachmentController;
