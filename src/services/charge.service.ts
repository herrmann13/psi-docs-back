import AbstractService from "./abstract.service";

class ChargeService extends AbstractService<any> {
    constructor() {
        const ChargeRepository = require("../repositories/charge.repository").default;
        super(new ChargeRepository(), "Charge");
    }
}

export default ChargeService;
