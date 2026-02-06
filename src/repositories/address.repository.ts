import AbstractRepository from "./abstract.repository";

class AddressRepository extends AbstractRepository<any> {
    constructor() {
        const { AddressModel } = require("../models/address.model");
        super(AddressModel);
    }
}

export default AddressRepository;