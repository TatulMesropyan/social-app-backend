import express from 'express';
import bodyParser from 'body-parser';
import {
  getUser,
  createUser,
  deleteUser,
} from '../controllers/registration.js';

const router = express.Router();

router.use(bodyParser.json());

router.get('/', getUser);

router.post('/', createUser);

router.delete('/', deleteUser);

export default router;
