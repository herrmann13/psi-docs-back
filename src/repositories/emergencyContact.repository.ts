import AbstractRepository from "./abstract.repository";

class EmergencyContactRepository extends AbstractRepository<any> {
    constructor() {
        const { EmergencyContactModel } = require("../models/emergencyContact.model");
        super(EmergencyContactModel);
    }
}

export default EmergencyContactRepository;
