import AbstractController from "./abstract.controller";
import AppointmentService from "../services/appointment.service";
import { AppointmentCreateSchema, AppointmentUpdateSchema, type AppointmentCreate, type AppointmentUpdate } from "../dtos/appointment.dto";

class AppointmentController extends AbstractController<AppointmentCreate, AppointmentUpdate> {
    constructor() {
        super(new AppointmentService(), AppointmentCreateSchema, AppointmentUpdateSchema);
    }
}

export default AppointmentController;
