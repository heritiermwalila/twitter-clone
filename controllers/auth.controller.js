import { validationResult } from "express-validator";

const Login = (req, res, next) => {
  try {
    let errors = [];
    if (req.session.errors && req.session.errors.length > 0) {
      errors = req.session.errors;
    }
    setTimeout(() => {
      req.session.errors = [];
    }, 3000);
    res.status(200).render("login", { title: "Login", errors });
  } catch (error) {
    
  }
}

export const PostLogin = (req, res, next) => {
  try {
    const { username, password } = req.body;
    let errors = [];
    const { errors: validationErrors } = validationResult(req);
    if (validationErrors.length > 0) {
      errors = validationErrors;
    }

    res
      .status(200)
      .render("login", { title: "Login", errors, form: { username } });
    /**
     * Steps
     * -------------------
     * 1. Check the user in the db
     * 2. Create a session
     * 3. Redirect to home page
     */
  } catch (error) {}
};

const Register = (req, res, next) => {
  try {
    res.status(200).render('register', {title: 'Register'})
  } catch (error) {
    
  }
}

export const PostRegister = (req, res, next) => {
  try {
    req.session.errors = null;
    const { username, email, password, cpassword } = req.body;
    let errors = [];
    const { errors: validationErrors } = validationResult(req);
    if (validationErrors.length > 0) {
      errors = validationErrors;
    }
    if (password !== cpassword) {
      errors.push({ msg: "Passwords does not match" });
    }

    res
      .status(200)
      .render("register", {
        title: "Register",
        errors,
        form: { username, email },
      });
  } catch (error) {}
};

const ForgotPassword = (req, res, next) => {
  try {
    res.status(200).render('forgot-password', {title: 'Forgot Password'})
  } catch (error) {
    
  }
}

export {Login, Register, ForgotPassword}