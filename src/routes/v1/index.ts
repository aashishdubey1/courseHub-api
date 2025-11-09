import { Router } from "express";
import userRoutes from "./user.routes";
import coursesRoutes from "./course.route";
import enrollmentsRoutes from "./enrollments.routes";

const router = Router();

router.use("/users", userRoutes);
router.use("/courses", coursesRoutes);
router.use("/enrollments", enrollmentsRoutes);

export default router;
