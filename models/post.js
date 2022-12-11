import mongoose from 'mongoose';

const post = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    picture: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true,
    },
//    likes:{
//        qunatity:{
//            type: Number,
//            required: true,
//            default: 0,
//        },
//        likedUsers:{
//            type: Array,
//        }
//    }
});

const Post = mongoose.model('Post', post)

export default Post;