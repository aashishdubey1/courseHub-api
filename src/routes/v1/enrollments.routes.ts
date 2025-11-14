import { Router } from "express";
import {
  enrollCourse,
  getAllEnrolledCourse,
  unenrollCourse,
} from "../../controller/enrollment.controller";
import authToken from "../../middlewares/auth.middleware";
import { validateParams } from "../../middlewares/validate.middleware";
import { CourseParamsSchema } from "../../validation/course.schema";
import { authorize } from "../../middlewares/authorize.middleware";

const router = Router();

router.post(
  "/:courseId",
  validateParams(CourseParamsSchema),
  authToken,
  authorize("ADMIN", "STUDENT"),
  enrollCourse
);
router.get(
  "/my",
  authToken,
  authorize("ADMIN", "STUDENT"),
  getAllEnrolledCourse
);

router.delete(
  "/:courseId",
  validateParams(CourseParamsSchema),
  authToken,
  authorize("ADMIN", "STUDENT"),
  unenrollCourse
);

export default router;
