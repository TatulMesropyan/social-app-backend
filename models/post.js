import mongoose from "mongoose";

const post = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  picture: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
});

const Post = mongoose.model("Post", post);

export default Post;
