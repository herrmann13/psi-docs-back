import AbstractRepository from "./abstract.repository";

class ChargeRepository extends AbstractRepository<any> {
    constructor() {
        const { ChargeModel } = require("../models/charge.model");
        super(ChargeModel);
    }
}

export default ChargeRepository;
