import { Router } from "express";
import userRoutes from "./user.routes";
import coursesRoutes from "./course.route";
const router = Router();

router.use("/users", userRoutes);
router.use("/courses", coursesRoutes);

// router.use("/enrollments");

export default router;
