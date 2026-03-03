import AbstractController from "./abstract.controller";
import PaymentChargeService from "../services/paymentCharge.service";
import { PaymentChargeCreateSchema, PaymentChargeUpdateSchema, type PaymentChargeCreate, type PaymentChargeUpdate } from "../dtos/paymentCharge.dto";

class PaymentChargeController extends AbstractController<PaymentChargeCreate, PaymentChargeUpdate> {
    constructor() {
        super(new PaymentChargeService(), PaymentChargeCreateSchema, PaymentChargeUpdateSchema);
    }
}

export default PaymentChargeController;
