import AbstractService from "./abstract.service";

class AppointmentService extends AbstractService<any> {
    constructor() {
        const AppointmentRepository = require("../repositories/appointment.repository").default;
        super(new AppointmentRepository(), "Appointment");
    }
}

export default AppointmentService;
