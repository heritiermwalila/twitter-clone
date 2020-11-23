import { Router } from "express";
import { AddPost, GetPosts } from "../api/post.controller";
const route = Router();

route.get("/posts", GetPosts);

route.post("/posts", AddPost);

export default route;
