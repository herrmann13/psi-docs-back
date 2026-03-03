import AbstractRepository from "./abstract.repository";

class PaymentRepository extends AbstractRepository<any> {
    constructor() {
        const { PaymentModel } = require("../models/payment.model");
        super(PaymentModel);
    }
}

export default PaymentRepository;
