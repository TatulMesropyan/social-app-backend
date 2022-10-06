import express from 'express';
import bcrypt from 'bcrypt'
import User from '../models/user.js';
import user from "../models/user.js";

const router = express.Router();

export const getUser = async (req, res) => {
    try {
        const postMessages = await User.find();

        res.json({ status: 'OK' });
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }

};

export const createUser = async (req, res) => {
    const { username, email, phone, password, confirmPassword } = req.body;
    if (!(password && email && phone && username)) {
        return res.status(402).json({ error: 'Data not formatted properly' });
    }

    const userExists = await User.findOne({$or:[{username},{email},{phone}]})
    if(userExists){
        return res.status(423).json({error:'Credentials already in use'})
    }

    if(password !== confirmPassword){
        return res.status(400).json({ error: 'Passwords did not match'})
    }

    try {
    const newUser = new User({ username, email, phone, password });

    const salt = await bcrypt.genSalt(10);

        newUser.password = await bcrypt.hash(password, salt)

        await newUser.save();

        res.status(200).json({ success: 'OK' });
    }
    catch (error) {
        return res.status(409).json({ error: error.message });
    }
};

export const deleteUser = async (req, res) => {
    const { id } = req.params;

    return res.send();
};

export default router;