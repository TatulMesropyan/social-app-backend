import express from 'express';
import bcrypt from 'bcrypt';
import mongoose from "mongoose";
import User from '../models/user.js';
import Post from "../models/post.js";

const router = express.Router();

export const createNewPost = async (req, res) => {

    const { title, description, picture} = req.body;

    const newPost = new Post({title:title, description:description, picture:picture,userId:mongoose.Types.ObjectId("10")}) //TODO create post with user id specified
    console.log(Post)
    try {
        await newPost.save();
    } catch (e) {
        console.log(e)
		return res.status(400).json({
            message: "Something went wrong"
        })
	}
    return res.status(200).json({status: "SUCCESS"})
}

export const deletePost = async (req, res) => {
    const { id } = req.params;
    const post = await Post.findByIdAndDelete(id);
    if (post) {
        console.log("true")
    }
    return res.status(200).json({status: "SUCCESS"})
}

export const getPostById = async (req, res) => {
    const { id } = req.params;

    const result = await Post.findById(id);
    if (!result) {
        return res.status(400).json({
            message: `There is no post with this id: ${id}`
        })
    }
    res.json(result)
}

export const getMyPosts = async (req, res) => {
    const filters = req.query;
    console.log(req.query)
    const result = await Post.find({userId: req.user.id, title: filters.title});
    if (!result || result?.length < 1) {
        return res.status(400).json({
            message: "You have no posts"
        })
    }
    return res.json(result);
}

export default router;