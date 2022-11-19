import express from 'express';
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";

import User from '../models/user.js';

const router = express.Router();

export const loginCredentials = async (req, res) => {
    const { username, password } = req.body;
    try {
        let user = await User.findOne({ username });

        if (!user) {
            res.status(400).json({ status: 'Email doesnt exists' });
        }

        let isPasswordValid = await bcrypt.compare(password, user.password);

        if (isPasswordValid) {
            const token = jwt.sign({
                username: username,
                userId: user._id,
                password: password,
            }, process.env.JWT_KEY)
            return res.json({ status: 'Token Ready', token: token, user: user })
        }
        else return res.status(400).json({ status: 'Email or password incorrect' });
    }
    catch (error) {
        res.status(409).json({ status: error.message });
    }
};

export default router;