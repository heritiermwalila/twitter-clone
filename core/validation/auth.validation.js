import { body, validationResult } from "express-validator";

export const validateLogin = () => [
  body("username").not().isEmpty().withMessage("username is required"),
  body("password").not().isEmpty().withMessage("password is required"),
];
export const validateRegister = () => [
  body('firstname').not().isEmpty().withMessage('First name is required'),
  body('lastname').not().isEmpty().withMessage('Last name is required'),
  body("username")
    .not()
    .isEmpty()
    .withMessage("username must be atleast 5 characters"),
  body("email").isEmail({ require_tld: true }).normalizeEmail().withMessage('Email is not valid'),
  body("password").isLength({ min: 5 }).withMessage('Password must be atleast 5 characters long'),
  body("cpassword").isEmpty(),
];

export const getErrorParam = (errors, param2) => {

  return errors.find(({param})=>param === param2) ? errors.find(({param})=>param === param2).msg : ''

}
