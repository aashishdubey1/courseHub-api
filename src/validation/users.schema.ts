import { z } from "zod";

export const UserRegisterSchema = z.object({
  name: z
    .string()
    .trim()
    .nonempty("Name is required")
    .min(3, "Name must be at least 3 characters"),
  email: z.email("Invalid email format").trim().lowercase(),
  password: z
    .string("Password is required")
    .trim()
    .min(6, "Password should be at least 6 characters long")
    .nonempty(),
  role: z.enum(["STUDENT", "INSTRUCTOR", "ADMIN"]),
});

export const UserLoginSchema = z.object({
  email: z.email("Invalid email format").trim().lowercase(),
  password: z
    .string("Password is required")
    .trim()
    .min(6, "Password should be at least 6 characters long")
    .nonempty(),
});

export type UserRegisterInput = z.infer<typeof UserRegisterSchema>;
export type UserLoginInput = z.infer<typeof UserLoginSchema>;
