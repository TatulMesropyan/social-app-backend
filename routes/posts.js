import express from 'express';

import { getUser, createUser } from '../controllers/posts.js';
const router = express.Router();

router.post('/', (req, res) => {
    console.log(req.body)
})

// router.get('/', (res, req) => {
//     res.send('We are here')
// })



export default router; 