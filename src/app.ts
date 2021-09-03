import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { router } from './routes/index';

const app = express();

mongoose
  .connect('mongodb://127.0.0.1:27017/sports')
  .then(() => console.info('connect to sport database'));

app.use(cors());
app.use(express.urlencoded());
app.use(express.json());
app.use('/', router);

export default app;
