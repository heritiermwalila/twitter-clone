import { body, validationResult } from "express-validator";

export const validateLogin = () => [
  body("username").not().isEmpty().withMessage("username is required"),
  body("password").not().isEmpty().withMessage("password is required"),
];
export const validateRegister = () => [
  body("firstname").not().isEmpty().withMessage("First name is required"),
  body("lastname").not().isEmpty().withMessage("Last name is required"),
  body("username")
    .not()
    .isEmpty()
    .withMessage("username must be atleast 5 characters"),
  body("email")
    .isEmail({ require_tld: true })
    .normalizeEmail()
    .withMessage("Email is not valid"),
  body("password")
    .isLength({ min: 5 })
    .withMessage("Password must be atleast 5 characters long"),
];

export const validateReset = (req, res, next) => {
  const { step } = req.params;
  switch (step) {
    case "enter-code":
      [body("code").isNumeric().withMessage("Invalid code format")];
      next();

    case "new-password":
      [
        body("password")
          .isLength({ min: 5 })
          .withMessage("Password must be a leat 5 characters long"),
      ];
      next();

    default:
      [body("email").isEmail().withMessage("Invalid email address")];
      next();
  }
};

export const getErrorParam = (errors, param2) => {

  return errors.find(({param})=>param === param2) ? errors.find(({param})=>param === param2).msg : ''

}
