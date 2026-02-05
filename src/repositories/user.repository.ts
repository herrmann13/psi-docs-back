import AbstractRepository from "./abstract.repository";

class UserRepository extends AbstractRepository<any> {
    constructor() {
        const { UserModel } = require("../models/user.model");
        super(UserModel);
    }
}

export default UserRepository;