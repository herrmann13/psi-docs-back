import AbstractController from "./abstract.controller";
import PatientService from "../services/patient.service";
import { PatientCreateSchema, PatientUpdateSchema, type PatientCreate, type PatientUpdate } from "../dtos/patient.dto";

class PatientController extends AbstractController<PatientCreate, PatientUpdate> {
    constructor() {
        super(new PatientService(), PatientCreateSchema, PatientUpdateSchema);
    }
}

export default PatientController;
