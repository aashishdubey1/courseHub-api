import type { Request, Response } from "express";
import UserRepository from "../repositories/user.repository";
import jwt from "jsonwebtoken";
import serverConfig from "../config/serverConfig";

const userRepository = new UserRepository();

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  const existingUser = await userRepository.findByEmail(email);

  if (!existingUser)
    return res.status(404).json({ success: false, message: "User not found" });

  const isValidPassoword = await existingUser.comparePassword(password);

  if (!isValidPassoword)
    return res
      .status(400)
      .json({ success: false, message: "Invalid password" });

  const token = jwt.sign(
    { userId: existingUser._id, role: existingUser.role },
    serverConfig.JWT_SECRET_KEY!
  );

  return res
    .status(200)
    .json({ success: true, message: "user logged in", token });
}

export async function register(req: Request, res: Response) {
  const { name, email, password, role } = req.body;

  const existingUser = await userRepository.findByEmail(email);

  if (existingUser)
    return res
      .status(400)
      .json({ message: "User Already exist", success: false });

  const newUser = await userRepository.create({ name, email, password, role });

  if (!newUser)
    return res
      .status(500)
      .json({ message: "Error while creating user", success: false });

  const token = jwt.sign(
    { userId: newUser._id, role: newUser.role },
    serverConfig.JWT_SECRET_KEY!,
    { expiresIn: "1d" }
  );

  return res.status(200).json({ success: true, token, user: newUser });
}

export async function me(req: Request, res: Response) {}

export async function updateProfile(req: Request, res: Response) {}
