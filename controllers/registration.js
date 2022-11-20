import express from 'express';
import bcrypt from 'bcrypt'
import dotenv from "dotenv";

import User from '../models/user.js';

const router = express.Router();
dotenv.config();


export const getUser = async (req, res) => {
    try {
        const postMessages = await User.find();

        res.json({ status: 'OK' });
    }
    catch (error) {
        res.status(404).json({ status: error.message });
    }

};

export const createUser = async (req, res) => {
    const { username, email, phone, password, confirmPassword } = req.body;
    if (!(password && email && phone && username)) {
        return res.status(402).json({ status: 'Data not formatted properly' });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ status: 'Passwords did not match' });
    }

    const userExists = await User.findOne({ $or: [{ username }, { email }, { phone }] })
    if (userExists) {
        return res.status(423).json({ status: 'Credentials already in use' });
    }

    try {
        const newUser = new User({
            username,
            email: email.toLowerCase(),
            phone,
            password
        });

        const salt = await bcrypt.genSalt(10);

        newUser.password = await bcrypt.hash(password, salt);

        await newUser.save();
        res.status(200).json({ status: 'User created' });
    }

    catch (error) {
        return res.status(409).json({ status: error.message });
    }
};

export const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        if (id)
            await User.findByIdAndDelete(id)
    } catch (err) {
        res.status(400).json({ status: err.message })
    }
    return res.send();
};

export default router;