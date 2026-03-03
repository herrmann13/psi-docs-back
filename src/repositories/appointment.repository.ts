import AbstractRepository from "./abstract.repository";

class AppointmentRepository extends AbstractRepository<any> {
    constructor() {
        const { AppointmentModel } = require("../models/appointment.model");
        super(AppointmentModel);
    }
}

export default AppointmentRepository;
