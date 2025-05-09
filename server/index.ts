import express from 'express';
import cors from 'cors';
import tokenRoute from './routes/token';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use('/api/token', tokenRoute);

app.listen(PORT, () => {
  console.log(`Chatbot backend running on port ${PORT}`);
});
