import { body, validationResult } from "express-validator";

export const validateLogin = () => [
  body("username").not().isEmpty().withMessage("username is required"),
  body("password").not().isEmpty().withMessage("password is required"),
];
export const validateRegister = () => [
  body("username")
    .isLength({ min: 5 })
    .withMessage("username must be atleast 5 characters")
    .notEmpty()
    .withMessage("username is required"),
  body("email").isEmail({ require_tld: true }).normalizeEmail(),
  body("password").isLength({ min: 5 }),
];
