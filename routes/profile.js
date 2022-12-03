import express from "express";
import bodyParser from "body-parser";
import { getMyPosts, createNewPost, deletePost, getUserPosts, changePassword, changeUserName } from "../controllers/profile.js";

const routes = express.Router()

routes.use(bodyParser.json())

routes.get('/me', getMyPosts)
routes.get('/:id/posts', getUserPosts)
routes.post('/', createNewPost)
routes.delete('/:id', deletePost)
routes.post('/:id/change-password', changePassword)
routes.post('/:id/change-username', changeUserName)


export default routes;