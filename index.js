
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import postRoutes from './routes/posts.js'

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Didn't worked because extended: true option was intilized
// After our "posts" middleware was used

// The extended option allows to choose between parsing the 
// URL-encoded data with the querystring library (when false) or the qs library (when true). 
// The “extended” syntax allows for rich objects and arrays to be encoded into the URL-encoded format,
// allowing for a JSON-like experience with URL-encoded. 

app.get('/', (req, res) => {
  res.send('Home Page')
})

app.use('/posts', postRoutes)


const DB_CONNECTION = 'mongodb+srv://test:test@cluster0.vqcza4p.mongodb.net/test';
const PORT = 8080;

mongoose.connect(DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:8080`)))
  .catch((error) => console.log(`${error} did not connect`));