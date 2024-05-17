import express from 'express';
import routes from './routes'
import mongoose from 'mongoose'

const app = express();
app.use(express.json())
const port = 3001;

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

mongoose.set('strictQuery', false);
mongoose.connect('mongodb://localhost:27017/nodeapi')

app.use('/api', routes)
