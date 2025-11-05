import User, { type IUser } from "../models/User.model";

export default class UserRepository {
  async findByEmail(email: string) {
    return User.findOne({ email }).select("+password");
  }

  async create(data: Partial<IUser>) {
    return await User.create(data);
  }

  async getAllUsers() {
    return User.find();
  }
}
