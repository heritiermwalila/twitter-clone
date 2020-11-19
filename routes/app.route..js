import {Router} from 'express'
import { Home, Profile } from '../controllers/app.controller'
import { isLoggedIn } from '../middlewares/auth.middleware'
const route = Router()

route.get('/', isLoggedIn, Home)
route.get("/profile", isLoggedIn, Profile);

route.post("/logout", isLoggedIn, (req, res, next) => {
  try {
    req.session.destroy(() => {
      res.redirect("/auth/login");
    });
  } catch (error) {
    console.log(error);
  }
});


export default route