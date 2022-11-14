
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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({limit:'50mb', extended: true }));
app.use(cors());

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