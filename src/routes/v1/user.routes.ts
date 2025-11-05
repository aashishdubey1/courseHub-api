import { Router } from "express";
import {
  getAllUser,
  login,
  me,
  register,
  updateProfile,
} from "../../controller/user.controller";
import authToken from "../../middlewares/auth.middleware";

const router = Router();

router.get("/", getAllUser);
router.post("/login", authToken, login);
router.post("/register", register);

// ----------------have to implements------------------
router.get("/me", me);
router.patch("/me", updateProfile);

export default router;
