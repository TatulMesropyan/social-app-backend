import express from 'express';

import { getUser, createUser } from '../controllers/posts.js';
import bodyParser from "body-parser";
const router = express.Router();

router.use(bodyParser.json())

router.post('/', (req, res) => {
    console.log(req.body)
    const post = {
        username:req.body.username,
        email:req.body.email
    };
    //Initing new object post with data coming from FE
    console.log(post)
    post.save()
        .exec()
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.json({message:err})
        })
})

// router.get('/', (res, req) => {
//     res.send('We are here')
// })



export default router; 