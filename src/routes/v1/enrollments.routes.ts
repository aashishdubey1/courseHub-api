import { Router } from "express";
import {
  enrollCourse,
  getAllEnrolledCourse,
  unenrollCourse,
} from "../../controller/enrollment.controller";
import authToken from "../../middlewares/auth.middleware";
import { validateParams } from "../../middlewares/validate.middleware";
import { CourseParamsSchema } from "../../validation/course.schema";

const router = Router();

router.post(
  "/:courseId",
  validateParams(CourseParamsSchema),
  authToken,
  enrollCourse
);
router.get("/my", authToken, getAllEnrolledCourse);

router.delete(
  "/:courseId",
  validateParams(CourseParamsSchema),
  authToken,
  unenrollCourse
);

export default router;
