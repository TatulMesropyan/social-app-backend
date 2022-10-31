import mongoose from 'mongoose';
import User from "./user.js";

const post = mongoose.Schema({
    title: {
        type:String,
        required:true
    },
    description: {
        type:String,
    },
    picture: {
        type:String,
        required:true
    },
    userId: {
        type:String,
        required:true,
    }
})

const Post  = mongoose.model('Post',post)

export default Post;