import AbstractRepository from "./abstract.repository";

class PaymentChargeRepository extends AbstractRepository<any> {
    constructor() {
        const { PaymentChargeModel } = require("../models/paymentCharge.model");
        super(PaymentChargeModel);
    }
}

export default PaymentChargeRepository;
