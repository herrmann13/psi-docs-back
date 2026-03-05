import type { Transaction } from "sequelize";
import AbstractService from "./abstract.service";
import { withTransaction } from "../utils/conditionalTransaction";
import { logger } from "../utils/logger";
import type { PatientCreate } from "../dtos/patient.dto";
import EmergencyContactRepository from "../repositories/emergencyContact.repository";
import AddressRepository from "../repositories/address.repository";

class PatientService extends AbstractService<any>   {
    private emergencyContactRepository: EmergencyContactRepository;
    private addressRepository: AddressRepository;

    constructor() {
        const PatientRepository = require("../repositories/patient.repository").default;
        super(new PatientRepository(), "Patient");
        this.emergencyContactRepository = new EmergencyContactRepository();
        this.addressRepository = new AddressRepository();
    }

    async create(data: PatientCreate, transaction?: Transaction, actorUserId?: number): Promise<any> {
        const { emergencyContacts, address, ...patientData } = data;

        if (!actorUserId) {
            throw new Error("Authenticated user required to create patient");
        }

        const created = await withTransaction(async (tx) => {
            const createdPatient = await this.repository.create({
                ...patientData,
                userId: actorUserId
            }, tx);

            if (address) {
                await this.addressRepository.create({
                    ...address,
                    patientId: createdPatient.id
                }, tx);
            }

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
