import { validationResult } from "express-validator";
import User from '../core/schema/user.schema'
import { getErrorParam } from "../core/validation/auth.validation";
import {genSalt, hash} from 'bcryptjs'

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const Login = (req, res, next) => {
  try {
    
    res.status(200).render("login", { title: "Login", errors: [] });
  } catch (error) {
    
  }
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
export const PostLogin = (req, res, next) => {
  try {
    const { username, password } = req.body;
    let errors = [];
    const { errors: validationErrors } = validationResult(req);
    if (validationErrors.length > 0) {
      errors = validationErrors;
    }

    res.status(200).render("login", {
      title: "Login",
      errors: {
        username: getErrorParam(errors, "username"),
        password: getErrorParam(errors, "password"),
      },
      form: { username },
    });
   
  } catch (error) {}
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const Register = (req, res, next) => {
  try {
    res.status(200).render('register', {title: 'Register', errors: {}, form: {}})
  } catch (error) {
    
  }
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
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

    

    const usernameExist = await User.exists({username})
    const emailExist = await User.exists({email})

    if(usernameExist || emailExist){
      errors.push({param: usernameExist ? 'username' : 'email', msg: usernameExist ? 'This username is taken' : 'This email address is in used'})
    }

    if(errors.length > 0){
      return res
      .status(200)
      .render("register", {
        title: "Register",
        errors:{
          username: getErrorParam(errors, 'username'),
          email: getErrorParam(errors, 'email'),
        },
        form: {firstname, lastname, username, email },
      });
    }

    //2. Encrypt password
    const salt = await genSalt(12)
    const hashed = await hash(password, salt)

    const {_id} = await new User({firstname, lastname, username, email, password: hashed}).save()

    req.session.user = _id
    
    res.status(200).redirect('/')
    
  } catch (error) {
    console.log(error);
  }
};

const ResetPassword = (req, res, next) => {
  try {
    const {step} = req.params;
    switch (step) {
      case "enter-code":
        res.status(200).render("reset", {
          title: "Forgot Password - Verify code",
          errors: {},
          step: 'enter-code'
        });
        break;

      case "new-password":
        res.status(200).render("reset", {
          title: "Forgot Password - New password",
          errors: {},
          step: 'new-password'
        });
        break;

      default:
      
        res.status(200).render("reset", {
          title: "Forgot Password",
          errors: {},
          step: ''
        });
        break
    }
  } catch (error) {}
};

const PostResetPassword = (req, res, next) => {
  try {
    const {step} = req.params;
   
    switch (step) {
      
      case "enter-code":
        /**
         * Step
         * ------------
         * 1. Verify code
         * 2. Send to new password page
         */
        let enter_code_errors = [];
        const { errors: enter_code_validationErrors } = validationResult(req);

        if (enter_code_validationErrors.length > 0) {
          enter_code_errors = enter_code_validationErrors;
        }
        console.log(enter_code_errors);
        if(enter_code_errors.length > 0){
          res.status(200).render("reset", {
            title: "Forgot Password - Verify code",
            errors: {},
            step: 'enter-code'
          });
        }
        
        res.status(200).redirect('/auth/reset/new-password')

        break;

      case "new-password":
        break;

      default:
        let new_password_errors = [];
        const { errors: new_password_validationErrors } = validationResult(req);

        if (new_password_validationErrors.length > 0) {
          errors = new_password_validationErrors;
        }

        if(new_password_errors.length > 0){
          res.status(200).render("reset", {
            title: "Forgot Password",
            errors: {
              email: getErrorParam(errors, "email"),
            },
            step: ''
          });
        }

        res.status(200).redirect('/auth/reset/enter-code')
        
        break
    }
  } catch (error) {
    console.log(error);
  }
};

export { Login, Register, ResetPassword, PostResetPassword };