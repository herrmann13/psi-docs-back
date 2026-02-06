import AbstractService from "./abstract.service";

class EmergencyContactService extends AbstractService<any> {
    constructor() {
        const EmergencyContactRepository = require("../repositories/emergencyContact.repository").default;
        super(new EmergencyContactRepository(), "EmergencyContact");
    }
}

export default EmergencyContactService;
