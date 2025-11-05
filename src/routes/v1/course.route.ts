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
router.get("/:id", getCourseById); // pubic
router.post("/", createCourse);
router.patch("/:id", updateCourse);
router.delete(":id", deleteCourse);

export default router;
