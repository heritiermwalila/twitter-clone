import { validationResult } from "express-validator";

const Login = (req, res, next) => {
  try {
    res.status(200).render("login", { title: "Login" });
  } catch (error) {
    
  }
}

export const PostLogin = (req, res, next) => {
  try {
    const errors = validationResult(req);
    console.log("===========Error");
    console.log(errors);
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
  } catch (error) {}
};

const ForgotPassword = (req, res, next) => {
  try {
    res.status(200).render('forgot-password', {title: 'Forgot Password'})
  } catch (error) {
    
  }
}

export {Login, Register, ForgotPassword}