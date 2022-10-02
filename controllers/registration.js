import express from 'express';
import bcrypt from 'bcrypt'
import RegistrationUser from '../models/registerUser.js';

const router = express.Router();

export const getUser = async (req, res) => {
    try {
        const postMessages = await RegistrationUser.find();

        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }

};

export const createUser = async (req, res) => {
    const { username, email, phone, password, confirmPassword } = req.body;

    if (!(password && email)) {
        return res.status(400).send({ error: 'Data not formatted properly' });
    }

    const newPostMessage = new RegistrationUser({ username, email, phone, password });

    const salt = await bcrypt.genSalt(10);

    newPostMessage.password = await bcrypt.hash(password, salt)

    try {
        await newPostMessage.save();
        res.status(201).json(newPostMessage);
    }
    catch (error) {
        res.status(409).json({ message: error.message });
    }
};

export const deleteUser = async (req, res) => {
    const { id } = req.params;

    return res.send();
};

export default router;