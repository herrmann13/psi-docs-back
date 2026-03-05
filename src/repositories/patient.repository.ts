import AbstractRepository from "./abstract.repository";

class PatientRepository extends AbstractRepository<any> {
    constructor() {
        const { PatientModel } = require("../models/patient.model");
        super(PatientModel);
    }

    async findById(id: number, transaction?: import("sequelize").Transaction): Promise<any | null> {
        const { PatientModel } = require("../models/patient.model");
        const { EmergencyContactModel } = require("../models/emergencyContact.model");
        const { AddressModel } = require("../models/address.model");
        const instance = await PatientModel.findByPk(id, {
            transaction,
            include: [
                {
                    model: EmergencyContactModel,
                    as: "emergencyContacts"
                },
                {
                    model: AddressModel,
                    as: "address"
                }
            ]
        });
        return instance ? (instance.toJSON() as any) : null;
    }

    async findAll(transaction?: import("sequelize").Transaction): Promise<any[]> {
        const { PatientModel } = require("../models/patient.model");
        const { EmergencyContactModel } = require("../models/emergencyContact.model");
        const { AddressModel } = require("../models/address.model");
        const instances = await PatientModel.findAll({
            transaction,
            include: [
                {
                    model: EmergencyContactModel,
                    as: "emergencyContacts"
                },
                {
                    model: AddressModel,
                    as: "address"
                }
            ]
        });
        return instances.map((instance: any) => instance.toJSON() as any);
    }
}

export default PatientRepository;
