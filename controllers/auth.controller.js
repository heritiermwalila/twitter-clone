import { validationResult } from "express-validator";
import User from '../core/schema/user.schema'
import { getErrorParam } from "../core/validation/auth.validation";

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
   
  } catch (error) {}
};

const Register = (req, res, next) => {
  try {
    res.status(200).render('register', {title: 'Register', errors: []})
  } catch (error) {
    
  }
}

export const PostRegister = async (req, res, next) => {
  try {
    req.session.errors = null;
    const {firstname, lastname, username, email, password, cpassword } = req.body;
    let errors = [];
    const { errors: validationErrors } = validationResult(req);
    if (validationErrors.length > 0) {
      errors = validationErrors;
    }
    if (password !== cpassword) {
      errors.push({ msg: "Passwords does not match", param: 'password' });
    }

     /**
     * Steps
     * -------------------
     * 1. Check the user in the db
     * 2. Create a session
     * 3. Redirect to home page
     */
    if(errors.length > 0){
      return res
      .status(200)
      .render("register", {
        title: "Register",
        errors:{
          firstname: getErrorParam(errors, 'firstname'),
          lastname: getErrorParam(errors, 'lastname'),
          username: getErrorParam(errors, 'username'),
          email: getErrorParam(errors, 'email'),
          password: getErrorParam(errors, 'password'),
        },
        form: {firstname, lastname, username, email },
      });
    }

    // const usernameExist = await User.exists({username})

    // console.log(usernameExist);
    res
    .status(200)
    .render("register", {
      title: "Register",
      form: {firstname, lastname, username, email },
    });
    
  } catch (error) {
    console.log(error);
  }
};

const ForgotPassword = (req, res, next) => {
  try {
    res.status(200).render('forgot-password', {title: 'Forgot Password'})
  } catch (error) {
    
  }
}

export {Login, Register, ForgotPassword}