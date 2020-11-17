import {Router} from 'express'
import { ForgotPassword, Login, Register } from '../controllers/auth.controller'
const route = Router()

route.get('/login', Login)
route.get('/register', Register)
route.get('/forgot-password', ForgotPassword)

export default route