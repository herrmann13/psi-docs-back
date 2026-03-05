import type { Transaction } from "sequelize";
import AbstractService from "./abstract.service";
import { withTransaction } from "../utils/conditionalTransaction";
import { logger } from "../utils/logger";
import type { PatientCreate } from "../dtos/patient.dto";
import UserRepository from "../repositories/user.repository";
import EmergencyContactRepository from "../repositories/emergencyContact.repository";

class PatientService extends AbstractService<any>   {
    private userRepository: UserRepository;
    private emergencyContactRepository: EmergencyContactRepository;

    constructor() {
        const PatientRepository = require("../repositories/patient.repository").default;
        super(new PatientRepository(), "Patient");
        this.userRepository = new UserRepository();
        this.emergencyContactRepository = new EmergencyContactRepository();
    }

    async create(data: PatientCreate, transaction?: Transaction, actorUserId?: number): Promise<any> {
        const { user, emergencyContacts, ...patientData } = data;

        const created = await withTransaction(async (tx) => {
            const createdUser = await this.userRepository.create({
                name: user.name,
                email: user.email,
                googleId: user.googleId ?? null,
                licenseNumber: user.licenseNumber ?? null,
                defaultSessionValue: user.defaultSessionValue ?? null,
                isActive: user.isActive ?? true,
                password: null
            }, tx);

            const createdPatient = await this.repository.create({
                ...patientData,
                userId: createdUser.id
            }, tx);

            if (emergencyContacts && emergencyContacts.length > 0) {
                await Promise.all(
                    emergencyContacts.map((contact) =>
                        this.emergencyContactRepository.create({
                            name: contact.name,
                            phone: contact.phone,
                            isActive: contact.isActive ?? true,
                            patientId: createdPatient.id
                        }, tx)
                    )
                );
            }

            const patientWithContacts = await this.repository.findById(createdPatient.id, tx);
            return patientWithContacts ?? createdPatient;
        }, transaction);

        const createdId = (created as { id?: number }).id;
        if (createdId !== undefined) {
            logger.info({ entity: this.entityName, id: createdId, actorUserId }, `${this.entityName} created`);
        }

        return created;
    }
}

export default PatientService;
