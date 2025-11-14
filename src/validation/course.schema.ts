import { Types } from "mongoose";
import { z } from "zod";

export const CreateCourseSchema = z.object({
  title: z
    .string()
    .min(3, "Title is too short")
    .max(120, "Title is too long")
    .trim(),

  description: z
    .string()
    .min(15, "Description is too short")
    .max(2000, "Description is too long")
    .trim(),
  price: z.number().positive("price should be positive number"),
});

export const CourseParamsSchema = z.object({
  courseId: z.string().refine((val) => Types.ObjectId.isValid(val), {
    message: "Invalid Mongoose ObjectId.",
  }),
});

export const UpdateCourseSchema = CreateCourseSchema.partial();

export type CreateCourseInput = z.infer<typeof CreateCourseSchema>;
export type UpdateCourseInput = z.infer<typeof UpdateCourseSchema>;
