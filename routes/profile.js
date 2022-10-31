import express from "express";
import bodyParser from "body-parser";
import {getMyPosts, getPostById, createNewPost, deletePost} from "../controllers/profile.js";

const routes = express.Router()

routes.use(bodyParser.json())

routes.get('/me', getMyPosts)
routes.get('/:id', getPostById)
routes.post('/', createNewPost)
routes.delete('/:id', deletePost)


export default  routes;