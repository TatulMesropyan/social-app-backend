import express from 'express';
import mongoose from 'mongoose';

import PostUser from '../models/postUser.js';

const router = express.Router();

export const getUser = async (req, res) => {
    try {
        const postMessages = await PostUser.find();

        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }

}

export const createUser = async (req, res) => {

    const { username, email, phone, password, confirmPassword } = req.body;

    const newPostMessage = new PostUser({ username, email, phone, password, confirmPassword })

    try {
        await newPostMessage.save();

        res.status(201).json(newPostMessage);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export default router;