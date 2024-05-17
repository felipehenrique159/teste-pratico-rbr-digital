import express from 'express';
import routes from './routes'

const app = express();
const port = 3001;

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

app.use('/api', routes)
