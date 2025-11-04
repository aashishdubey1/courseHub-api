import { Router } from "express";
import userRoutes from "./user.routes";

const router = Router();

router.use("/user", userRoutes);

// router.use("/enrollments");

// router.use("/course");

export default router;
