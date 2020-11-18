import {Router} from 'express'
import { body } from "express-validator";
import {
  ResetPassword,
  Login,
  Register,
  PostLogin,
  PostRegister,
  PostResetPassword,
} from "../controllers/auth.controller";
import {
  validateLogin,
  validateRegister,
  validateReset,
} from "../core/validation/auth.validation";
const route = Router()

route.get("/login", Login);
route.get("/register", Register);
route.get("/reset/:step", ResetPassword);

route.post("/login", validateLogin(), PostLogin);
route.post("/register", validateRegister(), PostRegister);
route.post("/reset/:step", validateReset, PostResetPassword);

export default route