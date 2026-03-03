import AbstractController from "./abstract.controller";
import ChargeService from "../services/charge.service";
import { ChargeCreateSchema, ChargeUpdateSchema, type ChargeCreate, type ChargeUpdate } from "../dtos/charge.dto";

class ChargeController extends AbstractController<ChargeCreate, ChargeUpdate> {
    constructor() {
        super(new ChargeService(), ChargeCreateSchema, ChargeUpdateSchema);
    }
}

export default ChargeController;
