import express from 'express';
import bcrypt, { compare } from 'bcrypt'
import RegistrationUser from '../models/registerUser.js';

const router = express.Router();

export const getLoginCredentials = async (req, res) => {
    const { username, password } = req.body;
    console.log(username)
    try {
        let user = await RegistrationUser.findOne({ username });

        if (!user) {
            return res.status(400).send({ masg: 'Email exists' });
        }

        let isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            console.lof("Password")
            return res.status(400).json({ msg: 'Email or password incorrect' });
        }

    }
    catch (error) {
        res.status(409).json({ message: error.message });
    }
};

export default router;