import AbstractController from "./abstract.controller";
import EmergencyContactService from "../services/emergencyContact.service";
import { EmergencyContactCreateSchema, EmergencyContactUpdateSchema, type EmergencyContactCreate, type EmergencyContactUpdate } from "../dtos/emergencyContact.dto";

class EmergencyContactController extends AbstractController<EmergencyContactCreate, EmergencyContactUpdate> {
    constructor() {
        super(new EmergencyContactService(), EmergencyContactCreateSchema, EmergencyContactUpdateSchema);
    }
}

export default EmergencyContactController;
