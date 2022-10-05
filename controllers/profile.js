import express from 'express';
import bcrypt from 'bcrypt'
import User from '../models/user.js';

const router = express.Router();

export const getProfileData = async (req, res) => {
	try {
		const postMessages = await User.find();

		res.json({ status: 'OK' });
	} catch (error) {
		res.status(404).json({ message: error.message });
	}

};

export default router;