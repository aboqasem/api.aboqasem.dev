/* eslint-disable import/first */
import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

import indexRouter from './routes/index';
import postsRouter from './routes/posts';
import middlewares from './middlewares';
import { __DEV__ } from './constants';

const app = express();

mongoose.connect(process.env.DB || 'mongodb://localhost/portfolio', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());
app.use(morgan('common'));
app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN || 'http://localhost/' }));

app.use('/', indexRouter);
app.use('/posts', postsRouter);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  if (__DEV__) {
    // eslint-disable-next-line no-console
    console.log(`Listening on http://localhost:${port}/`);
  }
});
