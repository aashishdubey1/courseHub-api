import User, { type IUser } from "../models/User.model";
import type { UserRegisterInput } from "../validation/users.schema";

export default class UserRepository {
  async findByEmail(email: string) {
    return User.findOne({ email }).select("+password");
  }

  async create(data: UserRegisterInput) {
    return await User.create(data);
  }

  async getAllUsers() {
    return User.find();
  }
}
