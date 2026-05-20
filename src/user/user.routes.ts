import { Router } from "express";

import { db } from "../shared/database";
import UserService from "./user.service";
import UserController from "./user.controller";
import { validateLoginBody } from "../shared/middlewares/body.middleware";
import { API_BASE } from "../shared/constants";

const router = Router();

const userService = new UserService(db);
const userController = new UserController(userService);

router.post(
  `${API_BASE}/login`,
  validateLoginBody,
  userController.login
);

export default router;