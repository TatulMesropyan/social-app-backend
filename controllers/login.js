import express from 'express';
import bcrypt, { compare } from 'bcrypt'
import Jwt from 'jsonwebtoken';
import User from '../models/user.js';

const router = express.Router();

export const getLoginCredentials = async (req, res) => {
    const { username, password } = req.body;
    try {
        let user = await User.findOne({ username });

        if (!user) {
            return res.status(400).send({ msg: 'Email exists' });
        }

        let isPasswordValid = await bcrypt.compare(password, user.password);

        if (isPasswordValid) {
            const token = Jwt.sign(
                {
                    name: user.name,
                    email: user.email
                }
            )
            console.log(token)
            return res.json({ status: 'OK', user: token })
        }
        else return res.status(400).json({ msg: 'Email or password incorrect' });

    }
    catch (error) {
        res.status(409).json({ message: error.message });
    }
};

export default router;