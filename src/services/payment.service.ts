import AbstractService from "./abstract.service";

class PaymentService extends AbstractService<any> {
    constructor() {
        const PaymentRepository = require("../repositories/payment.repository").default;
        super(new PaymentRepository(), "Payment");
    }
}

export default PaymentService;
