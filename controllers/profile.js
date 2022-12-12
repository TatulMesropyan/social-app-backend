import express from "express";
import bcrypt from "bcrypt";

import Post from "../models/post.js";
import User from "../models/user.js";
import Likes from "../models/likes.js";

const router = express.Router();

export const createNewPost = async (req, res) => {
  const { title, description, picture, userId } = req.body;

  const newPost = new Post({
    title: title,
    description: description,
    picture: picture,
    userId: userId,
  });
  const newLikedUser = await User.findById(userId);
  const newLike = new Likes({ postId: newPost.id, quantity: 0, likedUser: [] });
  try {
    await newPost.save();
    await newLike.save();
  } catch (e) {
    return res.status(400).json({ status: "Something went wrong" });
  }
  return res.status(200).json({ status: "New post created" });
};

export const deletePost = async (req, res) => {
  const { id } = req.params;

  const post = await Post.findByIdAndDelete(id);

  if (post) {
    res.status(200).json({ status: "Post deleted" });
  } else return res.status(400, "Post doesnt exist");
};

export const getMyPosts = async (req, res) => {
  const filters = req.query;
  const result = await Post.find({ userId: req.user.id, title: filters.title });
  if (!result || result?.length < 1) {
    return res.status(400).json({ status: "No posts found" });
  }
};

export const getUserPosts = async (req, res) => {
  const { id } = req.params;
  const userPosts = await Post.find({ userId: id });
  if (!userPosts || userPosts?.length < 1) {
    return res.status(400).json({ status: "Posts not found" });
  }
  return res.status(200).json({ status: "Posts found", posts: userPosts });
};

export const getSinglePost = async (req, res) => {
  const { id, postId } = req.params;
  try {
    const exactPost = await Post.findOne({ _id: postId, userId: id });
    return res.status(200).json({ status: "Post found", post: exactPost });
  } catch (e) {
    return res.status(400).json({ status: "Post not found" });
  }
};

export const changePassword = async (req, res) => {
  const { id } = req.params;
  const { currentPassword, newPassword, confirmationPassword } = req.body;
  try {
    const user = await User.findById(id);
    let isOldPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password
    );
    if (isOldPasswordValid && newPassword === confirmationPassword) {
      let salt = await bcrypt.genSalt(10);
      await User.findByIdAndUpdate(id, {
        password: await bcrypt.hash(newPassword, salt),
      });
      res.status(200).json({ status: "Password changed successfully" });
    } else res.status(400).json({ status: "Wrong data entered" });
  } catch (err) {
    console.log(err);
  }
};

export const changeUserName = async (req, res) => {
  const { id } = req.params;
  const { newUserName } = req.body;
  const oldUserName = await User.findById(id);
  const isUserNameUsed = await User.findOne({
    $and: [{ username: newUserName }, { id: !id }],
  });
  if (isUserNameUsed) {
    await User.findOneAndUpdate({ oldUserName, username: newUserName });
    res.status(200).json({ status: "Status changed successfully" });
  } else res.status(400).json({ status: "Username was already in use" });
};

export const likePost = async (req, res) => {
  const { id, postId } = req.params;
  let user = await User.findById(id);
  let likedPost = await Likes.findOne({ postId: postId });
  console.log("1", likedPost);
  if (likedPost && user) {
    if (likedPost.likedUsers.forEach((item, index) => item["_id"] !== id)) {
      await likedPost.quantity++;
      await likedPost.likedUsers.push(user);
      await likedPost.save();
      return res.status(200).json({ status: "Liked", likedPost: likedPost });
    } else {
      await likedPost.quantity--;
      await likedPost.save();
      return res.status(200).json({ status: "Unliked", likedPost: likedPost });
    }
  } else {
    return res.status(400).json({ status: "Post or user not found" });
  }
};

export default router;
