import express from 'express';

import { getUser, createUser } from '../controllers/posts.js';
import bodyParser from "body-parser";
const router = express.Router();

router.use(bodyParser.json())

router.get('/', getUser)

router.post('/', createUser)


export default router;