import express from 'express';
import routes from './routes'
import mongoose from 'mongoose'
import cors from 'cors'

const app = express();
app.use(express.json())
app.use(cors())
const port = 3001;

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

mongoose.set('strictQuery', false);
mongoose.connect('mongodb://mongodb:27017/nodeapi')

app.use('/api', routes)
