import AbstractService from "./abstract.service";

class PaymentAttachmentService extends AbstractService<any> {
    constructor() {
        const PaymentAttachmentRepository = require("../repositories/paymentAttachment.repository").default;
        super(new PaymentAttachmentRepository(), "PaymentAttachment");
    }
}

export default PaymentAttachmentService;
