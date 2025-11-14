import { Router } from "express";
import {
  createCourse,
  deleteCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
} from "../../controller/courses.controller";
import {
  validateBody,
  validateParams,
} from "../../middlewares/validate.middleware";
import {
  CreateCourseSchema,
  CourseParamsSchema,
  UpdateCourseSchema,
} from "../../validation/course.schema";

const router = Router();

router.get("/", getAllCourses); // public
router.get("/:courseId", validateParams(CourseParamsSchema), getCourseById); // pubic
router.post("/", validateBody(CreateCourseSchema), createCourse);
router.patch(
  "/:courseId",
  validateParams(CourseParamsSchema),
  validateBody(UpdateCourseSchema),
  updateCourse
);
router.delete("/:courseId", deleteCourse);

export default router;
