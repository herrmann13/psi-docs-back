import type { Transaction } from "sequelize";
import AbstractRepository from "./abstract.repository";

class UserRepository extends AbstractRepository<any> {
    constructor() {
        const { UserModel } = require("../models/user.model");
        super(UserModel);
    }

    async findByGoogleId(googleId: string, transaction?: Transaction): Promise<any | null> {
        const { UserModel } = require("../models/user.model");
        const instance = await UserModel.findOne({ where: { googleId }, transaction });
        return instance ? (instance.toJSON() as any) : null;
    }

    async findByEmail(email: string, transaction?: Transaction): Promise<any | null> {
        const { UserModel } = require("../models/user.model");
        const instance = await UserModel.findOne({ where: { email }, transaction });
        return instance ? (instance.toJSON() as any) : null;
    }
}

export default UserRepository;
