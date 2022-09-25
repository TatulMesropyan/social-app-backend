
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import postRoutes from './routes/posts.js'

const app = express();
app.use(bodyParser.json())


app.get('/', (req, res) => {
  req.send('Home Page')
})

app.use('/posts', postRoutes)


app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))

app.use(cors());

const DB_CONNECTION = 'mongodb+srv://Tatul420:Sskvikak420@cluster0.t9akjsv.mongodb.net/?retryWrites=true&w=majority';
const PORT = 8080;

mongoose.connect(DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:8080`)))
  .catch((error) => console.log(`${error} did not connect`));
