import AbstractRepository from "./abstract.repository";

class PatientRepository extends AbstractRepository<any> {
    constructor() {
        const { PatientModel } = require("../models/patient.model");
        super(PatientModel);
    }

    
}

export default PatientRepository;