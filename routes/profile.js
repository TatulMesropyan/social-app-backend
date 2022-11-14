import express from "express";
import bodyParser from "body-parser";
import { getMyPosts, getPostById, createNewPost, deletePost, getUserPosts, changePassword } from "../controllers/profile.js";

const routes = express.Router()

routes.use(bodyParser.json())

routes.get('/me', getMyPosts)
routes.get('/:id', getPostById)
routes.get('/:id/posts', getUserPosts)
routes.post('/', createNewPost)
routes.delete('/:id', deletePost)
routes.post('/:id/changepassword', changePassword)


export default routes;