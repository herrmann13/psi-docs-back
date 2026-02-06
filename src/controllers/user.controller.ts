import AbstractController from "./abstract.controller";
import UserService from "../services/user.service";
import { UserCreateSchema, UserUpdateSchema, type UserCreate, type UserUpdate } from "../dtos/user.dto";

class UserController extends AbstractController<UserCreate, UserUpdate> {
    constructor() {
        super(new UserService(), UserCreateSchema, UserUpdateSchema);
    }
}

export default UserController;
