import express from "express";
import bodyParser from "body-parser";

const routes = express.Router()

routes.use(bodyParser.json())

export default  routes;