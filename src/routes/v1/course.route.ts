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
import authToken from "../../middlewares/auth.middleware";
import { authorize } from "../../middlewares/authorize.middleware";

const router = Router();

router.get("/", getAllCourses);

router.get("/:courseId", validateParams(CourseParamsSchema), getCourseById);

router.post(
  "/",
  validateBody(CreateCourseSchema),
  authToken,
  authorize("INSTRUCTOR"),
  createCourse
);

router.patch(
  "/:courseId",
  validateParams(CourseParamsSchema),
  validateBody(UpdateCourseSchema),
  authToken,
  authorize("INSTRUCTOR"),
  updateCourse
);

router.delete("/:courseId", authToken, authorize("INSTRUCTOR"), deleteCourse);

export default router;
