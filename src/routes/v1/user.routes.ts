import { Router } from "express";
import {
  getAllUser,
  login,
  me,
  register,
  updateProfile,
} from "../../controller/user.controller";
import { validateBody } from "../../middlewares/validate.middleware";
import {
  UserLoginSchema,
  UserRegisterSchema,
} from "../../validation/users.schema";
import { authorize } from "../../middlewares/authorize.middleware";
import authToken from "../../middlewares/auth.middleware";

const router = Router();

router.get("/", authToken, authorize("ADMIN"), getAllUser);
router.post("/login", validateBody(UserLoginSchema), login);
router.post("/register", validateBody(UserRegisterSchema), register);

// ----------------have to implements------------------
router.get("/me", me);
router.patch("/me", updateProfile);

export default router;
