import express from 'express';
import bcrypt from "bcrypt";
import Post from "../models/post.js";
import User from "../models/user.js";

const router = express.Router();

export const createNewPost = async (req, res) => {

    const { title, description, picture, userId } = req.body;

    const newPost = new Post({ title: title, description: description, picture: picture, userId: userId })

    try {
        await newPost.save();
    } catch (e) {
        console.log(e)
        return res.status(400).json({
            message: "Something went wrong"
        })
    }
    return res.status(200).json({ status: "SUCCESS" })
}

export const deletePost = async (req, res) => {
    const { id } = req.params;
    const post = await Post.findByIdAndDelete(id);
    if (post) {
        console.log("true")
    }
    return res.status(200).json({ status: "SUCCESS" })
}

export const getPostById = async (req, res) => {
    const { id } = req.params;

    const result = await Post.find({ userId: id });
    if (!result) {
        return res.status(400).json({
            message: `There is no post with this id: ${id}`
        })
    }
    res.json(result)
}

export const getMyPosts = async (req, res) => {
    console.log(req)
    const filters = req.query;
    const result = await Post.find({ userId: req.user.id, title: filters.title });
    if (!result || result?.length < 1) {
        return res.status(400).json({
            message: "You have no posts"
        })
    }
    return res.json(result);
};

export const getUserPosts = async (req, res) => {
    const { id } = req.params;
    const userPosts = await Post.find({ userId: id })
    if (!userPosts || userPosts.length < 1) {
        return res.status(400).json({
            message: "No posts found"
        })
    }
    return res.json({ posts: userPosts })
}

export const changePassword = async (req, res) => {
    const { id } = req.params;
    const { oldPassword, newPassword, confirmNewPassword } = req.body;
    try {
        const user = await User.findById(id)
        let isOldPasswordValid = await bcrypt.compare(oldPassword, user.password);
        if (isOldPasswordValid) {
            if (newPassword === confirmNewPassword) {
                const salt = await bcrypt.genSalt(10);
                let newUser = User.findByIdAndUpdate({ id: id, password: await bcrypt.hash(newPassword, salt) });
                console.log(newUser)
            }
            else res.status(400).json({ status: "Password and confirmation password missmatch" });
        }
        else res.status(400).json({ status: "Old password was wrong" })
    } catch (err) { console.log(err) }
};


export default router;