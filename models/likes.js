import mongoose from "mongoose";
import User from "../models/user.js";

const likes = mongoose.Schema({
  postId: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 0,
  },
  likedUsers: [User.schema],
});

const Likes = mongoose.model("Likes", likes);

export default Likes;
