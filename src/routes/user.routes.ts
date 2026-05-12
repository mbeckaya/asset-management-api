import { Router } from "express";

import { db } from "../database/connection";
import UserService from "../services/user.service";
import UserController from "../controllers/user.controller";
import { validateLoginBody } from "../middlewares/validate/validate-login-body.middleware";
import { API_BASE } from "../constants";

const router = Router();

const userService = new UserService(db);
const userController = new UserController(userService);

router.post(
  `${API_BASE}/login`,
  validateLoginBody,
  userController.login
);

export default router;