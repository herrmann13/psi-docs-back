import AbstractController from "./abstract.controller";
import PaymentService from "../services/payment.service";
import { PaymentCreateSchema, PaymentUpdateSchema, type PaymentCreate, type PaymentUpdate } from "../dtos/payment.dto";

class PaymentController extends AbstractController<PaymentCreate, PaymentUpdate> {
    constructor() {
        super(new PaymentService(), PaymentCreateSchema, PaymentUpdateSchema);
    }
}

export default PaymentController;
