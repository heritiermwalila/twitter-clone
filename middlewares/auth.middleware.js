const isLoggedIn = (req, res, next) => {
  try {
    if(req.session && req.session.user){
      return next()
    }
    return res.status(301).redirect('/auth/login')
  } catch (error) {
    
  }
}

export {isLoggedIn}