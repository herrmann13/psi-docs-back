import AbstractService from "./abstract.service";

class AddressService extends AbstractService<any> {
    constructor() {
        const AddressRepository = require("../repositories/address.repository").default;
        super(new AddressRepository(), "Address");
    }
}

export default AddressService;
