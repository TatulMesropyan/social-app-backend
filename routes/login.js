import express from "express";
import bodyParser from "body-parser";
import { loginCredentials } from "../controllers/login.js";


const router = express.Router();

router.use(bodyParser.json())

router.post('/', loginCredentials)


export default router;