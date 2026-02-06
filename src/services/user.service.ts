import AbstractService from "./abstract.service";

class UserService extends AbstractService<any> {
    constructor() {
        const UserRepository = require("../repositories/user.repository").default;
        super(new UserRepository(), "User");
    }
}

export default UserService;
