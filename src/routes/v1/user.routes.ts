import { Router } from "express";
import {
  login,
  me,
  register,
  updateProfile,
} from "../../controller/user.controller";

const router = Router();

router.post("/login", login);
router.post("/register", register);
router.get("/me", me);
router.patch("/me", updateProfile);

export default router;
