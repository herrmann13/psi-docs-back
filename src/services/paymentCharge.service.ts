import AbstractService from "./abstract.service";

class PaymentChargeService extends AbstractService<any> {
    constructor() {
        const PaymentChargeRepository = require("../repositories/paymentCharge.repository").default;
        super(new PaymentChargeRepository(), "PaymentCharge");
    }
}

export default PaymentChargeService;
