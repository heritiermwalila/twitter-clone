import {Router} from 'express'
import { body } from "express-validator";
import {
  ForgotPassword,
  Login,
  Register,
  PostLogin,
  PostRegister
} from "../controllers/auth.controller";
import {
  validateLogin,
  validateRegister,
} from "../core/validation/auth.validation";
const route = Router()

route.get("/login", Login);
route.get("/register", Register);
route.get('/forgot-password', ForgotPassword)

route.post("/login", validateLogin(), PostLogin);
route.post("/register", validateRegister(), PostRegister);

export default route