import AbstractController from "./abstract.controller";
import AddressService from "../services/address.service";
import { AddressCreateSchema, AddressUpdateSchema, type AddressCreate, type AddressUpdate } from "../dtos/address.dto";

class AddressController extends AbstractController<AddressCreate, AddressUpdate> {
    constructor() {
        super(new AddressService(), AddressCreateSchema, AddressUpdateSchema);
    }
}

export default AddressController;
