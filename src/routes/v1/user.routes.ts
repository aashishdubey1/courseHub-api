import { Router } from "express";
import {
  getAllUser,
  login,
  me,
  register,
  updateProfile,
} from "../../controller/user.controller";

const router = Router();

router.get("/", getAllUser);
router.post("/login", login);
router.post("/register", register);

// ----------------have to implements------------------
router.get("/me", me);
router.patch("/me", updateProfile);

export default router;
