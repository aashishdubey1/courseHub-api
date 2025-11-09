import { Router } from "express";
import {
  enrollCourse,
  getAllEnrolledCourse,
  unenrollCourse,
} from "../../controller/enrollment.controller";
import authToken from "../../middlewares/auth.middleware";

const router = Router();

router.post("/:courseId", authToken, enrollCourse);
router.get("/my", authToken, getAllEnrolledCourse);

router.delete("/:courseId", authToken, unenrollCourse);

export default router;
