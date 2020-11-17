const Login = (req, res, next) => {
  try {
    res.status(200).render('login', {title: 'Login'})
  } catch (error) {
    
  }
}

const Register = (req, res, next) => {
  try {
    res.status(200).render('register', {title: 'Register'})
  } catch (error) {
    
  }
}

const ForgotPassword = (req, res, next) => {
  try {
    res.status(200).render('forgot-password', {title: 'Forgot Password'})
  } catch (error) {
    
  }
}

export {Login, Register, ForgotPassword}