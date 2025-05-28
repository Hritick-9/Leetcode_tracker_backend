import express from 'express';
import cors from 'cors';
import friendsRouter from './routes/friends.js';

const app = express();
const PORT = 5666;

// Enable CORS for all origins (or restrict to your frontend URL)
app.use(cors());

app.use(express.json());
app.use('/api', friendsRouter);



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
