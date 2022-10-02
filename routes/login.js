import express from "express";
import bodyParser from "body-parser";
import { getLoginCredentials } from "../controllers/login.js";


const router = express.Router();

router.use(bodyParser.json())

router.get('/',)

router.post('/', getLoginCredentials)

router.delete('/',)

export default router;