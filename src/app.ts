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
import { kCorsOrigin, kDbUrl, kPort, __DEV__ } from './constants';

const app = express();

mongoose.connect(kDbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());
app.use(morgan('common'));
app.use(helmet());
app.use(cors({ origin: kCorsOrigin }));

app.use('/', indexRouter);
app.use('/posts', postsRouter);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

app.listen(kPort, () => {
  if (__DEV__) {
    // eslint-disable-next-line no-console
    console.log(`Listening on http://localhost:${kPort}/`);
  }
});
