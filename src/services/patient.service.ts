import AbstractService from "./abstract.service";

class PatientService extends AbstractService<any>   {
    constructor() {
        const PatientRepository = require("../repositories/patient.repository").default;
        super(new PatientRepository(), "Patient");
    }
}

export default PatientService;
