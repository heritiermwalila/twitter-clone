import User from '../core/schema/user.schema'
const isLoggedIn = async (req, res, next) => {
  try {
    if(req.session && req.session.user){
      const _id = req.session.user
      const user = await User.findById({_id})
      if(!user){
        return res.status(301).redirect('/auth/login')
      }
      return next()
    }
    return res.status(301).redirect('/auth/login')
  } catch (error) {
    
  }
}

export {isLoggedIn}