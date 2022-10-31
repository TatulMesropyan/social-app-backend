
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import registrationRoutes from './routes/registration.js'
import loginRoutes from './routes/login.js'
import profileRoutes from './routes/profile.js'
import {authenticateToken} from "./middlewares/auth.js";

const app = express();
dotenv.config();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Didn't work because extended: true option was initialized
// After our "posts" middleware was used

// The extended option allows to choose between parsing the 
// URL-encoded data with the querystring library (when false) or the qs library (when true). 
// The “extended” syntax allows for rich objects and arrays to be encoded into the URL-encoded format,
// allowing for a JSON-like experience with URL-encoded. 

app.get('/', (req, res) => {
  res.send('Home Page')
})

app.use('/profile', authenticateToken, profileRoutes)

app.use('/registration', registrationRoutes);

app.use('/login', loginRoutes);


const DB_CONNECTION = process.env.DB_CONNECTION;
const PORT = process.env.PORT || 8080;

mongoose.connect(DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));