import {Router} from 'express'
import { AddPost, GetPost } from '../controllers/post.controller'
const route = Router()


route.get('/posts', GetPost)

route.post('/posts', AddPost)

export default route