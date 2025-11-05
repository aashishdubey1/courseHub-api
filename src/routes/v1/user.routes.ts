import { Router } from "express";
import {
  login,
  me,
  register,
  updateProfile,
} from "../../controller/user.controller";
import authToken from "../../middlewares/auth.middleware";

const router = Router();

router.post("/login", authToken, login);
router.post("/register", register);
router.get("/me", me);
router.patch("/me", updateProfile);

export default router;
