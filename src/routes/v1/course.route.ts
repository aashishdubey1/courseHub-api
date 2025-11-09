import { Router } from "express";
import {
  createCourse,
  deleteCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
} from "../../controller/courses.controller";

const router = Router();

router.get("/", getAllCourses); // public
router.get("/:courseId", getCourseById); // pubic
router.post("/", createCourse);
router.patch("/:courseId", updateCourse);
router.delete("/:courseId", deleteCourse);

export default router;
