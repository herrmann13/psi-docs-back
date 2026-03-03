import AbstractRepository from "./abstract.repository";

class PaymentAttachmentRepository extends AbstractRepository<any> {
    constructor() {
        const { PaymentAttachmentModel } = require("../models/paymentAttachment.model");
        super(PaymentAttachmentModel);
    }
}

export default PaymentAttachmentRepository;
