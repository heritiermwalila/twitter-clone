import {Router} from 'express'
import { Home, Profile } from '../controllers/app.controller'
import { isLoggedIn } from '../middlewares/auth.middleware'
const route = Router()

route.get('/', isLoggedIn, Home)
route.get('/profile', Profile)


export default route